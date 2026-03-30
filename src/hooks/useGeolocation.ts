import { useState } from "react"

type GeoStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable"

interface GeolocationState {
  status: GeoStatus
  lat: number | null
  lon: number | null
  error: string | null
}

const STORAGE_KEY = "geo-permission"

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: "idle",
    lat: null,
    lon: null,
    error: null,
  })

  // Has the user already made a choice (stored in localStorage)?
  const previousChoice = localStorage.getItem(STORAGE_KEY)

  function requestLocation() {
    if (!navigator.geolocation) {
      setState({ status: "unavailable", lat: null, lon: null, error: "Din webbläsare stöder inte geolokalisering." })
      localStorage.setItem(STORAGE_KEY, "denied")
      return
    }
    setState((s) => ({ ...s, status: "requesting" }))
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({ status: "granted", lat: pos.coords.latitude, lon: pos.coords.longitude, error: null })
        localStorage.setItem(STORAGE_KEY, "granted")
      },
      () => {
        setState({ status: "denied", lat: null, lon: null, error: "Platsbehörighet nekades." })
        localStorage.setItem(STORAGE_KEY, "denied")
      },
      { timeout: 10000 }
    )
  }

  function dismissPrompt() {
    localStorage.setItem(STORAGE_KEY, "denied")
    setState((s) => ({ ...s, status: "denied" }))
  }

  return { ...state, previousChoice, requestLocation, dismissPrompt }
}
