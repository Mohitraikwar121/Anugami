import type {
  NavigationEdge,
  NavigationNode,
  Coordinates,
} from "../../types/campus"

interface GraphNode {
  node: NavigationNode
  g: number
  h: number
  f: number
  parent: string | null
}

const distanceBetween = (a: Coordinates, b: Coordinates): number => {
  const R = 6371000
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180

  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180

  const value =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLng / 2) ** 2

  return R * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}

export function findRoute(
  nodes: NavigationNode[],
  edges: NavigationEdge[],
  startId: string,
  goalId: string,
): NavigationNode[] {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]))

  if (!nodeMap.has(startId) || !nodeMap.has(goalId)) {
    return []
  }

  const openSet = new Set<string>([startId])

  const graph = new Map<string, GraphNode>()

  for (const node of nodes) {
    graph.set(node.id, {
      node,
      g: Infinity,
      h: 0,
      f: Infinity,
      parent: null,
    })
  }

  const start = graph.get(startId)!
  const goal = graph.get(goalId)!

  start.g = 0
  start.h = distanceBetween(start.node.coordinates, goal.node.coordinates)
  start.f = start.h

  while (openSet.size > 0) {
    let currentId: string | null = null
    let lowestF = Infinity

    for (const id of openSet) {
      const current = graph.get(id)!

      if (current.f < lowestF) {
        lowestF = current.f
        currentId = id
      }
    }

    if (!currentId) break

    if (currentId === goalId) {
      const route: NavigationNode[] = []
      let current: string | null = goalId

      while (current) {
        route.unshift(graph.get(current)!.node)
        current = graph.get(current)!.parent
      }

      return route
    }

    openSet.delete(currentId)

    const current = graph.get(currentId)!

    const connectedEdges = edges.filter(
      (edge) =>
        edge.from === currentId ||
        edge.to === currentId,
    )

    for (const edge of connectedEdges) {
      const neighborId =
        edge.from === currentId ? edge.to : edge.from

      const neighbor = graph.get(neighborId)!

      if (!neighbor) continue

      const tentativeG = current.g + edge.distance

      if (tentativeG < neighbor.g) {
        neighbor.parent = currentId
        neighbor.g = tentativeG
        neighbor.h = distanceBetween(
          neighbor.node.coordinates,
          goal.node.coordinates,
        )
        neighbor.f = neighbor.g + neighbor.h

        openSet.add(neighborId)
      }
    }
  }

  return []
}
