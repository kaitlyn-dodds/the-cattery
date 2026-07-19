import type { Pregnancy } from './pregnancy'

export interface Cat {
  id: string
  name: string            // player-changeable
  breed: string           // fixed at birth
  sex: 'male' | 'female'
  birthDate: number       // game day — age derived from current game day
  intact: boolean

  // Fixed at birth (genetics)
  conformation: number                        // 1–5
  energy: number                              // 1–5
  coatLength: 'short' | 'medium' | 'long'
  coatColor: string
  eyeColor: string
  genotype: Record<string, string>            // placeholder until genetics engine
  traits: string[]                            // 3 trait names referencing Trait catalog

  // Dynamic
  health: number                              // 0–100
  pregnancy: Pregnancy | null                 // female only; null when not pregnant
}
