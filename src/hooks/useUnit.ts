import { useState } from "react"

export type TempUnit = "C" | "F"

export function toF(celsius: number): number {
  return Math.round(celsius * 9 / 5 + 32)
}

export function convertTemp(celsius: number, unit: TempUnit): number {
  return unit === "F" ? toF(celsius) : celsius
}

export function useUnit() {
  const [unit, setUnit] = useState<TempUnit>(
    () => (localStorage.getItem("temp-unit") as TempUnit | null) ?? "C"
  )

  function toggleUnit() {
    setUnit((u) => {
      const next: TempUnit = u === "C" ? "F" : "C"
      localStorage.setItem("temp-unit", next)
      return next
    })
  }

  return { unit, toggleUnit }
}
