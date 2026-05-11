/**
 * Om Coda — marketing copy (single source for page + footer).
 * Tone: consultative, defensible, no overclaiming.
 */

export const site = {
  name: 'Om Coda Consulting',
  tagline: 'We solve business problems through partnerships, offers, and process.',
  lead:
    'We work with professional services firms across legal, immigration, and financial services to identify where revenue is being left on the table — and build the structured pathways that unlock it.',
} as const

export const thesis = {
  gutterEyebrow: 'Thesis',
  gutter:
    'Professional services firms where the relationship is the product. We study how you earn, then design offers, partnerships, and processes that compound what already works.',
  videoHeadline: 'Partnerships, offers, process',
  videoSupporting:
    'Structured pathways from first conversation to retained revenue — without leaning on ads or quick fixes.',
  panels: [
    {
      title: 'We believe',
      num: '01',
      body:
        'Great outcomes come from clarity on what you sell, who already holds access to the clients you need, and the operational rhythm that connects them.',
    },
    {
      title: 'We think',
      num: '02',
      body:
        'Every engagement starts with a hypothesis. We name the problem, form a thesis about where the opportunity sits, and sequence milestones so risk stays calibrated — weighted offer architecture applied to our work the same way we apply it to yours.',
    },
    {
      title: 'We see',
      num: '03',
      body:
        'Legal practices, immigration consultancies, financial services — organizations where trust compounds over years and the question is how to turn it into sustainable revenue.',
    },
  ],
} as const

/** Practices verticals: order matches data-industry-idx 1–5 and label-swap track (after “Industries”). */
export const industries = [
  {
    idx: 1,
    label: 'Financial services',
    solutions: [
      'Offer development',
      'Revenue architecture',
      'Partnership architecture',
      'Business development',
    ],
    cases: [
      'Margins compress when the fee story never caught up to how sophisticated clients actually buy — and every adjustment stayed incremental.',
      'Complex offerings hide revenue leaks because nobody mapped how value ladders across teams and touchpoints — only individual engagements.',
      'Referrals stall when capacity planning treated pipelines as optional — until upstream consistency broke exactly where revenue diversified.',
      'Automation amplified reporting nobody acted on — governance never matched the exceptions firms actually fight through under pressure.',
    ],
  },
  {
    idx: 2,
    label: 'Legal',
    solutions: [
      'Offer development',
      'Pipeline development',
      'Process design',
      'Client lifecycle design',
    ],
    cases: [
      'Partner-driven firms stall when the calendar is the bottleneck — new clients cannot be served until the partner frees bandwidth nobody modeled into capacity.',
      'Intake systems that were not built to scale absorb time that should have been billed — and the client experience degrades before anyone traces the root cause.',
      'Referral pipelines run on goodwill until a key relationship retires — then the firm discovers it never owned the source.',
      'Pricing was set at founding and has not moved since — the offer architecture is years old while the market moved past it.',
    ],
  },
  {
    idx: 3,
    label: 'Immigration',
    solutions: [
      'Offer development',
      'Operations & process design',
      'Pipeline development',
      'Workflow automation',
    ],
    cases: [
      'High-volume firms where operations are the offer — when that system breaks, outcomes break with it and the brand absorbs what operations missed.',
      'Case capacity was set by instinct, not unit economics — that is why utilization reads healthy while margins disagree.',
      'Intake-to-file cycles retain steps no one has authority to retire — teams inherited inefficiency as fact.',
      'Renewals slip because nobody engineered the moment between case close and the next retained touchpoint.',
    ],
  },
  {
    idx: 4,
    label: 'Mission-driven orgs',
    solutions: [
      'Program architecture',
      'Offer development',
      'Grant & donor pipelines',
      'Process design',
    ],
    cases: [
      'Grant dependency creates fragility — earned revenue needs offer architecture funders rarely incentivize but sustainability demands.',
      'Program delivery drifts from impact measurement — the story to supporters lags the data you hold.',
      'Development and programs answer siloed questions until a major supporter asks something neither side reconciles alone.',
      'Turnover reads as culture when it is usually workload design — culture initiatives cannot fix routing nobody owns.',
    ],
  },
  {
    idx: 5,
    label: 'Public sector',
    solutions: [
      'Diagnostic audit',
      'Stakeholder alignment',
      'Process design',
      'Systems & governance',
    ],
    cases: [
      'Procurement rewards compliance over performance — the innovative bid rarely wins while experience delivers mediocrity on schedule.',
      'Improvement mandates land without ownership — implementers had no stake in the diagnosis or the outcome.',
      'Reporting layers accumulated after past failures never leave when failure modes change — capacity disappears into data nobody uses.',
      'Alignment gets treated as a pre-project step when it is the project — the gap between meetings and decisions becomes the schedule.',
    ],
  },
] as const

