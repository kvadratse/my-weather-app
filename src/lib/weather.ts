const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string

export interface GeoResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export interface CurrentWeather {
  city: string
  country: string
  temp: number
  feelsLike: number
  condition: string
  description: string
  icon: string
  humidity: number
  windSpeed: number
  weatherId: number
}

export interface ForecastDay {
  date: string        // "YYYY-MM-DD"
  high: number
  low: number
  condition: string
  description: string
  icon: string
}

async function geocode(city: string): Promise<GeoResult> {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Kunde inte nå API:et")
  const data: GeoResult[] = await res.json()
  if (!data.length) throw new Error(`Hittade inte staden "${city}"`)
  return data[0]
}

export async function fetchCurrentWeather(city: string): Promise<{ geo: GeoResult; weather: CurrentWeather }> {
  const geo = await geocode(city)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${API_KEY}&units=metric&lang=sv`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Kunde inte hämta väderdata")
  const d = await res.json()
  return {
    geo,
    weather: {
      city: geo.name,
      country: geo.country,
      temp: Math.round(d.main.temp),
      feelsLike: Math.round(d.main.feels_like),
      condition: d.weather[0].main,
      description: d.weather[0].description,
      icon: d.weather[0].icon,
      humidity: d.main.humidity,
      windSpeed: Math.round(d.wind.speed * 3.6), // m/s → km/h
      weatherId: d.weather[0].id,
    },
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeoResult> {
  const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Kunde inte utföra omvänd geokodning")
  const data: GeoResult[] = await res.json()
  if (!data.length) throw new Error("Hittade inte din plats")
  return data[0]
}

export async function fetchForecast(lat: number, lon: number): Promise<ForecastDay[]> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sv`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Kunde inte hämta prognos")
  const d = await res.json()

  // Aggregate 3h slots by day → keep high/low/icon/condition for each day
  const days = new Map<string, { temps: number[]; icon: string; condition: string; description: string }>()
  for (const item of d.list) {
    const date: string = item.dt_txt.split(" ")[0]
    if (!days.has(date)) {
      days.set(date, { temps: [], icon: item.weather[0].icon, condition: item.weather[0].main, description: item.weather[0].description })
    }
    days.get(date)!.temps.push(item.main.temp)
    // Prefer midday icon (12:00)
    if (item.dt_txt.includes("12:00")) {
      days.get(date)!.icon = item.weather[0].icon
      days.get(date)!.condition = item.weather[0].main
      days.get(date)!.description = item.weather[0].description
    }
  }

  // Return next 5 days (skip today if it's already in current weather)
  return Array.from(days.entries())
    .slice(0, 5)
    .map(([date, info]) => ({
      date,
      high: Math.round(Math.max(...info.temps)),
      low: Math.round(Math.min(...info.temps)),
      condition: info.condition,
      description: info.description,
      icon: info.icon,
    }))
}
