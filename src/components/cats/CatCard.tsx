import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import type { Cat } from '../../types'
import { getAgeInMonths, formatAge } from '../../utils/gameTime'
import { getTraitById } from '../../data/traits'

export default function CatCard(cat: Cat) {
  const { id, name, breed, sex, birthDate, conformation, energy, health, coatLength, coatColor, eyeColor, traits, genotype } = cat
  const [expanded, setExpanded] = useState(false)

  const ageMonths = getAgeInMonths(birthDate)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: cat,
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
              <span key={i} className={`text-sm ${i < conformation ? 'text-strawberry' : 'text-steel-blue/40'}`}>★</span>
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

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Quality</span>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-honeydew">Conformation</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-sm ${i < conformation ? 'text-frosted-blue' : 'text-steel-blue/30'}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm gap-3">
                <span className="text-honeydew shrink-0">Health</span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-1.5 rounded-full bg-steel-blue/20">
                    <div
                      className="h-full rounded-full bg-frosted-blue"
                      style={{ width: `${health}%` }}
                    />
                  </div>
                  <span className="text-frosted-blue text-xs shrink-0">{health}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Energy</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-sm ${i < energy ? 'text-frosted-blue' : 'text-steel-blue/30'}`}>★</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Appearance</span>
            <div className="flex flex-col gap-1">
              {[
                { label: 'Coat Color', value: coatColor },
                { label: 'Coat Length', value: coatLength.charAt(0).toUpperCase() + coatLength.slice(1) },
                { label: 'Eye Color', value: eyeColor },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-honeydew">{label}</span>
                  <span className="text-frosted-blue">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue shrink-0">Traits</span>
            {traits.map((id, i) => {
              const trait = getTraitById(id)
              return trait ? (
                <div key={id} className="flex items-center gap-2">
                  {i > 0 && <span className="text-steel-blue/40 text-xs">•</span>}
                  <div className="relative group">
                    <span className="text-sm text-frosted-blue cursor-default">{trait.name}</span>
                    <div className="absolute left-0 bottom-full mb-1.5 w-56 px-3 py-2 rounded-md bg-steel-blue text-xs text-honeydew leading-snug z-50 hidden group-hover:block shadow-lg">
                      {trait.description}
                    </div>
                  </div>
                </div>
              ) : null
            })}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">Genotype</span>
            <span className="text-sm font-mono text-frosted-blue/80 tracking-wide">
              {Object.entries(genotype).map(([k, v]) => `${k}/${v}`).join(' · ') || '—'}
            </span>
          </div>

        </div>
      )}
    </div>
  )
}
