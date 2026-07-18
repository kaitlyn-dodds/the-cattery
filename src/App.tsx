import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import CatCard from './components/cats/CatCard'

const sampleCats = [
  { name: 'Luna', breed: 'Maine Coon', sex: 'female' as const, ageMonths: 26, rating: 4 },
  { name: 'Sable', breed: 'Bengal', sex: 'female' as const, ageMonths: 8, rating: 2 },
  { name: 'Duchess', breed: 'Abyssinian', sex: 'female' as const, ageMonths: 14, rating: 5 },
]

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-deep-space">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col gap-3 max-w-sm">
          {sampleCats.map((cat) => (
            <CatCard key={cat.name} {...cat} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
