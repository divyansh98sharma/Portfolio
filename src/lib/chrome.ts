// Shared sizing for the Figma-chrome shell — kept in one place so the
// floating pills, layers panel and scroll offsets never drift apart.
// UI3: pills float at top-3 (12px) with ~44px height → 64px clearance.
export const TOPBAR_HEIGHT = 64
export const STATUSBAR_HEIGHT = 32
export const LAYERS_PANEL_WIDTH = 240

// Below lg the layers panel is hidden; below md the toolbar, status
// pill, cursors and comment pins go too — phones get the top pills +
// progress line only.
export const DESKTOP_CHROME_QUERY = '(min-width: 1024px)'
export const TABLET_CHROME_QUERY = '(min-width: 768px)'
