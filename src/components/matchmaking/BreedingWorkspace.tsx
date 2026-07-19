import { useDroppable } from '@dnd-kit/core'
import type { Cat, LitterPrediction } from '../../types'
import { getAgeInMonths, formatAge } from '../../utils/gameTime'
import KittenPredictionCard from './KittenPredictionCard'

interface DropSlotProps {
  role: 'queen' | 'stud'
  cat: Cat | null
  onClear: () => void
}

function DropSlot({ role, cat, onClear }: DropSlotProps) {
  const isQueen = role === 'queen'
  const { setNodeRef, isOver } = useDroppable({ id: `${role}-slot` })

  return (
    <div className="flex flex-col gap-1.5 w-80">
      <span className={`text-xs uppercase tracking-widest ${isQueen ? 'text-strawberry/70' : 'text-frosted-blue/70'}`}>
        {isQueen ? 'Queen' : 'Stud'}
      </span>

      <div
        ref={setNodeRef}
        className={`rounded-lg border-2 transition-colors ${
          cat
            ? isQueen ? 'border-strawberry bg-deep-space' : 'border-frosted-blue bg-deep-space'
            : isOver
              ? isQueen ? 'border-strawberry bg-strawberry/10' : 'border-frosted-blue bg-frosted-blue/10'
              : isQueen ? 'border-dashed border-strawberry/30' : 'border-dashed border-frosted-blue/30'
        }`}
      >
        {cat ? (
          <div className="flex items-center gap-4 px-4 py-3 relative">
            <button
              onClick={onClear}
              className="absolute top-2 right-2 text-steel-blue/40 hover:text-honeydew text-xs leading-none"
            >
              ✕
            </button>
            <span className="text-4xl leading-none">🐱</span>
            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="font-semibold text-honeydew">{cat.name}</span>
              <span className="text-sm italic text-frosted-blue">{cat.breed}</span>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0 pr-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`text-sm ${i < cat.conformation ? 'text-strawberry' : 'text-steel-blue/40'}`}>★</span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-frosted-blue">{formatAge(getAgeInMonths(cat.birthDate))}</span>
                <span className={`text-lg leading-none font-bold ${isQueen ? 'text-strawberry' : 'text-frosted-blue'}`}>
                  {isQueen ? '♀' : '♂'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 px-4 py-3 min-h-[74px]">
            <span className="text-2xl opacity-20">🐱</span>
            <span className="text-xs text-steel-blue/40">drag cat here</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface BreedingWorkspaceProps {
  queen: Cat | null
  stud: Cat | null
  onClearQueen: () => void
  onClearStud: () => void
  predictions: LitterPrediction[]
  onBreed: () => void
}

export default function BreedingWorkspace({ queen, stud, onClearQueen, onClearStud, predictions, onBreed }: BreedingWorkspaceProps) {
  return (
    <div className="flex flex-col items-center pt-8">

      <div className="w-[672px]">
        <div className="flex gap-8">
          <DropSlot role="queen" cat={queen} onClear={onClearQueen} />
          <DropSlot role="stud" cat={stud} onClear={onClearStud} />
        </div>

        <div className="flex h-8 mt-1.5">
          <div className="flex-1 border-r-2 border-b-2 border-steel-blue/25 rounded-br-lg" />
          <div className="flex-1 border-l-2 border-b-2 border-steel-blue/25 rounded-bl-lg" />
        </div>
      </div>

      <div className="w-0.5 h-4 bg-steel-blue/25" />

      {predictions.length > 0 ? (
        <div className="w-[672px] flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-steel-blue">
            Potential Litter — {queen!.name} × {stud!.name}
          </span>
          <div className="grid grid-cols-2 gap-2">
            {predictions.map((p) => (
              <KittenPredictionCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[672px] rounded-lg border border-dashed border-steel-blue/25 px-4 py-8 flex flex-col items-center gap-2">
          <span className="text-2xl opacity-20">🐾</span>
          <span className="text-sm text-steel-blue/40 text-center">
            Pair a queen and stud to preview the potential litter
          </span>
        </div>
      )}

      <div className="w-[672px] mt-4">
        <button
          onClick={onBreed}
          disabled={!queen || !stud}
          className="w-full py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors
            bg-strawberry text-honeydew
            hover:bg-strawberry/80
            disabled:bg-steel-blue/20 disabled:text-steel-blue/40 disabled:cursor-not-allowed"
        >
          Breed Pair
        </button>
      </div>

    </div>
  )
}
