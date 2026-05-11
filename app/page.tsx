'use client'
import useScrollEffects from '@/hooks/useScrollEffects'
import {
  engage,
  industries,
  methodologyTerms,
  method,
  newsletter,
  practicesPin,
  site,
  thesis,
  whatWeDo,
} from '@/lib/siteCopy'

export default function Home() {
  useScrollEffects()

  return (
    <div className="site-canvas">
      <aside className="site-rail" aria-hidden="true">
        <div className="site-rail__top">
          <span className="gnum">01</span>
          <span className="gcorner">A</span>
          <span className="eyebrow" style={{ marginTop: 'auto' }}></span>
        </div>
        <div className="site-rail__rule"></div>
        <div className="site-rail__bottom">
          <span className="gnum">02</span>
          <span className="gcorner">G</span>
          <div className="layout-stack" style={{ marginTop: 'auto' }}>
            <span className="layout-bar layout-bar--sm"></span>
            <span className="layout-bar layout-bar--sm" style={{ width: 'min(100%,12ch)', opacity: 0.6 }}></span>
          </div>
        </div>
      </aside>

      <div className="site-main">

        {/* HERO — brand + promise (grid shell cols 2–6) */}
        <section className="sec" id="intro">
          <div className="wrap">
            <div className="gframe rule-top">
              <div className="gcell empty"><span className="gcorner">B</span></div>
              <div className="gcell empty"><span className="gcorner">C</span></div>
              <div className="gcell empty"><span className="gcorner">D</span></div>
              <div className="gcell empty"><span className="gcorner">E</span></div>
              <div className="gcell empty r-end"><span className="gcorner">F</span><span className="gnum" style={{ marginTop: 'auto' }}>—</span></div>

              <div className="gcell empty r2"><span className="gcorner">H</span></div>
              <div className="gcell c4 r2 r-end">
                <span className="gnum">01</span>
                <span className="gcorner">I</span>
                <div className="layout-stack" style={{ alignSelf: 'stretch', marginTop: 'auto', width: '100%', gap: 'clamp(14px, 2vw, 22px)' }}>
                  <span className="t-eyebrow">{site.name}</span>
                  <h1 className="t-hero" style={{ margin: 0 }}>{site.tagline}</h1>
                  <p className="t-lead" style={{ margin: 0 }}>{site.lead}</p>
                </div>
              </div>

              <div className="gcell empty b-end"><span className="gcorner">K</span></div>
              <div className="gcell empty b-end"><span className="gcorner">L</span></div>
              <div className="gcell empty b-end"><span className="gcorner">M</span></div>
              <div className="gcell cta c2 b-end r-end">
                <span className="gcorner">→</span>
                <span className="hcta-arrow">→</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(16px, 1.8vw, 22px)', letterSpacing: '-0.02em', color: 'var(--paper-pure)' }}>Start with a hypothesis</span>
              </div>
            </div>
          </div>
        </section>

        {/* THESIS: 5-col shell aligned to hero — cols 1–2 pins, cols 3–5 inner 3-col grid */}
        <section className="sec sec-thesis" id="thesis">
          <div className="wrap">
            <div className="thesis-split">
              <aside className="thesis-pin-col">
                <div className="thesis-pin-inner">
                  <span className="gnum">02</span>
                  <span className="gcorner">A</span>
                  <span className="reveal-on-scroll reveal-on-scroll--inline">
                    <span className="reveal-on-scroll__ghost" aria-hidden="true"></span>
                    <span className="reveal-on-scroll__main eyebrow thesis-eyebrow">{thesis.gutterEyebrow}</span>
                  </span>
                </div>
              </aside>
              <aside className="thesis-lorem-col">
                <div className="thesis-lorem-inner">
                  <span className="gcorner">B</span>
                  <div className="reveal-on-scroll thesis-gutter-reveal">
                    <div className="reveal-on-scroll__ghost" aria-hidden="true"></div>
                    <p className="thesis-gutter-copy reveal-on-scroll__main">{thesis.gutter}</p>
                  </div>
                </div>
              </aside>
              <div className="thesis-flow-col">
                <div className="gframe thesis-flow-grid" style={{ borderLeft: 'none', borderRight: 'none', borderRadius: '0' }}>
                  <div className="gcell thesis-media r-end thesis-r1-media"><span className="gcorner">E</span>
                    <div className="thesis-media-inner">
                      <div className="thesis-media-primary">
                        <div className="featured-video-wrap">
                          <video playsInline controls preload="metadata">
                            <source src="/assets/video_1.mp4" type="video/mp4" />
                          </video>
                        </div>
                        <div className="featured-meta-bar reveal-on-scroll">
                          <div className="reveal-on-scroll__ghost" aria-hidden="true"></div>
                          <div className="reveal-on-scroll__main">
                            <strong>{thesis.videoHeadline}</strong>
                            <span>{thesis.videoSupporting}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="gcell r-end thesis-r2-span thesis-carousel-slot"><span className="gcorner">I</span>
                    <div className="thesis-carousel-band">
                      <div className="logo-marquee">
                        <div className="logo-marquee__inner">
                          <span className="logo-marquee__brand" aria-label="Google"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.347 0 6.053-1.093 8.107-3.147 2.093-2.093 2.747-5.027 2.747-7.653 0-.76-.053-1.467-.173-2.133H12.48z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Nike"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M24 7.8c-2.3 1.8-9.8 8.3-14 11.8C8 22 4 24 0 24c2.5-3 6.2-8.5 7.5-11C9 10 9.5 6 12 2c3 2 8 4.5 12 5.8z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Facebook"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Spotify"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.261 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Google"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.347 0 6.053-1.093 8.107-3.147 2.093-2.093 2.747-5.027 2.747-7.653 0-.76-.053-1.467-.173-2.133H12.48z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Nike"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M24 7.8c-2.3 1.8-9.8 8.3-14 11.8C8 22 4 24 0 24c2.5-3 6.2-8.5 7.5-11C9 10 9.5 6 12 2c3 2 8 4.5 12 5.8z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Facebook"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></span>
                          <span className="logo-marquee__brand" aria-label="Spotify"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.261 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z"/></svg></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="gcell r-end thesis-r3-pin-row">
                    <div className="thesis-split-scroll">
                      <div className="thesis-split-scroll__sticky-photo">
                        <span className="gcorner">·</span>
                        <div className="thesis-col-cover__fill">
                          <img className="thesis-col-cover__img" src="/assets/team-photo-1.png" alt="Professional portrait in a bright modern office" width={1200} height={1600} decoding="async" loading="lazy" />
                        </div>
                      </div>
                      <div className="thesis-split-scroll__copy">
                        <div className="thesis-copy-chrome">
                          <span className="gnum">02 · b</span>
                          <span className="gcorner">J</span>
                        </div>
                        {thesis.panels.map((panel) => (
                          <article key={panel.num} className="thesis-phase-panel">
                            <div className="reveal-on-scroll thesis-phase-panel__reveal">
                              <div className="reveal-on-scroll__ghost" aria-hidden="true"></div>
                              <div className="reveal-on-scroll__main">
                                <h2 className="we-believe__title">{panel.title}</h2>
                                <div className="thesis-phase__statement">
                                  <span className="we-believe__num">{panel.num}</span>
                                  <p className="we-believe__text">{panel.body}</p>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="gcell empty thesis-r4-c2"><span className="gcorner">·</span></div>
                  <div className="gcell empty thesis-r4-c3"><span className="gcorner">L</span></div>
                  <div className="gcell r-end thesis-r4-n" style={{ background: 'var(--ink)', color: 'var(--paper-pure)' }}><span className="gnum" style={{ color: 'var(--mute-2)' }}>02 · d</span><span className="gcorner" style={{ color: 'var(--mute-2)' }}>N</span><div className="layout-stack" style={{ marginTop: 'auto' }}><span className="layout-bar layout-bar--md layout-bar--on-dark"></span></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="method">
          <div className="wrap">
            <div className="method-canvas">
              <div className="method-rail">
                <div className="gcell empty"><span className="gcorner">B</span></div>
                <div className="method-rail__rule"></div>
                <div className="gcell">
                  <span className="gnum">04</span>
                  <span className="gcorner">F</span>
                  <span className="eyebrow" style={{ marginTop: 'auto', color: 'var(--ink)', alignSelf: 'flex-start', borderBottomColor: 'var(--ink)' }}>{method.eyebrow}</span>
                </div>
              </div>
              <div className="method-main">
                <div className="gframe">
                  <div className="gcell c3">
                    <span className="gnum">04 · 0</span>
                    <span className="gcorner">C</span>
                    <p className="t-eyebrow" style={{ marginTop: '12px', marginBottom: 0 }}>{whatWeDo.eyebrow}</p>
                    {whatWeDo.intro.map((para, i) => (
                      <p key={i} className="gbody" style={{ margin: i === 0 ? '14px 0 0' : '12px 0 0' }}>
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="gcell empty r-end"><span className="gcorner">D</span></div>

                  {whatWeDo.disciplines.map((d, i) => (
                    <div key={d.title} className="gcell method-discipline-cell">
                      <span className="gnum">{String(i + 1).padStart(2, '0')}</span>
                      <span className="gcorner">{(['G', 'H', 'I'] as const)[i]}</span>
                      <p className="method-discipline-cell__title">{d.title}</p>
                      <span className="method-discipline-cell__grow" aria-hidden="true" />
                      <p className="gbody method-discipline-cell__body">{d.text}</p>
                    </div>
                  ))}
                  <div className="gcell empty r-end"><span className="gcorner">J</span><span className="gnum" style={{ marginTop: 'auto' }}>→</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="writing">
          <div className="wrap">
            <div className="writing-canvas writing-collapsed">
              <div className="writing-rail">
                <div className="gcell">
                  <span className="gnum">05</span>
                  <span className="gcorner">A</span>
                  <span className="eyebrow" style={{ marginTop: 'auto', color: 'var(--ink)', borderBottomColor: 'var(--ink)' }}>Lexicon</span>
                </div>
                <div className="writing-rail__rule"></div>
                <div className="gcell empty"><span className="gcorner">·</span></div>
                <div className="writing-rail__rule"></div>
                <div className="gcell empty"><span className="gcorner">·</span></div>
              </div>
              <div className="writing-main">
                <div className="gframe writing-lexicon-frame" style={{ gridAutoRows: 'auto' }}>
                  <div className="gcell c3 r-end methodology-lexicon-intro" style={{ minHeight: 0 }}>
                    <span className="gnum">05 · 0</span>
                    <span className="gcorner">B</span>
                    <p className="gbody" style={{ marginTop: '12px', maxWidth: '62ch' }}>
                      A shared vocabulary for the work — honest labels aligned with what the methodology actually does. No overclaiming.
                    </p>
                  </div>
                  <div className="gcell c3 r-end methodology-lexicon-grid" style={{ gridColumn: '1 / -1', minHeight: 0 }}>
                    <dl className="methodology-glossary">
                      {methodologyTerms.map((row) => (
                        <div key={row.term} className="methodology-glossary__row">
                          <dt>{row.term}</dt>
                          <dd>{row.definition}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="practices">
          <div className="practices-pin-stage">
            <div className="practices-pin-sticky">
              <div className="wrap">
                <div className="gframe">
                  <div className="gcell empty"><span className="gcorner">B</span></div>
                  <div className="gcell c3 practices-c3-media">
                    <span className="gnum">03 · 0</span><span className="gcorner">C</span>
                    {/* Financial services */}
                    <div className="practices-industry-content" data-industry-idx="1">
                      <div className="practices-c3-media__fill" aria-hidden="true">
                        <video className="practices-c3-media__video" muted playsInline loop preload="metadata" disablePictureInPicture aria-hidden="true">
                          <source src="/assets/verticals_1.mp4" type="video/mp4" />
                          <source src="/assets/video_1.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                    {/* Legal */}
                    <div className="practices-industry-content" data-industry-idx="2">
                      <div className="practices-c3-media__fill" aria-hidden="true">
                        <img className="practices-c3-media__img" src="/assets/team-photo-1.png" alt="" width={1200} height={1600} decoding="async" loading="lazy" />
                      </div>
                    </div>
                    {/* Immigration */}
                    <div className="practices-industry-content" data-industry-idx="3">
                      <div className="practices-c3-media__fill" aria-hidden="true">
                        <img className="practices-c3-media__img" src="/assets/verticals_1.gif" alt="" decoding="async" loading="lazy" />
                      </div>
                    </div>
                    {/* Mission-driven orgs */}
                    <div className="practices-industry-content" data-industry-idx="4">
                      <div className="practices-c3-media__fill" aria-hidden="true">
                        <img className="practices-c3-media__img" src="/assets/team-photo-1.png" alt="" width={1200} height={1600} decoding="async" loading="lazy" style={{ filter: 'grayscale(1) contrast(1.1)' }} />
                      </div>
                    </div>
                    {/* Government */}
                    <div className="practices-industry-content" data-industry-idx="5">
                      <div className="practices-c3-media__fill" aria-hidden="true">
                        <video className="practices-c3-media__video" muted playsInline loop preload="metadata" disablePictureInPicture aria-hidden="true">
                          <source src="/assets/video_1.mp4" type="video/mp4" />
                          <source src="/assets/verticals_1.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  </div>
                  <div className="gcell empty r-end practices-case-cell">
                    <div className="practices-cell-head">
                      <div className="practices-cell-head__row">
                        <span className="gnum" aria-hidden="true" style={{ visibility: 'hidden' }}>03 · 2</span>
                        <span className="gcorner">D</span>
                      </div>
                      <h2 className="we-believe__title">Signals</h2>
                    </div>
                    {industries.map((ind) => (
                      <div
                        key={ind.idx}
                        className="practices-industry-content"
                        data-industry-idx={String(ind.idx)}
                        data-reveal-order="3"
                      >
                        <ol className="practices-case-list">
                          {ind.cases.map((line, i) => (
                            <li key={i}>
                              <a href="#">{line}</a>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>

                  <div className="gcell practices-pin-cell" style={{ minHeight: 0 }}>
                    <div className="practices-pin-inner" data-active-index="0">
                      <span className="gnum">03 · 1</span><span className="gcorner">E</span>
                      <div className="practices-label-swap">
                        <div className="practices-label-swap__viewport">
                          <div className="practices-label-swap__track">
                            <span className="practices-label-swap__word eyebrow industries-eyebrow">Industries</span>
                            {industries.map((ind) => (
                              <span key={ind.idx} className="practices-label-swap__word eyebrow industries-eyebrow">
                                {ind.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="practices-pin-hint">{practicesPin.hint}</p>
                    </div>
                  </div>
                  <div className="gcell c2 practices-solutions-cell" style={{ minHeight: 0 }}>
                    <div className="practices-cell-head">
                      <div className="practices-cell-head__row">
                        <span className="gnum">03 · 2</span><span className="gcorner">F</span>
                      </div>
                      <h2 className="we-believe__title">Disciplines</h2>
                    </div>
                    {industries.map((ind) => (
                      <div
                        key={ind.idx}
                        className="practices-industry-content"
                        data-industry-idx={String(ind.idx)}
                        data-reveal-order="2"
                      >
                        <ul className="practices-solutions-stack">
                          {ind.solutions.map((label, si) => (
                            <li key={`${ind.idx}-${si}`} className="practices-solutions-item">
                              <span className="practices-solutions-num">{String(si + 1).padStart(2, '0')}</span>
                              <span className="practices-solutions-label">{label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="gcell c2 r-end practices-news-cell" style={{ minHeight: 0 }}>
                    <div className="practices-cell-head">
                      <div className="practices-cell-head__row">
                        <span className="gnum">03 · 3</span><span className="gcorner">G</span>
                      </div>
                      <h2 className="we-believe__title practices-news-title">Highlights</h2>
                    </div>
                    {industries.map((ind) => (
                      <div
                        key={ind.idx}
                        className="practices-industry-content"
                        data-industry-idx={String(ind.idx)}
                        data-reveal-order="4"
                      >
                        <div className="practices-news-carousel">
                          <div
                            className="practices-news-carousel__viewport"
                            tabIndex={0}
                            aria-label={`${ind.label} — highlights`}
                          >
                            <div className="practices-news-carousel__slide"><img src="/assets/team-photo-1.png" alt="" width={800} height={600} loading="lazy" decoding="async" /></div>
                            <div className="practices-news-carousel__slide"><img src="/assets/team-photo-1.png" alt="" width={800} height={600} loading="lazy" decoding="async" /></div>
                            <div className="practices-news-carousel__slide"><img src="/assets/team-photo-1.png" alt="" width={800} height={600} loading="lazy" decoding="async" /></div>
                          </div>
                          <div className="practices-news-carousel__controls">
                            <button type="button" className="practices-news-carousel__btn" data-practices-news-prev aria-label="Previous slide">Prev</button>
                            <button type="button" className="practices-news-carousel__btn" data-practices-news-next aria-label="Next slide">Next</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="engage">
          <div className="wrap">
            <div className="gframe">
              <div className="gcell empty"><span className="gcorner">B</span></div>
              <div className="gcell c3">
                <span className="gnum">06 · 0</span>
                <span className="gcorner">C</span>
                <p className="t-eyebrow" style={{ marginTop: '12px' }}>{engage.eyebrow}</p>
              </div>
              <div className="gcell empty r-end"><span className="gcorner">D</span></div>

              <div className="gcell engage-rail-cell"><span className="gnum">·</span><span className="gcorner">F</span><p className="gbody engage-rail-cell__bottom">Milestone-priced engagements.</p></div>
              <div className="gcell engage-rail-cell">
                <span className="gnum">·</span><span className="gcorner">G</span>
                <h2 className="we-believe__title engage-rail-cell__title">{method.title}</h2>
                {method.body.map((para, i) => (
                  <p key={i} className="gbody" style={{ margin: i === 0 ? '12px 0 0' : '14px 0 0' }}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="gcell engage-rail-cell">
                <span className="gnum">·</span><span className="gcorner">H</span>
                <h2 className="we-believe__title engage-rail-cell__title">{engage.titleFit}</h2>
                <p className="gbody" style={{ marginTop: '12px' }}>{engage.bodyFit}</p>
              </div>
              <div className="gcell engage-rail-cell">
                <span className="gnum">·</span><span className="gcorner">I</span>
                <h2 className="we-believe__title engage-rail-cell__title">{engage.titleNot}</h2>
                <p className="gbody" style={{ marginTop: '12px' }}>{engage.bodyNot}</p>
              </div>
              <div className="gcell empty r-end engage-col-span-2"><span className="gcorner">J</span></div>
            </div>
          </div>
        </section>

        <section className="sec" aria-hidden="true">
          <div className="wrap">
            <div className="gframe" style={{ gridAutoRows: 'minmax(120px, 1fr)', borderColor: 'var(--ink)', background: 'var(--ink)' }}>
              <div className="gcell dark c3" style={{ minHeight: 0, borderColor: '#2a2a2a' }}><span className="gnum" style={{ color: 'var(--mute-2)' }}>07</span><span className="gcorner">A</span><div className="layout-stack" style={{ marginTop: 'auto' }}><span className="layout-bar layout-bar--xl layout-bar--on-dark"></span><span className="layout-bar layout-bar--lg layout-bar--on-dark"></span></div></div>
              <div className="gcell dark c2 r-end" style={{ minHeight: 0, borderColor: '#2a2a2a' }}><span className="gnum" style={{ color: 'var(--mute-2)' }}>07 · 1</span><span className="gcorner">B</span>
                <div className="layout-stack" style={{ marginTop: '16px' }}><span className="layout-bar layout-bar--body layout-bar--on-dark"></span><span className="layout-bar layout-bar--body layout-bar--on-dark" style={{ width: '80%' }}></span></div>
                <div className="form"><input type="text" readOnly tabIndex={-1} aria-hidden="true" /><button type="button">→</button></div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.119em', textTransform: 'uppercase', color: 'transparent', marginTop: '8px', display: 'block', height: '12px' }}></span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
