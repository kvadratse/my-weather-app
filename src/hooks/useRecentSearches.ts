import { useState } from "react"

const STORAGE_KEY = "recent-searches"
const MAX_ITEMS = 5

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  } catch {
    return []
  }
}

export function useRecentSearches() {
  const [recents, setRecents] = useState<string[]>(load)

  function addRecent(city: string) {
    setRecents((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase())
      const next = [city, ...filtered].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  function clearRecents() {
    localStorage.removeItem(STORAGE_KEY)
    setRecents([])
  }

  return { recents, addRecent, clearRecents }
}
