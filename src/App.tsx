import { useState, FormEvent } from "react"
import { Search, MapPin, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { fetchCurrentWeather, fetchForecast, CurrentWeather, ForecastDay } from "@/lib/weather"
import { getGradient } from "@/lib/weatherUtils"
import { WeatherCard } from "@/components/WeatherCard"
import { ForecastCard } from "@/components/ForecastCard"

type Status = "idle" | "loading" | "success" | "error"

export default function App() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [gradient, setGradient] = useState("from-violet-600 via-purple-600 to-blue-700")

  async function handleSearch(e: FormEvent) {
    e.preventDefault()
    const city = query.trim()
    if (!city) return

    setStatus("loading")
    setErrorMsg("")
    setWeather(null)
    setForecast([])

    try {
      const { geo, weather: currentWeather } = await fetchCurrentWeather(city)
      const forecastData = await fetchForecast(geo.lat, geo.lon)

      setWeather(currentWeather)
      setForecast(forecastData)
      setGradient(getGradient(currentWeather.condition, currentWeather.icon))
      setStatus("success")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Något gick fel")
      setStatus("error")
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br transition-all duration-700",
        gradient
      )}
    >
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-md focus:font-medium"
      >
        Hoppa till innehåll
      </a>

      {/* Header */}
      <header className="w-full px-4 py-6 sm:px-8" role="banner">
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          <Cloud className="h-8 w-8 text-white drop-shadow-lg" aria-hidden="true" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Annas väderapp
          </h1>
        </div>
      </header>

      {/* Main */}
      <main id="main-content" className="mx-auto max-w-3xl px-4 sm:px-8 pb-16">
        <section aria-label="Stadssökning">
          <form onSubmit={handleSearch} className="flex gap-2 mt-2" role="search">
            <label htmlFor="city-search" className="sr-only">Ange ett stadsnamn</label>
            <Input
              id="city-search"
              type="search"
              placeholder="Sök stad… t.ex. Stockholm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              aria-label="Ange ett stadsnamn"
              disabled={status === "loading"}
              className="flex-1 text-base h-12"
            />
            <Button
              type="submit"
              size="lg"
              aria-label="Sök väder"
              disabled={status === "loading"}
              className="h-12 px-5"
            >
              <Search className="h-5 w-5 mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">
                {status === "loading" ? "Hämtar…" : "Sök"}
              </span>
            </Button>
          </form>
        </section>

        {/* Error */}
        {status === "error" && (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-6 rounded-xl border border-red-400/40 bg-red-500/20 backdrop-blur-sm px-4 py-3 text-white flex items-center gap-2"
          >
            <MapPin className="h-5 w-5 shrink-0 text-red-300" aria-hidden="true" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Results */}
        {status === "success" && weather && (
          <section aria-label="Väderresultat" aria-live="polite">
            <WeatherCard weather={weather} />
            {forecast.length > 0 && <ForecastCard forecast={forecast} />}
          </section>
        )}
      </main>
    </div>
  )
}
