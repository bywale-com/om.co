/** Raw score sum of all questions at max (used to normalize to 0–100). */
export const ASSESSMENT_MAX_RAW = 140

export type QuestionType = 'single' | 'multi'

export interface AssessmentOption {
  label: string
  score: number
}

export interface AssessmentQuestion {
  id: string
  label: string
  type: QuestionType
  options: AssessmentOption[]
  maxScore?: number
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    label: 'How long have you been running your practice?',
    type: 'single',
    options: [
      { label: 'Less than 1 year', score: 0 },
      { label: '1–3 years', score: 5 },
      { label: '3–7 years', score: 10 },
      { label: '7+ years', score: 15 },
    ],
  },
  {
    id: 'q2',
    label: 'Roughly how many clients have you worked with in total — past and present?',
    type: 'single',
    options: [
      { label: 'Fewer than 20', score: 0 },
      { label: '20–75', score: 5 },
      { label: '75–200', score: 10 },
      { label: '200+', score: 20 },
    ],
  },
  {
    id: 'q3',
    label: 'How are you currently storing client information?',
    type: 'single',
    options: [
      { label: "I don't have a formal system", score: 0 },
      { label: 'Spreadsheet', score: 5 },
      { label: 'Basic CRM or case management software', score: 10 },
      { label: 'Dedicated immigration or legal software', score: 15 },
    ],
  },
  {
    id: 'q4',
    label: 'Which of the following does your practice currently offer?',
    type: 'multi',
    maxScore: 10,
    options: [
      { label: 'Express Entry', score: 2 },
      { label: 'Study permits', score: 2 },
      { label: 'Work permits', score: 2 },
      { label: 'PR applications', score: 2 },
      { label: 'Business immigration', score: 2 },
      { label: 'Family sponsorship', score: 2 },
    ],
  },
  {
    id: 'q5',
    label: 'When a client completes a file with you — what typically happens next?',
    type: 'single',
    options: [
      { label: 'The relationship usually ends there', score: 0 },
      { label: 'They come back if they need something', score: 5 },
      { label: 'I occasionally follow up', score: 10 },
      { label: 'I have a structured process for staying in touch', score: 15 },
    ],
  },
  {
    id: 'q6',
    label: 'Have you ever worked with a marketing agency or growth consultant?',
    type: 'single',
    options: [
      { label: 'No, never', score: 0 },
      { label: "Yes but it didn't work out", score: 3 },
      { label: 'Yes and it was mixed', score: 7 },
      { label: 'Yes and it was effective', score: 10 },
    ],
  },
  {
    id: 'q7',
    label: 'What percentage of your clients would you say are Express Entry candidates?',
    type: 'single',
    options: [
      { label: "I'm not sure", score: 0 },
      { label: 'Under 20%', score: 5 },
      { label: '20–50%', score: 10 },
      { label: 'Over 50%', score: 15 },
    ],
  },
  {
    id: 'q8',
    label: 'How would you describe your comfort level with digital tools and new systems?',
    type: 'single',
    options: [
      { label: 'Not comfortable — I keep things simple', score: 0 },
      { label: 'Somewhat comfortable', score: 5 },
      { label: 'Comfortable — I adopt tools when they help', score: 10 },
      { label: 'Very comfortable — I actively look for better systems', score: 15 },
    ],
  },
  {
    id: 'q9',
    label: 'What is the primary reason you took this call?',
    type: 'single',
    options: [
      { label: 'Curious but not actively looking', score: 0 },
      { label: 'Open to growth if the right thing came along', score: 5 },
      { label: 'Actively trying to grow right now', score: 10 },
      { label: 'Growth is my number one priority this quarter', score: 15 },
    ],
  },
  {
    id: 'q10',
    label: 'If this was clearly a fit — how soon could you move forward?',
    type: 'single',
    options: [
      { label: 'Not sure yet', score: 0 },
      { label: 'A few months', score: 3 },
      { label: 'A few weeks', score: 7 },
      { label: 'This week', score: 10 },
    ],
  },
]

export type AssessmentAnswers = Record<string, number | number[]>

export function calcAssessmentScore(answers: AssessmentAnswers): number {
  let raw = 0
  for (const q of ASSESSMENT_QUESTIONS) {
    const ans = answers[q.id]
    if (ans === undefined) continue
    if (q.type === 'multi') {
      const selected = ans as number[]
      const pts = selected.reduce((sum, i) => sum + (q.options[i]?.score ?? 0), 0)
      raw += Math.min(pts, q.maxScore ?? pts)
    } else {
      raw += q.options[ans as number]?.score ?? 0
    }
  }
  return Math.round((raw / ASSESSMENT_MAX_RAW) * 100)
}

export function getAssessmentTier(score: number, smsDisplay: string) {
  if (score >= 80) {
    return {
      label: 'Tier 1 — Strong fit',
      message: `Your practice is well positioned. There is likely significant latent revenue in your existing client base. Text your score to ${smsDisplay} to confirm your call.`,
    }
  }
  if (score >= 55) {
    return {
      label: 'Tier 2 — Good fit',
      message: `There is real opportunity here. The call will show you exactly where. Text your score to ${smsDisplay} to confirm your slot.`,
    }
  }
  if (score >= 30) {
    return {
      label: 'Conditional',
      message: `Your practice may not be ready for the full program yet — but the call will tell us for certain. Text your score to ${smsDisplay}.`,
    }
  }
  return {
    label: 'Not ready',
    message: `Based on your answers, now may not be the right time. Text your score to ${smsDisplay} and we will let you know honestly.`,
  }
}
