import { ForecastDay } from "@/lib/weather"
import { formatDay } from "@/lib/weatherUtils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  forecast: ForecastDay[]
}

export function ForecastCard({ forecast }: Props) {
  return (
    <Card className="mt-4" aria-label="5-dagarsprognos">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">5-dagarsprognos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-white/10" role="list">
          {forecast.map((day) => (
            <li key={day.date} className="flex items-center justify-between py-2 gap-2">
              <span className="text-white font-medium w-10">{formatDay(day.date)}</span>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="w-10 h-10 drop-shadow"
                width={40}
                height={40}
              />
              <span className="text-white/60 text-sm flex-1 capitalize hidden sm:block">{day.description}</span>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <span className="text-white">{day.high}°</span>
                <span className="text-white/40">/</span>
                <span className="text-white/60">{day.low}°</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
