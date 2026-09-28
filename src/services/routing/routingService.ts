import { navigationEdges, navigationNodes } from "../../data/routes"
import { findRoute } from "./aStar"
import { generateInstructions } from "./instructions"
import type { Route } from "../../types/navigation"

export function calculateRoute(
  origin: string,
  destination: string,
): Route | null {
  const path = findRoute(
    navigationNodes,
    navigationEdges,
    origin,
    destination,
  )

  if (path.length === 0) {
    return null
  }

  const steps = generateInstructions(path)

  const distance = path.reduce((total, node, index) => {
    if (index === 0) return total

    const previous = path[index - 1]

    const edge = navigationEdges.find(
      (item) =>
        (item.from === previous.id && item.to === node.id) ||
        (item.to === previous.id && item.from === node.id),
    )

    return total + (edge?.distance ?? 0)
  }, 0)

  return {
    origin,
    destination,
    distance,
    estimatedTime: Math.round(distance / 1.4),
    geometry: path.map((node) => node.coordinates),
    steps,
  }
}

import type { Coordinates } from "../../types/campus"

export interface LocationResult {
  coordinates: Coordinates
  accuracy: number
  timestamp: number
}

export function getCurrentLocation(): Promise<LocationResult> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      },
    )
  })
}