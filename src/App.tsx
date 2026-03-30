import { useState, FormEvent } from "react"
import { Search, MapPin, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Gradient themes — will later map to real weather conditions
const gradients = [
  "from-violet-600 via-purple-600 to-blue-700",   // default / clear
  "from-slate-600 via-blue-700 to-slate-800",      // cloudy
  "from-blue-700 via-cyan-700 to-teal-800",        // rain
  "from-orange-500 via-rose-500 to-pink-600",      // hot / sunny
  "from-indigo-800 via-slate-800 to-gray-900",     // night
]

export default function App() {
  const [query, setQuery] = useState("")
  const [searchedCity, setSearchedCity] = useState<string | null>(null)
  const [gradientIndex, setGradientIndex] = useState(0)

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const city = query.trim()
    if (!city) return
    setSearchedCity(city)
    // Rotate gradient on each search (placeholder until real weather data)
    setGradientIndex((prev) => (prev + 1) % gradients.length)
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br transition-all duration-700",
        gradients[gradientIndex]
      )}
    >
      {/* Skip-to-content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-md focus:font-medium"
      >
        Hoppa till innehåll
      </a>

      {/* Header */}
      <header className="w-full px-4 py-6 sm:px-8" role="banner">
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          <Cloud
            className="h-8 w-8 text-white drop-shadow-lg"
            aria-hidden="true"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Annas väderapp
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main
        id="main-content"
        className="mx-auto max-w-3xl px-4 sm:px-8 pb-16"
      >
        {/* Search form */}
        <section aria-label="Stadssökning">
          <form
            onSubmit={handleSearch}
            className="flex gap-2 mt-2"
            role="search"
          >
            <label htmlFor="city-search" className="sr-only">
              Ange ett stadsnamn
            </label>
            <Input
              id="city-search"
              type="search"
              placeholder="Sök stad… t.ex. Stockholm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              aria-label="Ange ett stadsnamn"
              className="flex-1 text-base h-12"
            />
            <Button
              type="submit"
              size="lg"
              aria-label="Sök väder"
              className="h-12 px-5"
            >
              <Search className="h-5 w-5 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Sök</span>
            </Button>
          </form>
        </section>

        {/* Result */}
        {searchedCity && (
          <section
            aria-label="Sökresultat"
            aria-live="polite"
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                  <MapPin className="h-6 w-6 text-white/80" aria-hidden="true" />
                  {searchedCity}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm">
                  Väderdata för{" "}
                  <strong className="text-white">{searchedCity}</strong> hämtas
                  i nästa steg — sökning fungerar!
                </p>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  )
}