export const practicesPin = {
  hint: 'Scroll through Financial services, Legal, Immigration, mission-driven orgs, and public-sector work — same methodology, different context.',
} as const

export const method = {
  eyebrow: 'Method',
  title: 'How we think',
  body: [
    'Every engagement starts with a hypothesis. We identify the problem, form a thesis about where the opportunity sits, and sequence a series of steps to get there.',
    'Our pricing reflects that thinking. We do not charge for effort. We structure every engagement around milestones — so risk is calibrated at every stage and nobody pays for something that has not been validated.',
    'We call this weighted offer architecture — the same framework we apply to our clients’ businesses that we apply to our own engagements.',
  ],
} as const

export const whatWeDo = {
  eyebrow: 'What we do',
  intro: [
    'We are not a marketing agency. We do not run ads or manage your social media.',
    'We are a consultancy. We come into a business, study how it earns, and design the offers, partnerships, and processes that compound what already works.',
    'The work sits across three disciplines:',
  ],
  disciplines: [
    {
      title: 'Offer development',
      text:
        'Designing what you sell, how it is priced, and how one transaction leads naturally to the next.',
    },
    {
      title: 'Partnership architecture',
      text:
        'Identifying who already has access to the clients or resources you need, and structuring relationships that serve both sides.',
    },
    {
      title: 'Business development',
      text:
        'Building the outreach systems, pipelines, and processes that generate consistent revenue without depending on referrals or paid advertising.',
    },
  ],
} as const

/** Supporting lexicon — honest, defensible labels aligned with the methodology. */
export const methodologyTerms: ReadonlyArray<{ term: string; definition: string }> = [
  {
    term: 'Offer development',
    definition:
      'Designing the specific offers a business leads with, priced and structured to close at every stage of the client relationship.',
  },
  {
    term: 'Partnership architecture',
    definition:
      'Identifying and structuring relationships with parties who already own access to the clients or resources you need.',
  },
  {
    term: 'Business development',
    definition:
      'Building the systems and relationships that generate consistent revenue growth.',
  },
  {
    term: 'Process design',
    definition:
      'Mapping and improving the operational steps that move a client from first contact to retained relationship.',
  },
  {
    term: 'Revenue architecture',
    definition:
      'Structuring how a business monetises its expertise across multiple service tiers and client touchpoints.',
  },
  {
    term: 'Client lifecycle design',
    definition:
      'Engineering the full journey from first transaction to long-term retained relationship.',
  },
  {
    term: 'Distribution strategy',
    definition:
      'Identifying the fastest and most cost-effective channels and partnerships to reach a target audience.',
  },
  {
    term: 'Demand generation',
    definition:
      'Creating the conditions that cause the right clients to raise their hand.',
  },
  {
    term: 'Value ladder design',
    definition:
      'Sequencing offers so each transaction naturally leads to the next.',
  },
  {
    term: 'Go-to-market strategy',
    definition:
      'Defining how a new offer or service reaches its first paying clients.',
  },
  {
    term: 'Pipeline development',
    definition:
      'Building the outreach systems and relationships that generate consistent qualified conversations.',
  },
  {
    term: 'Pricing strategy',
    definition:
      'Structuring price points that reflect the value delivered at each stage of the client relationship.',
  },
]

export const engage = {
  eyebrow: 'Engagement',
  titleFit: 'Who we work with',
  bodyFit:
    'Professional services firms where the relationship is the product — legal, immigration, financial services, and adjacent mission-driven or institutional contexts where trust has been earned over years.',
  titleNot: 'Who we are not for',
  bodyNot:
    'Businesses looking for quick fixes, guaranteed results, or someone to run their ads. We work with firms serious about building something that compounds. If that is not where you are right now, we are probably not the right fit.',
} as const

export const newsletter = {
  hint: 'Weighted milestones — not hourly fog. Reach out when you are ready to structure the next stage.',
} as const

export const footer = {
  methodLinks: [
    { href: '#method', label: 'Weighted offer architecture' },
    { href: '#thesis', label: 'Hypothesis & thesis' },
    { href: '#practices', label: 'Offer development' },
    { href: '#writing', label: 'Lexicon' },
  ],
  readingLinks: [
    { href: '#', label: 'Porter' },
    { href: '#', label: 'Abraham' },
    { href: '#', label: 'Sandler' },
    { href: '#', label: 'Hormozi' },
  ],
  officeLinks: [
    { href: '#engage', label: 'Fit & engagement' },
    { href: '#', label: 'Email' },
    { href: '#', label: 'LinkedIn' },
  ],
  tagline:
    'Offer development · Partnership architecture · Business development · Process design',
} as const
