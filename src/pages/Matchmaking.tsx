import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import CatCard from '../components/cats/CatCard'
import BreedingWorkspace from '../components/matchmaking/BreedingWorkspace'
import type { Cat } from '../types/cat'

const queens: Cat[] = [
  { name: 'Luna', breed: 'Maine Coon', sex: 'female', ageMonths: 26, rating: 4 },
  { name: 'Sable', breed: 'Bengal', sex: 'female', ageMonths: 8, rating: 2 },
  { name: 'Duchess', breed: 'Abyssinian', sex: 'female', ageMonths: 14, rating: 5 },
]

const studs: Cat[] = [
  { name: 'Atlas', breed: 'Maine Coon', sex: 'male', ageMonths: 36, rating: 5 },
  { name: 'Onyx', breed: 'Bengal', sex: 'male', ageMonths: 22, rating: 3 },
]

export default function Matchmaking() {
  const [selectedQueen, setSelectedQueen] = useState<Cat | null>(null)
  const [selectedStud, setSelectedStud] = useState<Cat | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event
    if (!over) return

    const cat = active.data.current as Cat

    if (over.id === 'queen-slot' && cat.sex === 'female') {
      setSelectedQueen(cat)
    } else if (over.id === 'stud-slot' && cat.sex === 'male') {
      setSelectedStud(cat)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full">

        {/* Queens */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-steel-blue">Queens</h2>
          {queens.filter(q => q.name !== selectedQueen?.name).map((cat) => (
            <CatCard key={cat.name} {...cat} />
          ))}
        </div>

        {/* Center — breeding workspace */}
        <div className="flex-1">
          <BreedingWorkspace
            queen={selectedQueen}
            stud={selectedStud}
            onClearQueen={() => setSelectedQueen(null)}
            onClearStud={() => setSelectedStud(null)}
          />
        </div>

        {/* Studs */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-steel-blue">Studs</h2>
          {studs.filter(s => s.name !== selectedStud?.name).map((cat) => (
            <CatCard key={cat.name} {...cat} />
          ))}
        </div>

      </div>
    </DndContext>
  )
}
