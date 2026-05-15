import type { Metadata } from 'next'
import AssessmentClient from '../assessment/AssessmentClient'

export const metadata: Metadata = {
  title: 'Partnerships · Om Coda Consulting',
  description:
    'Partnerships intake for professional services practices. Direct link only — not in site navigation.',
  robots: { index: false, follow: false },
}

export default function PartnershipsPage() {
  return <AssessmentClient variant="partnerships" />
}
