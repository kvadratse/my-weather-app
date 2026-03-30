import { Clock, X } from "lucide-react"

interface Props {
  recents: string[]
  onSelect: (city: string) => void
  onClear: () => void
}

export function RecentSearches({ recents, onSelect, onClear }: Props) {
  if (recents.length === 0) return null

  return (
    <div className="mt-3" aria-label="Senaste sökningar">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Senaste sökningar
        </span>
        <button
          onClick={onClear}
          aria-label="Rensa senaste sökningar"
          className="text-white/40 hover:text-white/70 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        >
          <span className="flex items-center gap-1">
            <X className="h-3 w-3" />
            Rensa
          </span>
        </button>
      </div>
      <ul className="flex flex-wrap gap-2" role="list">
        {recents.map((city) => (
          <li key={city}>
            <button
              onClick={() => onSelect(city)}
              aria-label={`Sök väder för ${city}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 dark:border-white/15 bg-white/15 dark:bg-black/20 backdrop-blur-sm px-3 py-1 text-sm text-white hover:bg-white/25 dark:hover:bg-black/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              {city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
