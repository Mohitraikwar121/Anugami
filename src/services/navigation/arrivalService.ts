import type { Coordinates } from "../../types/campus"

const toRadians = (value: number) => (value * Math.PI) / 180

export function calculateDistance(
  a: Coordinates,
  b: Coordinates,
): number {
  const R = 6371000

  const dLat = toRadians(b.lat - a.lat)
  const dLng = toRadians(b.lng - a.lng)

  const lat1 = toRadians(a.lat)
  const lat2 = toRadians(b.lat)

  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLng / 2) ** 2

  return R * 2 * Math.atan2(
    Math.sqrt(value),
    Math.sqrt(1 - value),
  )
}

export function hasArrived(
  currentLocation: Coordinates,
  destination: Coordinates,
  threshold = 20,
): boolean {
  return calculateDistance(
    currentLocation,
    destination,
  ) <= threshold
}