import { CurrentWeather } from "@/lib/weather"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Wind, Thermometer } from "lucide-react"

interface Props {
  weather: CurrentWeather
}

export function WeatherCard({ weather }: Props) {
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
        {/* Big temperature */}
        <div className="flex items-end gap-2 mb-6">
          <span className="text-6xl sm:text-7xl font-extrabold text-white leading-none" aria-label={`${weather.temp} grader Celsius`}>
            {weather.temp}°
          </span>
          <span className="text-white/60 text-lg mb-2">C</span>
          <span className="text-white/50 text-sm mb-3 ml-1">Känns som {weather.feelsLike}°</span>
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
