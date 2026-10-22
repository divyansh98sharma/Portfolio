# Spec — Interactive RBAC demonstration ("Try both models")

Status: **proposal for review** · Owner: Divyansh · Implementation: separate branch/PR after this spec is approved.

## 1. Purpose

Let a reviewer *feel* the problem and the design change in the Role-Based Access
Control case study (`/case-study-2`) instead of reading about it:

- **Before:** add a user by making a permission choice for each of 22 resources in four sections.
- **After:** define a role once, then add users by picking that role.

It is an explanation device for the case study's own claims — not a product
replica, not a usability study, and not evidence of outcomes.

## 2. Evidence it may use (and nothing else)

Everything the demo states must trace to `src/data/case-studies/rbac.ts`:

| Demo element | Source in `rbac.ts` |
|---|---|
| 22 resources across four sections; one choice per resource; nothing reusable | `contextParagraphs[0]` |
| Old choices were Read / Write / Deny | `contextParagraphs[0]` |
| New levels: Read → Write → Delete, cascading; selecting nothing = no access; Deny removed | `rbacReleaseOneDecisions[1]` |
| Every user must have a role | `rbacReleaseOneDecisions[2]` |
| Users can be added while creating a role | `rbacReleaseOneDecisions[3]` |
| Default roles are locked; clone to customize | `rbacReleaseOneDecisions[4]` |
| Release 1: one role per user; Release 2: several roles per user | `rbacReleaseOneConstraint`, `rbacReleaseTwo` |
| Known gap: which role a user has, and their effective permissions, was hard to see | `rbacReflectionIntro`, `rbacReflectionActions` |

### Content-integrity rules
1. **No product screenshots or real resource names.** Resource and section names are generic and visibly labelled *"Illustrative — not the Peak product"* (e.g. *Section A · Resource 01*). The real 22 names are not in the repo and may be confidential.
2. **No outcome metrics.** The demo never states time saved, error reduction, adoption or satisfaction. It must not reuse the research figures (4 participants, 21/24) as if the demo measured anything.
3. **Counts are about the visitor's own session only** and say so: *"In this demo you made 22 choices for one user."* That is arithmetic on the visitor's clicks, not a claim about Peak's users.
4. **Default role names** are generic (*Viewer, Editor, Admin*) and labelled illustrative.
5. The demo links to the written decisions; it does not paraphrase them into new claims.

## 3. Placement and narrative

New frame in `RbacCaseStudy.tsx` between **01 · Problem** and **02 · Research**:
`<Frame id="cs-try-it" name="01b · Try both models" …>` — so it registers in the layers panel, Chapter Rail and Quick Open automatically.

Three steps, presented as Figma-style *pages* inside the frame (tabs):

1. **Before — add one user.** A long, sectioned form: 22 rows × {Read, Write, Deny}. A live counter: *"Choices made: n / 22 for user 1."* After completion, a second blank user appears: *"User 2 starts from scratch — 22 more."* Never forces the visitor to finish; a "Show me the result" control fills the form.
2. **After — define a role once.** A role editor using the new model: per section a cascading level selector (None · Read · Write · Delete, where higher includes lower). Optional *"Add people now"* field inside the same form (decision 4). Default roles appear locked with a *Clone to customize* action (decision 5).
3. **After — add users.** Adding a user requires choosing a role (decision 2) — the *Add* button stays disabled with an inline reason until a role is picked. A toggle *"Release 2: allow more than one role"* switches the picker to multi-select.

A compact side panel, **Effective permissions**, shows what the selected user can do per section. It is labelled as the reflection's proposed improvement (*"What I'd add today"*), not as shipped behaviour.

## 4. Interaction and state

- Pure client state (React `useReducer`); no network, no Firebase, no persistence beyond the page.
- State shape: `{ step, legacy: Record<resourceId, 'read'|'write'|'deny'|null>, roles: Role[], users: User[], multiRole: boolean }`.
- Cascading levels are an ordered enum; "includes lower levels" is derived, never stored twice.
- Locked default roles cannot be mutated by the reducer (enforced in the reducer, not only the UI).
- Reset control returns to step 1.

## 5. Accessibility (WCAG 2.2 AA)

- Steps are a tablist (`role=tablist` / `tab` / `tabpanel`) with arrow-key navigation; each panel has a heading.
- Legacy rows are native radio groups (`fieldset` + `legend` = resource name). Cascading levels are a native radio group per section; the "includes" relationship is stated in text, not only by colour/fill.
- Live counters use one polite `role=status` region, debounced so it doesn't announce every click.
- Disabled *Add user* explains why in adjacent text tied with `aria-describedby`.
- Locked roles: `aria-disabled` + visible lock label; Clone is a real button.
- Targets ≥ 44×44 on touch; visible focus via existing `--figma-blue` focus tokens; contrast via existing frame tokens (`--frame-text-*`, `--cs-accent-strong`).
- No information conveyed by motion alone.

## 6. Responsive behaviour

- ≥ 1024px: form/editor left, effective-permissions panel right.
- 768–1023px: panel collapses under the editor.
- < 768px: legacy form shows one section at a time with a section stepper ("Section 2 of 4") so 22 rows aren't one 2,000px scroll; counters stay sticky at the frame's top edge (inside the frame, not `position: fixed`, so they can't collide with floating chrome).
- No horizontal overflow at 320px.

## 7. Motion

- Only purposeful transitions: step change (150 ms fade), level-cascade fill (120 ms).
- `prefers-reduced-motion: reduce` → no transitions; state changes are instant.
- CSS only. No new animation library (framer-motion is being removed for bundle size).

## 8. Performance budget

- Lazy-loaded with the RBAC case-study chunk only; **0 bytes added to the entry bundle**.
- ≤ 12 kB gzip for the component + data.
- No layout shift when the frame mounts (fixed min-height per step).

## 9. Tests (added to the Playwright suite)

- Step navigation by mouse, touch and arrow keys; tab semantics.
- Legacy counter reaches 22/22; second user resets to 0/22.
- Cascading: choosing Write implies Read; choosing None clears all.
- Add user is disabled until a role is picked; enabled after.
- Multi-role toggle switches picker to multi-select.
- Locked role cannot be edited; Clone creates an editable copy.
- Reduced motion: no running transitions.
- axe clean in light and dark; no overflow 320–1920px; no collision with floating controls.

## 10. Out of scope

Real permission semantics of the Peak product, multi-role conflict resolution
(the case study lists it as pending evidence), persistence, analytics events.

## 11. Open questions for the owner

1. Is "Section A–D / Resource 01–22" acceptable, or are any real section names safe to show?
2. Should step 1 require completing all 22 choices, or always offer "Show me the result"? (Spec assumes the shortcut is always available.)
3. Include the *Effective permissions* panel (reflection's proposal) or keep the demo strictly to shipped behaviour?
