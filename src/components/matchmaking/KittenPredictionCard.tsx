import type { LitterPrediction } from '../../types'

function formatProbability(p: number): string {
  const pct = p * 100
  return Number.isInteger(pct) ? `${pct}%` : `${pct.toFixed(1)}%`
}

export default function KittenPredictionCard({ probability, coatColor, coatLength, eyeColor }: LitterPrediction) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-steel-blue/40 bg-deep-space">
      <span className="text-2xl leading-none opacity-60">🐱</span>

      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-medium text-honeydew">{coatColor}</span>
        <span className="text-xs text-frosted-blue/70">
          {coatLength.charAt(0).toUpperCase() + coatLength.slice(1)} coat · {eyeColor} eyes
        </span>
      </div>

      <span className="text-sm font-semibold text-frosted-blue shrink-0">
        {formatProbability(probability)}
      </span>
    </div>
  )
}
