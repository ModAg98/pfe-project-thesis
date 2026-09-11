import type { FC } from 'react'
import { S01Cover } from './S01Cover'
import { S02Plan } from './S02Plan'
import { S03Lean } from './S03Lean'
import { S04Obeya } from './S04Obeya'
import { S05Gemba } from './S05Gemba'
import { S06Problem } from './S06Problem'
import { S07Cost } from './S07Cost'
import { S08Meaning } from './S08Meaning'
import { S09Solution } from './S09Solution'
import { S10Architecture } from './S10Architecture'
import { S11Stack } from './S11Stack'
import { S11Pipeline } from './S11Pipeline'
import { S12RAG } from './S12RAG'
import { S13RAGGenerate } from './S13RAGGenerate'
import { S10FiveW2H } from './S10FiveW2H'
import { S11Grounded } from './S11Grounded'
import { S12Results } from './S12Results'
import { S14Conclusion } from './S14Conclusion'
import { S15End } from './S15End'

export type SectionProps = { step: number; active: boolean }

export type SectionDef = {
  id: string
  /** Shown in the progress bar and the overview grid. */
  title: string
  /** Progressive-disclosure steps inside the section. */
  steps: number
  /** Rough speaking time, used only for the rehearsal budget in the README. */
  minutes: number
  Component: FC<SectionProps>
}

export const sections: SectionDef[] = [
  { id: 'cover', title: 'Cover', steps: 1, minutes: 0.7, Component: S01Cover },
  { id: 'plan', title: 'Agenda', steps: 3, minutes: 0.6, Component: S02Plan },
  { id: 'lean', title: 'Lean', steps: 3, minutes: 0.8, Component: S03Lean },
  { id: 'obeya', title: 'Obeya → iObeya', steps: 4, minutes: 0.9, Component: S04Obeya },
  { id: 'gemba', title: 'Gemba Walk Assistant', steps: 4, minutes: 1.1, Component: S05Gemba },
  { id: 'problem', title: 'The problem', steps: 3, minutes: 1.2, Component: S06Problem },
  { id: 'cost', title: 'What it costs', steps: 3, minutes: 0.7, Component: S07Cost },
  { id: 'meaning', title: 'Search by meaning', steps: 4, minutes: 1.1, Component: S08Meaning },
  { id: 'solution', title: 'The solution', steps: 5, minutes: 2.6, Component: S09Solution },
  { id: 'architecture', title: 'Architecture', steps: 4, minutes: 1.0, Component: S10Architecture },
  { id: 'stack', title: 'Built with', steps: 2, minutes: 0.8, Component: S11Stack },
  { id: 'pipeline', title: 'The pipeline', steps: 5, minutes: 1.2, Component: S11Pipeline },
  { id: 'fivew2h', title: 'Built on 5W2H', steps: 5, minutes: 1.4, Component: S10FiveW2H },
  { id: 'rag-retrieve', title: 'RAG · Retrieval', steps: 5, minutes: 1.6, Component: S12RAG },
  { id: 'rag-generate', title: 'RAG · Generation', steps: 5, minutes: 1.3, Component: S13RAGGenerate },
  { id: 'grounded', title: 'Grounded AI', steps: 5, minutes: 1.2, Component: S11Grounded },
  { id: 'results', title: 'Results', steps: 4, minutes: 1.4, Component: S12Results },
  { id: 'conclusion', title: 'Conclusion', steps: 3, minutes: 0.9, Component: S14Conclusion },
  { id: 'end', title: 'Thank you', steps: 1, minutes: 0.3, Component: S15End },
]

export const totalMinutes = sections.reduce((a, s) => a + s.minutes, 0)
