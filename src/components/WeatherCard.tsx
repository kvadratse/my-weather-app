import { CurrentWeather } from "@/lib/weather"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Wind, Thermometer } from "lucide-react"
import { TempUnit, convertTemp } from "@/hooks/useUnit"

interface Props {
  weather: CurrentWeather
  unit: TempUnit
  onToggleUnit: () => void
}

export function WeatherCard({ weather, unit, onToggleUnit }: Props) {
  const temp = convertTemp(weather.temp, unit)
  const feelsLike = convertTemp(weather.feelsLike, unit)

  return (
    <Card className="mt-6" aria-label={`Aktuellt väder för ${weather.city}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="text-3xl sm:text-4xl">
              {weather.city}, {weather.country}
            </CardTitle>
            <p className="text-white/70 mt-1 capitalize">{weather.description}</p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16 -mt-2 drop-shadow-lg"
            width={64}
            height={64}
          />
        </div>
      </CardHeader>
      <CardContent>
        {/* Big temperature + unit toggle */}
        <div className="flex items-end gap-3 mb-6">
          <span
            className="text-6xl sm:text-7xl font-extrabold text-white leading-none"
            aria-label={`${temp} grader ${unit === "C" ? "Celsius" : "Fahrenheit"}`}
          >
            {temp}°
          </span>

          {/* C / F toggle */}
          <button
            onClick={onToggleUnit}
            aria-label={`Byt till ${unit === "C" ? "Fahrenheit" : "Celsius"}`}
            aria-pressed={unit === "F"}
            className="mb-2 flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-sm font-semibold text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 overflow-hidden"
          >
            <span className={`px-2.5 py-1 transition-colors ${unit === "C" ? "bg-white/25" : "text-white/50"}`}>°C</span>
            <span className={`px-2.5 py-1 transition-colors ${unit === "F" ? "bg-white/25" : "text-white/50"}`}>°F</span>
          </button>

          <span className="text-white/50 text-sm mb-3">Känns som {feelsLike}°</span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Stat icon={<Droplets className="h-4 w-4" />} label="Luftfuktighet" value={`${weather.humidity}%`} />
          <Stat icon={<Wind className="h-4 w-4" />} label="Vind" value={`${weather.windSpeed} km/h`} />
          <Stat icon={<Thermometer className="h-4 w-4" />} label="Tillstånd" value={weather.condition} />
        </div>
      </CardContent>
    </Card>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
      <span className="text-white/60" aria-hidden="true">{icon}</span>
      <div>
        <p className="text-white/50 text-xs">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
    </div>
  )
}
