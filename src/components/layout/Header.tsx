import GameTitle from './GameTitle'
import GameClock from './GameClock'
import SpeedControls from './SpeedControls'
import PlayerFunds from './PlayerFunds'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-deep-space shadow-md">
      <div className="max-w-screen-2xl mx-auto px-4 h-20 flex items-center justify-between">
        <GameTitle />
        <div className="flex items-center gap-6">
          <GameClock />
          <SpeedControls />
          <PlayerFunds />
        </div>
      </div>
    </header>
  )
}
