export interface LitterPrediction {
  id: string
  probability: number                       // 0–1
  coatColor: string
  coatLength: 'short' | 'medium' | 'long'
  eyeColor: string
  genotype: Record<string, string>          // placeholder until genetics engine
}
