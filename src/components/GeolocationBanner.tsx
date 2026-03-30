import { MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  onAllow: () => void
  onDismiss: () => void
  isRequesting: boolean
}

export function GeolocationBanner({ onAllow, onDismiss, isRequesting }: Props) {
  return (
    <div
      role="region"
      aria-label="Platsbegäran"
      className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/15 dark:bg-black/25 backdrop-blur-md px-4 py-3 text-white shadow-lg"
    >
      <div className="flex items-center gap-3 min-w-0">
        <MapPin className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
        <p className="text-sm">
          Visa väder för din nuvarande plats?
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          onClick={onAllow}
          disabled={isRequesting}
          aria-label="Tillåt platsbehörighet"
          className="text-xs h-8"
        >
          {isRequesting ? "Hämtar…" : "Tillåt"}
        </Button>
        <button
          onClick={onDismiss}
          aria-label="Avfärda platsbegäran"
          className="rounded-full p-1 text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
