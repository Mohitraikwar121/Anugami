import { useEffect, useState } from "react"
import type { LocationState } from "../types/navigation"

export function useLocation(enabled = false): LocationState {
  const [state, setState] = useState<LocationState>({
    coordinates: null,
    accuracy: null,
    timestamp: null,
    permission: "unknown",
  })

  useEffect(() => {
    if (!enabled) return

    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        permission: "unknown",
      }))
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          permission: "granted",
        })
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          permission:
            error.code === error.PERMISSION_DENIED
              ? "denied"
              : prev.permission,
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [enabled])

  return state
}