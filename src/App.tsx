import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Matchmaking from './pages/Matchmaking'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-deep-space">
      <Header />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 py-6">
        <Matchmaking />
      </main>
      <Footer />
    </div>
  )
}

export default App
