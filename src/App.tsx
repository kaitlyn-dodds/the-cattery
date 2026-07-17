import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-6">
      </main>
      <Footer />
    </div>
  )
}

export default App
