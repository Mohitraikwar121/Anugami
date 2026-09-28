import type { NavigationNode } from "../../types/campus"
import type { RouteStep, Direction } from "../../types/navigation"

const getDirection = (
  previous: NavigationNode,
  current: NavigationNode,
  next: NavigationNode,
): Direction => {
  const angle1 = Math.atan2(
    current.coordinates.lng - previous.coordinates.lng,
    current.coordinates.lat - previous.coordinates.lat,
  )

  const angle2 = Math.atan2(
    next.coordinates.lng - current.coordinates.lng,
    next.coordinates.lat - current.coordinates.lat,
  )

  let difference = ((angle2 - angle1) * 180) / Math.PI

  if (difference > 180) difference -= 360
  if (difference < -180) difference += 360

  if (Math.abs(difference) < 30) return "straight"
  if (difference > 30 && difference < 150) return "right"
  if (difference < -30 && difference > -150) return "left"

  return "u-turn"
}

export function generateInstructions(
  route: NavigationNode[],
): RouteStep[] {
  if (route.length < 2) return []

  return route.slice(1).map((node, index) => {
    const previous = route[index]

    if (index === 0) {
      return {
        instruction: "Start walking",
        distance: 0,
        direction: "straight",
        coordinates: node.coordinates,
      }
    }

    const next = route[index + 1]

    if (!next) {
      return {
        instruction: "You have reached your destination",
        distance: 0,
        direction: "straight",
        coordinates: node.coordinates,
      }
    }

    const direction = getDirection(previous, node, next)

    const instruction =
      direction === "left"
        ? "Turn left"
        : direction === "right"
          ? "Turn right"
          : direction === "u-turn"
            ? "Make a U-turn"
            : "Continue straight"

    return {
      instruction,
      distance: 0,
      direction,
      coordinates: node.coordinates,
    }
  })
}
