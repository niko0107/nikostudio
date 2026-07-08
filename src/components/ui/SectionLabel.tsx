interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-caption font-medium text-accent tracking-[0.15em] ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
