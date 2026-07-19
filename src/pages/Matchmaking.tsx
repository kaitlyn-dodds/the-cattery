import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import CatCard from '../components/cats/CatCard'
import BreedingWorkspace from '../components/matchmaking/BreedingWorkspace'
import type { Cat, LitterPrediction } from '../types'
import { predictLitter } from '../utils/breedingUtils'

const queens: Cat[] = [
  {
    id: 'luna',
    name: 'Luna',
    breed: 'Maine Coon',
    sex: 'female',
    birthDate: -780,
    intact: true,
    conformation: 4,
    energy: 3,
    coatLength: 'long',
    coatColor: 'Brown Tabby',
    eyeColor: 'Gold',
    genotype: {},
    traits: [
      '12e04762-444b-4931-9511-8bef09036e0e', // gentle
      '542916ab-cbe6-4130-85d8-2a21f8900843', // affectionate
      '20a7a7d9-13d2-43d1-9991-71d1576edcab', // curious
    ],
    health: 92,
    pregnancy: null,
  },
  {
    id: 'sable',
    name: 'Sable',
    breed: 'Bengal',
    sex: 'female',
    birthDate: -240,
    intact: true,
    conformation: 2,
    energy: 5,
    coatLength: 'short',
    coatColor: 'Brown Spotted Tabby',
    eyeColor: 'Green',
    genotype: {},
    traits: [
      'f564b348-5fdb-4f69-90f7-744c98c8b642', // bold
      '68397737-5c18-437c-8c98-ecce84d1236c', // playful
      '0ee72b1f-ac80-4b1f-921b-40bc2c509f5f', // vocal
    ],
    health: 100,
    pregnancy: null,
  },
  {
    id: 'duchess',
    name: 'Duchess',
    breed: 'Abyssinian',
    sex: 'female',
    birthDate: -420,
    intact: true,
    conformation: 5,
    energy: 4,
    coatLength: 'short',
    coatColor: 'Ruddy',
    eyeColor: 'Amber',
    genotype: {},
    traits: [
      '93ee6df6-0bfb-4075-a474-cc04e062f73a', // athletic
      'ff43763e-54a6-4d77-8e75-289d4ca47749', // inquisitive
      '47ce00ce-7430-4fae-bf17-178f7312a4ae', // loyal
    ],
    health: 85,
    pregnancy: null,
  },
]

const studs: Cat[] = [
  {
    id: 'atlas',
    name: 'Atlas',
    breed: 'Maine Coon',
    sex: 'male',
    birthDate: -1080,
    intact: true,
    conformation: 5,
    energy: 2,
    coatLength: 'long',
    coatColor: 'Silver Tabby',
    eyeColor: 'Copper',
    genotype: {},
    traits: [
      '50d72bac-0a72-465f-84d1-19280ede0d1b', // calm
      '12e04762-444b-4931-9511-8bef09036e0e', // gentle
      'a555abc9-aea3-4122-9896-45c31ccde0fc', // sociable
    ],
    health: 78,
    pregnancy: null,
  },
  {
    id: 'onyx',
    name: 'Onyx',
    breed: 'Bengal',
    sex: 'male',
    birthDate: -660,
    intact: true,
    conformation: 3,
    energy: 5,
    coatLength: 'short',
    coatColor: 'Black Silver Spotted',
    eyeColor: 'Hazel',
    genotype: {},
    traits: [
      '305ccfa3-c357-4c78-a282-b6f7f3aa69f1', // energetic
      'f564b348-5fdb-4f69-90f7-744c98c8b642', // bold
      'd2e3260e-aab3-4808-92c5-7da63fff5dc7', // mischievous
    ],
    health: 95,
    pregnancy: null,
  },
]

export default function Matchmaking() {
  const [selectedQueen, setSelectedQueen] = useState<Cat | null>(null)
  const [selectedStud, setSelectedStud] = useState<Cat | null>(null)
  const [predictions, setPredictions] = useState<LitterPrediction[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event
    if (!over) return

    const cat = active.data.current as Cat

    if (over.id === 'queen-slot' && cat.sex === 'female') {
      const newQueen = cat
      setSelectedQueen(newQueen)
      if (selectedStud) setPredictions(predictLitter(newQueen, selectedStud))
    } else if (over.id === 'stud-slot' && cat.sex === 'male') {
      const newStud = cat
      setSelectedStud(newStud)
      if (selectedQueen) setPredictions(predictLitter(selectedQueen, newStud))
    }
  }

  function handleClearQueen() {
    setSelectedQueen(null)
    setPredictions([])
  }

  function handleClearStud() {
    setSelectedStud(null)
    setPredictions([])
  }

  function handleBreed() {
    console.log(`Bred ${selectedQueen?.name} with ${selectedStud?.name}`)
    setSelectedQueen(null)
    setSelectedStud(null)
    setPredictions([])
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full">

        {/* Queens */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-steel-blue">Queens</h2>
          {queens.filter(q => q.id !== selectedQueen?.id).map((cat) => (
            <CatCard key={cat.id} {...cat} />
          ))}
        </div>

        {/* Center — breeding workspace */}
        <div className="flex-1">
          <BreedingWorkspace
            queen={selectedQueen}
            stud={selectedStud}
            onClearQueen={handleClearQueen}
            onClearStud={handleClearStud}
            predictions={predictions}
            onBreed={handleBreed}
          />
        </div>

        {/* Studs */}
        <div className="w-80 shrink-0 flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-steel-blue">Studs</h2>
          {studs.filter(s => s.id !== selectedStud?.id).map((cat) => (
            <CatCard key={cat.id} {...cat} />
          ))}
        </div>

      </div>
    </DndContext>
  )
}
