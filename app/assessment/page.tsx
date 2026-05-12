import type { Metadata } from 'next'
import AssessmentClient from './AssessmentClient'

export const metadata: Metadata = {
  title: 'Practice assessment · Om Coda Consulting',
  description:
    'Short scored assessment for professional services practices. Direct link only — not in site navigation.',
  robots: { index: false, follow: false },
}

export default function AssessmentPage() {
  return <AssessmentClient />
}
