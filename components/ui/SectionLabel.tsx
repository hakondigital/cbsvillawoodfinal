/**
 * SectionLabel
 * A small styled label/eyebrow text shown above section headings.
 * Appears with an accent bar to the left.
 */

import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean // Use light-on-dark version
  className?: string
}

export default function SectionLabel({ children, light = false, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 label-caps',
        light ? 'text-stone-mid' : 'text-text-muted',
        className
      )}
    >
      <span
        className="block flex-shrink-0 h-px w-8"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />
      {children}
    </div>
  )
}
