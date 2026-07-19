export interface Trait {
  id: string
  name: string
  description: string
  conflictsWith: string[]  // array of trait IDs
}
