'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'
import {
  ASSESSMENT_MAX_RAW,
  ASSESSMENT_QUESTIONS,
  PARTNERSHIP_MAX_RAW,
  PARTNERSHIP_QUESTIONS,
  calcAssessmentScore,
  getAssessmentTier,
  type AssessmentAnswers,
} from '@/lib/assessment'
import { site } from '@/lib/siteCopy'
import { supabaseBrowser } from '@/lib/supabaseBrowser'
import './assessment.css'

export type AssessmentClientVariant = 'assessment' | 'partnerships'

type AssessmentClientProps = {
  /** Which questionnaire and scoring scale to use (`/assessment` vs `/partnerships`). */
  variant?: AssessmentClientVariant
}

export default function AssessmentClient({ variant = 'assessment' }: AssessmentClientProps) {
  const questions = variant === 'partnerships' ? PARTNERSHIP_QUESTIONS : ASSESSMENT_QUESTIONS
  const maxRaw = variant === 'partnerships' ? PARTNERSHIP_MAX_RAW : ASSESSMENT_MAX_RAW
  const [answers, setAnswers] = useState<AssessmentAnswers>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [result, setResult] = useState<{
    score: number
    tier: ReturnType<typeof getAssessmentTier>
  } | null>(null)
  const utmRef = useRef<Record<string, string>>({})
  const tokenRef = useRef<string | null>(null)
  /** `motion=partnership` selects `partnership_bookings`; `/partnerships` path implies the same when param is omitted. */
  const motionRef = useRef<string | null>(null)

  const smsDisplay =
    typeof process.env.NEXT_PUBLIC_ASSESSMENT_SMS === 'string' && process.env.NEXT_PUBLIC_ASSESSMENT_SMS
      ? process.env.NEXT_PUBLIC_ASSESSMENT_SMS
      : '[your SMS number]'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    tokenRef.current = params.get('token')
    motionRef.current = params.get('motion')
    const utm: Record<string, string> = {}
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const val = params.get(key)
      if (val) utm[key] = val
    }
    utmRef.current = utm
  }, [])

  /** Match home scroll effects: accurate sticky offset for hero rail under `.hdr`. */
  useLayoutEffect(() => {
    function syncHdrH() {
      var hdr = document.querySelector('.asm-page .hdr')
      if (hdr) {
        document.documentElement.style.setProperty('--hdr-h', String((hdr as HTMLElement).offsetHeight) + 'px')
      }
    }
    syncHdrH()
    window.addEventListener('resize', syncHdrH)
    return () => {
      window.removeEventListener('resize', syncHdrH)
      document.documentElement.style.removeProperty('--hdr-h')
    }
  }, [])

  const answeredCount = questions.filter((q) => {
    const a = answers[q.id]
    if (q.type === 'multi') return Array.isArray(a) && a.length > 0
    return a !== undefined
  }).length

  const progress = Math.round((answeredCount / questions.length) * 100)
  const allAnswered = answeredCount === questions.length

  function toggleSingle(qid: string, idx: number) {
    setAnswers((prev) => ({ ...prev, [qid]: idx }))
  }

  function toggleMulti(qid: string, idx: number) {
    setAnswers((prev) => {
      const cur = (prev[qid] as number[]) ?? []
      const next = cur.includes(idx) ? cur.filter((i) => i !== idx) : [...cur, idx]
      return { ...prev, [qid]: next }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    const score = calcAssessmentScore(answers, questions, maxRaw)
    const tier = getAssessmentTier(score, smsDisplay)
    const submittedAt = new Date().toISOString()

    const answerMap: Record<string, { question: string; answer: string | string[]; score: number }> = {}
    for (const q of questions) {
      const ans = answers[q.id]
      if (ans === undefined) continue
      if (q.type === 'multi') {
        const selected = ans as number[]
        const labels = selected.map((i) => q.options[i]?.label ?? '')
        const pts = Math.min(
          selected.reduce((sum, i) => sum + (q.options[i]?.score ?? 0), 0),
          q.maxScore ?? Infinity,
        )
        answerMap[q.id] = { question: q.label, answer: labels, score: pts }
      } else {
        const idx = ans as number
        answerMap[q.id] = {
          question: q.label,
          answer: q.options[idx]?.label ?? '',
          score: q.options[idx]?.score ?? 0,
        }
      }
    }

    const submission = {
      answers: answerMap,
      score,
      tier: tier.label,
      utm: utmRef.current,
      submitted_at: submittedAt,
    }

    setSubmitting(true)
    setSubmitError(null)

    const token = tokenRef.current
    const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/'
    const isPartnership =
      variant === 'partnerships' ||
      motionRef.current === 'partnership' ||
      path === '/partnerships'

    if (token && supabaseBrowser) {
      const { error } = isPartnership
        ? await supabaseBrowser
            .from('partnership_bookings')
            .update({
              submission,
              artifact_completed_at: submittedAt,
            })
            .eq('token', token)
            .is('artifact_completed_at', null)
        : await supabaseBrowser
            .from('new_bookings')
            .update({
              submission,
              submitted_at: submittedAt,
              status: 'completed',
            })
            .eq('token', token)
            .is('submitted_at', null)

      if (error) {
        console.error('Supabase error:', error)
        setSubmitError('Something went wrong saving your response. Your score is shown below.')
      }
    }

    setResult({ score, tier })
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="asm-page">
      <header className="hdr">
        <div className="wrap hdr-inner">
          <a className="lockup" href="/" aria-label="Om Coda Consulting — Home">
            <img src="/assets/logo-pmco.svg" alt="" />
            <span className="stack" aria-hidden="true">
              <span className="top layout-lock-line"></span>
              <span className="sub layout-lock-line layout-lock-line--narrow"></span>
            </span>
          </a>
        </div>
      </header>

      <main className="asm-main">
        <div className="asm-split">
          <div className="asm-split__left">
            <section
              className="sec asm-hero-sec"
              id="asm-assessment-hero"
              aria-label={`${site.name}. ${site.tagline}`}
            >
              <div className="wrap">
                <div className="intro-mobile-shell">
                  <div className="intro-hero-eyebrow-col">
                    <div className="intro-hero-eyebrow-inner">
                      <span className="t-eyebrow">{site.name}</span>
                    </div>
                  </div>
                  <div className="intro-mobile-main">
                    <div className="asm-hero-gframe-mobile">
                      <div className="gframe rule-top">
                        <div className="gcell empty">
                          <span className="gcorner">B</span>
                        </div>
                        <div className="gcell empty">
                          <span className="gcorner">C</span>
                        </div>
                        <div className="gcell empty">
                          <span className="gcorner">D</span>
                        </div>
                        <div className="gcell empty">
                          <span className="gcorner">E</span>
                        </div>
                        <div className="gcell empty r-end">
                          <span className="gcorner">F</span>
                          <span className="gnum" style={{ marginTop: 'auto' }}>
                            —
                          </span>
                        </div>

                        <div className="gcell empty r2">
                          <span className="gcorner">H</span>
                        </div>
                        <div className="gcell c4 r2 r-end intro-hero-gcell">
                          <span className="gnum">01</span>
                          <span className="gcorner">I</span>
                          <div
                            className="layout-stack"
                            style={{
                              alignSelf: 'stretch',
                              marginTop: 'auto',
                              width: '100%',
                              gap: 'clamp(14px, 2vw, 22px)',
                            }}
                          >
                            <span className="t-eyebrow intro-hero-eyebrow--in-cell">{site.name}</span>
                            <h1 className="t-hero" style={{ margin: 0 }}>
                              {site.tagline}
                            </h1>
                            <p className="t-lead" style={{ margin: 0 }}>
                              {site.lead}
                            </p>
                          </div>
                        </div>

                        <div className="gcell empty b-end">
                          <span className="gcorner">K</span>
                        </div>
                        <div className="gcell empty b-end">
                          <span className="gcorner">L</span>
                        </div>
                        <div className="gcell empty b-end">
                          <span className="gcorner">M</span>
                        </div>
                        <div className="gcell empty c2 b-end r-end">
                          <span className="gcorner">N</span>
                        </div>
                      </div>
                    </div>

                    <div className="asm-hero-main-desktop">
                      <div className="asm-hero-desktop-inner">
                        <div className="asm-hero-desktop-meta" aria-hidden="true">
                          <span className="gnum">01</span>
                          <span className="gcorner">I</span>
                        </div>
                        <div
                          className="layout-stack asm-hero-desktop-copy"
                          style={{
                            alignSelf: 'stretch',
                            marginTop: 'auto',
                            width: '100%',
                            minWidth: 0,
                            gap: 'clamp(14px, 2vw, 22px)',
                          }}
                        >
                          <h1 className="t-hero" id="asm-hero-heading" style={{ margin: 0 }}>
                            {site.tagline}
                          </h1>
                          <p className="t-lead" style={{ margin: 0 }}>
                            {site.lead}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="asm-split__right">
            {!submitted ? (
              <form className="asm-form" onSubmit={handleSubmit} noValidate>
                <div className="asm-form__header">
                  <h1 className="asm-form__title">Practice assessment</h1>
                  <p className="asm-form__subtitle">
                    Takes about 2 minutes. Your score determines what we focus on in the call.
                  </p>
                  <div className="asm-progress-wrap">
                    <div
                      className="asm-progress"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${answeredCount} of ${questions.length} questions answered`}
                    >
                      <div className="asm-progress__bar" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="asm-progress__label">
                      {answeredCount} / {questions.length}
                    </span>
                  </div>
                </div>

                <div className="asm-form__questions">
                  {questions.map((q, qIdx) => {
                    const isMulti = q.type === 'multi'
                    const multiAns = (answers[q.id] as number[]) ?? []
                    const singleAns = answers[q.id] as number | undefined

                    return (
                      <fieldset key={q.id} className="asm-question">
                        <legend className="asm-question__label">
                          <span className="asm-question__num" aria-hidden="true">
                            {qIdx + 1}
                          </span>
                          {q.label}
                          {isMulti && <span className="asm-question__hint"> Select all that apply.</span>}
                        </legend>
                        <div className="asm-question__options">
                          {q.options.map((opt, optIdx) => {
                            const checked = isMulti ? multiAns.includes(optIdx) : singleAns === optIdx
                            return (
                              <label
                                key={optIdx}
                                className={[
                                  'asm-option',
                                  isMulti ? 'asm-option--checkbox' : '',
                                  checked ? 'asm-option--selected' : '',
                                ]
                                  .filter(Boolean)
                                  .join(' ')}
                              >
                                <input
                                  type={isMulti ? 'checkbox' : 'radio'}
                                  name={q.id}
                                  value={optIdx}
                                  checked={checked}
                                  onChange={() =>
                                    isMulti ? toggleMulti(q.id, optIdx) : toggleSingle(q.id, optIdx)
                                  }
                                  className="asm-option__input"
                                />
                                <span className="asm-option__check" aria-hidden="true" />
                                <span className="asm-option__text">{opt.label}</span>
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>
                    )
                  })}
                </div>

                <div className="asm-form__footer">
                  <button type="submit" className="asm-submit" disabled={!allAnswered || submitting}>
                    {submitting ? 'Saving…' : 'Get my score'}
                  </button>
                  {!allAnswered && !submitting && (
                    <p className="asm-form__remaining">
                      {questions.length - answeredCount} question
                      {questions.length - answeredCount !== 1 ? 's' : ''} remaining
                    </p>
                  )}
                  {submitError && <p className="asm-form__error">{submitError}</p>}
                </div>
              </form>
            ) : (
              <div className="asm-result">
                <div className="asm-result__score-row">
                  <span className="asm-result__score">{result?.score}</span>
                  <span className="asm-result__denom">/ 100</span>
                </div>
                <p className="asm-result__tier">{result?.tier.label}</p>
                <p className="asm-result__message">{result?.tier.message}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer linkHome />
    </div>
  )
}
