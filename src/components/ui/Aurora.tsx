'use client'

/**
 * Soft drifting aurora gradient blobs + film grain.
 * Pure CSS animations (transform only) — no JS on the hot path.
 */
export default function Aurora({
  variant = 'light',
  className,
}: {
  variant?: 'light' | 'dark'
  className?: string
}) {
  const blobs =
    variant === 'light'
      ? [
          {
            background:
              'radial-gradient(circle, rgba(102,217,212,0.18) 0%, rgba(102,217,212,0) 70%)',
            style: 'top-[-10%] left-[-5%] w-[55vw] h-[55vw]',
            animation: 'aurora-drift-1 22s ease-in-out infinite',
          },
          {
            background:
              'radial-gradient(circle, rgba(155,184,240,0.15) 0%, rgba(155,184,240,0) 70%)',
            style: 'top-[15%] right-[-10%] w-[50vw] h-[50vw]',
            animation: 'aurora-drift-2 28s ease-in-out infinite',
          },
          {
            background:
              'radial-gradient(circle, rgba(199,185,245,0.14) 0%, rgba(199,185,245,0) 70%)',
            style: 'bottom-[-15%] left-[20%] w-[60vw] h-[60vw]',
            animation: 'aurora-drift-3 26s ease-in-out infinite',
          },
        ]
      : [
          {
            background:
              'radial-gradient(circle, rgba(102,217,212,0.08) 0%, rgba(102,217,212,0) 70%)',
            style: 'top-[-10%] left-[-5%] w-[55vw] h-[55vw]',
            animation: 'aurora-drift-1 24s ease-in-out infinite',
          },
          {
            background:
              'radial-gradient(circle, rgba(120,140,220,0.07) 0%, rgba(120,140,220,0) 70%)',
            style: 'bottom-[-10%] right-[-10%] w-[55vw] h-[55vw]',
            animation: 'aurora-drift-2 30s ease-in-out infinite',
          },
        ]

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ''}`}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${b.style}`}
          style={{
            background: b.background,
            animation: b.animation,
            willChange: 'transform',
          }}
        />
      ))}
      <div className="noise-overlay" />
    </div>
  )
}
