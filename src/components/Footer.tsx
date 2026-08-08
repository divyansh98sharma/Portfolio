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
      <p className="text-[14px] font-medium" style={{ color: 'var(--figma-text)' }}>
        Divyansh Sharma · UX Designer · 5+ Years in Design &amp; Product
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px]">
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

      <p className="mt-3 text-[12px]">
        © {currentYear} Divyansh Sharma · Designed as a Figma file, because that's where I live
      </p>

      <p className="mx-auto mt-3 max-w-[680px] text-[12px] leading-relaxed">
        This site remembers you the way a browser can, not the way a login would: a random ID and
        the name you type into the corner prompt power the live comments, reactions, sticker
        stamps, and visitor stack. I also log anonymous scroll depth per case study and resume
        download counts, so I know what's actually being read. Google Analytics only runs if you
        say yes to it — off by default, no ad personalization. No ads, nothing sold.
      </p>
    </footer>
  )
}
