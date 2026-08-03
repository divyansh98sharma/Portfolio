const montserrat = { fontFamily: "'Silkscreen', sans-serif" }
const inter = { fontFamily: "'Space Mono', sans-serif" }

interface CoverArtProps {
  product: string
  company: string
  accent: string
  className?: string
  /** larger wordmark for the case-study cover */
  large?: boolean
}

/**
 * Generated Figma-community-style cover: dark gradient, faint dot grid,
 * an abstract UI wireframe, and the product wordmark. Replaces the stock
 * Unsplash thumbnails until real work shots exist.
 */
export function CoverArt({ product, company, className = '', large = false }: CoverArtProps) {
  return (
    <div
      className={`relative flex h-full w-full flex-col justify-end overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #262626 100%)',
      }}
      aria-hidden="true"
    >
      {/* faint canvas dots */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* abstract product wireframe */}
      <svg
        viewBox="0 0 320 220"
        className="absolute -right-6 top-1/2 w-[72%] -translate-y-1/2 opacity-90"
        fill="none"
        aria-hidden="true"
      >
        {/* window */}
        <rect x="8" y="8" width="304" height="204" rx="12" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        {/* title bar */}
        <line x1="8" y1="36" x2="312" y2="36" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
        <circle cx="24" cy="22" r="4" fill="rgba(255,255,255,0.45)" />
        <rect x="38" y="17" width="70" height="10" rx="5" fill="rgba(255,255,255,0.3)" />
        {/* sidebar */}
        <line x1="76" y1="36" x2="76" y2="212" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <rect x="20" y="50" width="44" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
        <rect x="20" y="68" width="36" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="20" y="86" width="40" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        {/* stat tiles */}
        <rect x="92" y="52" width="62" height="40" rx="6" fill="rgba(255,255,255,0.14)" />
        <rect x="162" y="52" width="62" height="40" rx="6" fill="rgba(255,255,255,0.14)" />
        <rect x="232" y="52" width="62" height="40" rx="6" fill="rgba(255,255,255,0.14)" />
        {/* chart card */}
        <rect x="92" y="104" width="202" height="92" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <polyline
          points="104,178 132,150 158,162 186,132 214,144 244,118 280,126"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <circle cx="186" cy="132" r="4" fill="#fff" />
      </svg>

      {/* wordmark */}
      <div className="relative p-5 sm:p-6">
        <p
          className={`${large ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'} font-black leading-none text-white`}
          style={{ ...montserrat, textShadow: '2px 2px 0 #000' }}
        >
          {product}
        </p>
        <p className="mt-1.5 text-[11px] font-medium text-white/75" style={inter}>
          {company}
        </p>
      </div>
    </div>
  )
}
