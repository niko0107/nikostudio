import Image from 'next/image'

const projects = [
  {
    num: '01',
    category: 'Hair Salon',
    name: 'Bloom Hair Salon',
    href: '/works/bloom',
    images: ['/bloom-wash.jpg', '/bloom-reception.jpg', '/bloom-styling.jpg'],
    positions: ['object-center', 'object-left', 'object-center'],
  },
  {
    num: '02',
    category: 'Italian Restaurant',
    name: 'Trattoria Sole',
    href: '/works/trattoria',
    images: ['/trattoria-carbonara.jpg', '/trattoria-kitchen.jpg', '/trattoria-dining.jpg'],
    positions: ['object-center', 'object-center', 'object-center'],
  },
]

function ImagePanel({
  src,
  alt,
  position,
  sizes,
  className,
}: {
  src: string
  alt: string
  position?: string
  sizes: string
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[16px] sm:rounded-[22px] md:rounded-[26px] ${className ?? ''}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${position ?? ''} transition-transform duration-700 ease-out group-hover:scale-[1.06]`}
      />
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div
      className="relative rounded-[28px] sm:rounded-[32px] md:rounded-[40px] border border-ink/10 bg-white p-4 sm:p-6 md:p-8"
      style={{ boxShadow: '0 16px 56px rgba(24,50,50,0.10)' }}
    >
      {/* Top row */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Number */}
          <span
            className="font-display font-bold leading-none text-ink/15 shrink-0"
            style={{ fontSize: 'clamp(2rem, 5vw, 60px)' }}
          >
            {project.num}
          </span>

          {/* Title block */}
          <div className="flex flex-col flex-1 px-2 sm:px-4 min-w-0">
            <span className="text-muted text-caption uppercase tracking-widest whitespace-nowrap">
              {project.category}
            </span>
            <span
              className="text-ink font-display font-medium whitespace-nowrap"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
            >
              {project.name}
            </span>
          </div>

          {/* Live button — desktop only */}
          <a
            href={project.href}
            className="hidden sm:block shrink-0 rounded-full border border-ink/20 text-ink font-medium uppercase tracking-widest px-7 py-2.5 text-sm transition-colors duration-300 hover:bg-ink/5"
          >
            Live Project
          </a>
        </div>

        {/* Live button — mobile only */}
        <a
          href={project.href}
          className="sm:hidden mt-3 block text-center rounded-full border border-ink/20 text-ink font-medium uppercase tracking-widest px-5 py-2 text-xs transition-colors duration-300 hover:bg-ink/5"
        >
          Live Project
        </a>
      </div>

      {/* Image grid — mobile: landscape stack / sm+: 2-col editorial grid */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Main image — first on mobile (wide), right column on desktop (tall) */}
        <div className="order-1 sm:order-2 sm:flex-1">
          <ImagePanel
            src={project.images[2]}
            alt={project.name}
            position={project.positions[2]}
            sizes="(max-width: 640px) 92vw, (max-width: 896px) 55vw, 500px"
            className="aspect-[16/9] sm:aspect-auto sm:h-[clamp(260px,30vw,440px)]"
          />
        </div>

        {/* Sub images — side-by-side landscape on mobile, stacked column on desktop */}
        <div className="order-2 sm:order-1 flex flex-row sm:flex-col gap-3 sm:gap-4 sm:w-[40%]">
          <ImagePanel
            src={project.images[0]}
            alt={project.name}
            position={project.positions[0]}
            sizes="(max-width: 640px) 46vw, (max-width: 896px) 40vw, 340px"
            className="w-1/2 sm:w-auto aspect-[16/9] sm:aspect-auto sm:h-[clamp(110px,12vw,170px)]"
          />
          <ImagePanel
            src={project.images[1]}
            alt={project.name}
            position={project.positions[1]}
            sizes="(max-width: 640px) 46vw, (max-width: 896px) 40vw, 340px"
            className="w-1/2 sm:w-auto aspect-[16/9] sm:aspect-auto sm:h-[clamp(140px,17vw,250px)]"
          />
        </div>
      </div>
    </div>
  )
}

export default function Works() {
  return (
    <section
      id="works"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-28 md:pb-36"
      style={{ backgroundColor: '#D9EDF7' }}
    >
      <h2
        className="hero-heading font-display font-bold uppercase text-center mb-12 sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(2.25rem, 6.5vw, 80px)' }}
      >
        Projects
      </h2>

      <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-12 md:gap-16">
        {projects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </div>
    </section>
  )
}
