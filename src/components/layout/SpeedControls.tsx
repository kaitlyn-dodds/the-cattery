export default function SpeedControls() {
  const speeds = ['⏸', '1×', '2×', '3×']

  return (
    <div className="flex items-center gap-1">
      {speeds.map((label, i) => (
        <button
          key={label}
          className={`px-2.5 py-1 text-xs rounded transition-colors ${
            i === 1
              ? 'bg-strawberry text-honeydew'
              : 'bg-steel-blue text-honeydew hover:bg-frosted-blue hover:text-deep-space'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
