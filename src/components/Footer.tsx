const inter = { fontFamily: "'Inter', sans-serif" }

/**
 * Canvas credits — small Inter text sitting directly on the dotted canvas
 * below the last frame, like a note left at the bottom of a Figma page.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="figma-chrome mx-auto max-w-[1200px] px-6 pb-16 pt-4 text-center"
      role="contentinfo"
      style={{ ...inter, color: 'var(--figma-text-dim)' }}
    >
      <p className="text-[12px] font-medium" style={{ color: 'var(--figma-text)' }}>
        Divyansh Sharma · UX Designer · 5+ Years in Design &amp; Product
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px]">
        <a
          href="mailto:work.divyanshsharma@gmail.com"
          className="no-underline transition-colors hover:text-[var(--figma-blue)]"
          style={{ color: 'var(--figma-text-dim)' }}
        >
          work.divyanshsharma@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/divyansh98sharma"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline transition-colors hover:text-[var(--figma-blue)]"
          style={{ color: 'var(--figma-text-dim)' }}
        >
          LinkedIn
        </a>
        <a
          href="https://medium.com/@divyansh98sharma"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline transition-colors hover:text-[var(--figma-blue)]"
          style={{ color: 'var(--figma-text-dim)' }}
        >
          Medium
        </a>
      </div>

      <p className="mt-3 text-[10px]">
        © {currentYear} Divyansh Sharma · Designed as a Figma file, because that's where I live
      </p>
    </footer>
  )
}
