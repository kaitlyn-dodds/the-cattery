import type { Trait } from '../types'

// Stable UUIDs — never change these once traits are in use
const ID = {
  calm:         '50d72bac-0a72-465f-84d1-19280ede0d1b',
  hyper:        '45e6bcea-d51c-47ed-94c6-ff1ec3573e56',
  energetic:    '305ccfa3-c357-4c78-a282-b6f7f3aa69f1',
  lethargic:    '9e77794b-575c-4b65-8b77-fa3dff7f71d3',
  athletic:     '93ee6df6-0bfb-4075-a474-cc04e062f73a',
  gentle:       '12e04762-444b-4931-9511-8bef09036e0e',
  aggressive:   '3ff114d7-c9ec-43c6-965f-ebc968786e46',
  affectionate: '542916ab-cbe6-4130-85d8-2a21f8900843',
  aloof:        '5f9ef576-12ab-417e-8fe0-519f03f0a469',
  sociable:     'a555abc9-aea3-4122-9896-45c31ccde0fc',
  shy:          '8960b6d3-f3d4-4796-93da-f1b554ea233f',
  bold:         'f564b348-5fdb-4f69-90f7-744c98c8b642',
  timid:        '510bc6d1-b23f-4aef-b502-873347f5753e',
  curious:      '20a7a7d9-13d2-43d1-9991-71d1576edcab',
  playful:      '68397737-5c18-437c-8c98-ecce84d1236c',
  loyal:        '47ce00ce-7430-4fae-bf17-178f7312a4ae',
  vocal:        '0ee72b1f-ac80-4b1f-921b-40bc2c509f5f',
  quiet:        '76e3a9c1-0d08-4d58-8cb6-e52d777831b3',
  mischievous:  'd2e3260e-aab3-4808-92c5-7da63fff5dc7',
  inquisitive:  'ff43763e-54a6-4d77-8e75-289d4ca47749',
} as const

export const TRAITS: Trait[] = [
  // Energy / Activity
  {
    id: ID.calm,
    name: 'Calm',
    description: 'Rarely rattled, content to observe rather than act.',
    conflictsWith: [ID.hyper, ID.energetic],
  },
  {
    id: ID.hyper,
    name: 'Hyper',
    description: 'Constantly in motion, always looking for the next thing to chase.',
    conflictsWith: [ID.calm, ID.lethargic],
  },
  {
    id: ID.energetic,
    name: 'Energetic',
    description: 'High stamina and a zest for activity throughout the day.',
    conflictsWith: [ID.calm, ID.lethargic],
  },
  {
    id: ID.lethargic,
    name: 'Lethargic',
    description: 'Prefers long naps and minimal exertion.',
    conflictsWith: [ID.hyper, ID.energetic, ID.athletic],
  },
  {
    id: ID.athletic,
    name: 'Athletic',
    description: 'Agile, strong, and built for movement.',
    conflictsWith: [ID.lethargic],
  },

  // Temperament
  {
    id: ID.gentle,
    name: 'Gentle',
    description: 'Soft in manner, careful with people and other animals.',
    conflictsWith: [ID.aggressive],
  },
  {
    id: ID.aggressive,
    name: 'Aggressive',
    description: 'Quick to assert dominance; not suited for all households.',
    conflictsWith: [ID.gentle, ID.timid],
  },
  {
    id: ID.affectionate,
    name: 'Affectionate',
    description: 'Craves closeness and physical contact with its people.',
    conflictsWith: [ID.aloof],
  },
  {
    id: ID.aloof,
    name: 'Aloof',
    description: 'Independent and self-sufficient; bonds on its own terms.',
    conflictsWith: [ID.affectionate, ID.sociable, ID.loyal],
  },
  {
    id: ID.sociable,
    name: 'Sociable',
    description: 'Thrives around people and other animals.',
    conflictsWith: [ID.aloof, ID.shy],
  },
  {
    id: ID.shy,
    name: 'Shy',
    description: 'Slow to warm up; needs patience and a quiet environment.',
    conflictsWith: [ID.sociable, ID.bold],
  },
  {
    id: ID.bold,
    name: 'Bold',
    description: 'Confident and unafraid of new situations or strangers.',
    conflictsWith: [ID.shy, ID.timid],
  },
  {
    id: ID.timid,
    name: 'Timid',
    description: 'Easily startled; prefers predictable, low-stress settings.',
    conflictsWith: [ID.bold, ID.aggressive],
  },

  // Personality
  {
    id: ID.curious,
    name: 'Curious',
    description: 'Investigates everything; no drawer or box goes unexplored.',
    conflictsWith: [],
  },
  {
    id: ID.playful,
    name: 'Playful',
    description: 'Never misses an opportunity for a game.',
    conflictsWith: [],
  },
  {
    id: ID.loyal,
    name: 'Loyal',
    description: 'Forms deep bonds with its family and follows them closely.',
    conflictsWith: [ID.aloof],
  },
  {
    id: ID.vocal,
    name: 'Vocal',
    description: 'Has a lot to say and is not shy about saying it.',
    conflictsWith: [ID.quiet],
  },
  {
    id: ID.quiet,
    name: 'Quiet',
    description: 'Communicates sparingly; a calm, undemanding presence.',
    conflictsWith: [ID.vocal],
  },
  {
    id: ID.mischievous,
    name: 'Mischievous',
    description: "Clever and opportunistic; often found where it shouldn't be.",
    conflictsWith: [],
  },
  {
    id: ID.inquisitive,
    name: 'Inquisitive',
    description: 'Deeply observant; studies its environment before acting.',
    conflictsWith: [],
  },
]

const traitMap = new Map(TRAITS.map(t => [t.id, t]))

export function getTraitById(id: string): Trait | undefined {
  return traitMap.get(id)
}
