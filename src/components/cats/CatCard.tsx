interface CatCardProps {
  name: string
  breed: string
  sex: 'male' | 'female'
  ageMonths: number
  rating: number
}

function formatAge(months: number): string {
  if (months < 12) return `${months} mo`
  const years = Math.floor(months / 12)
  return `${years} ${years === 1 ? 'yr' : 'yrs'}`
}

export default function CatCard({ name, breed, sex, ageMonths, rating }: CatCardProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-lg border border-strawberry bg-deep-space">
      <span className="text-4xl leading-none">🐱</span>

      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-honeydew">{name}</span>
          <span className="text-sm italic text-frosted-blue">{breed}</span>
        </div>

      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-sm ${i < rating ? 'text-strawberry' : 'text-steel-blue/40'}`}>★</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-frosted-blue">{formatAge(ageMonths)}</span>
          <span className={`text-lg leading-none font-bold ${sex === 'female' ? 'text-strawberry' : 'text-frosted-blue'}`}>
            {sex === 'female' ? '♀' : '♂'}
          </span>
        </div>
      </div>
    </div>
  )
}
