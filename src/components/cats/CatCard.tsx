import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import type { Cat } from '../../types/cat'

function formatAge(months: number): string {
  if (months < 12) return `${months} mo`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`
}

export default function CatCard({ name, breed, sex, ageMonths, rating }: Cat) {
  const [expanded, setExpanded] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: name,
    data: { name, breed, sex, ageMonths, rating } satisfies Cat,
  })

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 50 }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg border border-strawberry bg-deep-space overflow-hidden transition-opacity ${isDragging ? 'opacity-40' : 'opacity-100'}`}
    >
      {/* Always-visible top row — drag handle + expand toggle */}
      <div
        {...listeners}
        {...attributes}
        className="flex items-center gap-4 px-4 py-3 cursor-grab active:cursor-grabbing select-none hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-4xl leading-none">🐱</span>

        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          <span className="font-semibold text-honeydew">{name}</span>
          <span className="text-sm italic text-frosted-blue">{breed}</span>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-sm ${i < rating ? 'text-strawberry' : 'text-steel-blue/40'}`}>★</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-frosted-blue">{formatAge(ageMonths)}</span>
            <span className={`text-lg leading-none font-bold ${sex === 'female' ? 'text-strawberry' : 'text-frosted-blue'}`}>
              {sex === 'female' ? '♀' : '♂'}
            </span>
          </div>
        </div>

        <span className={`text-frosted-blue/50 text-xs transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {/* Expandable detail section */}
      {expanded && (
        <div className="border-t border-steel-blue/40 px-4 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Description</span>
            <p className="text-sm text-frosted-blue/80">
              A placeholder description for this cat. Personality, appearance, and notable characteristics will appear here.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Traits</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {[
                { label: 'Energy', value: 'High' },
                { label: 'Temperament', value: 'Gentle' },
                { label: 'Activity', value: 'Indoor / Outdoor' },
                { label: 'Coat', value: 'Long' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-steel-blue">{label}</span>
                  <span className="text-honeydew">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Genotype</span>
            <span className="text-sm font-mono text-frosted-blue/80 tracking-wide">B/b · Mc/Mc · Ta/ta · ww</span>
          </div>
        </div>
      )}
    </div>
  )
}
