// The fake "multiplayer" cast that drives the drifting canvas cursors.

export interface Collaborator {
  initials: string
  name: string
  role: string
  /** CSS color — Figma's multiplayer cursor palette */
  color: string
  /** Section id the cursor likes to hover around */
  homeSection: string
  /** Occasional cursor-chat line */
  chat?: string
}

const collaborators: Collaborator[] = [
  { initials: 'EC', name: 'Emily', role: 'Recruiter', color: 'var(--figma-cursor-purple)', homeSection: 'case-studies', chat: 'strong case studies 👀' },
  { initials: 'PA', name: 'Priya', role: 'PM', color: 'var(--figma-cursor-green)', homeSection: 'testimonials', chat: 'strong outcomes' },
  { initials: 'TG', name: 'Tom', role: 'Eng Lead', color: 'var(--figma-cursor-orange)', homeSection: 'experience', chat: 'nice ✦' },
  { initials: 'MS', name: 'Maya', role: 'Design Lead', color: 'var(--figma-cursor-red)', homeSection: 'about', chat: '' },
  { initials: 'AZ', name: 'Arjun', role: 'Founder', color: 'var(--figma-cursor-blue)', homeSection: 'contact', chat: '' },
]

/** The three collaborators whose cursors drift on the canvas (desktop only) */
export const cursorCast = [collaborators[0], collaborators[1], collaborators[2]]
