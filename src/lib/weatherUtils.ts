// Map weather condition → gradient class
export function getGradient(condition: string, icon: string): string {
  const isNight = icon?.endsWith("n")
  if (isNight) return "from-indigo-950 via-slate-900 to-gray-900"

  switch (condition.toLowerCase()) {
    case "thunderstorm":
      return "from-gray-800 via-slate-700 to-zinc-900"
    case "drizzle":
    case "rain":
      return "from-slate-600 via-blue-800 to-slate-900"
    case "snow":
      return "from-blue-100 via-slate-200 to-blue-300"
    case "clear":
      return "from-sky-400 via-blue-500 to-indigo-600"
    case "clouds":
      return "from-slate-400 via-gray-500 to-slate-600"
    default:
      return "from-violet-600 via-purple-600 to-blue-700"
  }
}

// Swedish weekday names
const SV_DAYS = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]

export function formatDay(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00")
  return SV_DAYS[d.getDay()]
}
