export default function SpeedControls() {
  const speeds = ['⏸', '1×', '2×', '3×']

  return (
    <div className="flex items-center gap-1">
      {speeds.map((label) => (
        <button
          key={label}
          className="px-2.5 py-1 text-xs rounded bg-stone-700 text-stone-200 hover:bg-stone-600 transition-colors"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
