import type { Cat, LitterPrediction } from '../types'

// placeholder — genetics engine will replace this entirely
export function predictLitter(_queen: Cat, _stud: Cat): LitterPrediction[] {
  return [
    {
      id: 'pred-1',
      probability: 0.375,
      coatColor: 'Brown Tabby',
      coatLength: 'long',
      eyeColor: 'Gold',
      genotype: {},
    },
    {
      id: 'pred-2',
      probability: 0.375,
      coatColor: 'Silver Tabby',
      coatLength: 'long',
      eyeColor: 'Copper',
      genotype: {},
    },
    {
      id: 'pred-3',
      probability: 0.125,
      coatColor: 'Brown Tabby',
      coatLength: 'short',
      eyeColor: 'Gold',
      genotype: {},
    },
    {
      id: 'pred-4',
      probability: 0.125,
      coatColor: 'Silver Tabby',
      coatLength: 'short',
      eyeColor: 'Copper',
      genotype: {},
    },
  ]
}
