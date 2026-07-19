export const GAME_DAYS_PER_MONTH = 30
export const CURRENT_GAME_DAY = 0 // placeholder until time system is implemented

export function getAgeInMonths(birthDate: number, currentDay: number = CURRENT_GAME_DAY): number {
  return Math.floor((currentDay - birthDate) / GAME_DAYS_PER_MONTH)
}

export function formatAge(ageMonths: number): string {
  if (ageMonths < 12) return `${ageMonths} mo`
  const years = Math.floor(ageMonths / 12)
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`
}
