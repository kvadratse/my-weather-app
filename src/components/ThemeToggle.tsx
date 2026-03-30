import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  theme: "dark" | "light"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === "dark"
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Byt till ljust läge" : "Byt till mörkt läge"}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
        "transition-colors duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isDark ? "bg-indigo-600/80" : "bg-white/30 backdrop-blur-sm"
      )}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-flex h-6 w-6 items-center justify-center rounded-full shadow-lg",
          "bg-white transition-transform duration-300 ease-in-out",
          isDark ? "translate-x-6" : "translate-x-0"
        )}
      >
        {isDark
          ? <Moon className="h-3.5 w-3.5 text-indigo-600" />
          : <Sun className="h-3.5 w-3.5 text-amber-500" />
        }
      </span>
    </button>
  )
}
