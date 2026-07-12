## 2024-05-24 - Missing Input Length Limits on Comment Tool
**Vulnerability:** The mock Figma Comment Tool (`src/components/chrome/tools/CommentTool.tsx`) allowed users to input strings of arbitrary length, which were then stored in `sessionStorage`.
**Learning:** Even in purely static frontend applications with no backend, user-controllable input stored in client-side storage mechanisms (like `sessionStorage` or `localStorage`) can lead to client-side Denial of Service (DoS) or storage quota exhaustion if not bounded.
**Prevention:** Always apply `maxLength` attributes to input fields and enforce sensible limits on the number of stored items, regardless of whether the data is sent to a server.
