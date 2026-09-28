export interface Coordinates {
  lat: number
  lng: number
}

export interface Campus {
  id: string
  name: string
  center: Coordinates
  buildings: Building[]
  entrances: Entrance[]
  destinations: Destination[]
  nodes: NavigationNode[]
  edges: NavigationEdge[]
}

export interface Building {
  id: string
  name: string
  coordinates: Coordinates
  description?: string
  image?: string
  floors?: number
}

export interface Entrance {
  id: string
  name: string
  coordinates: Coordinates
}

export interface Destination {
  id: string
  name: string
  category: string
  buildingId?: string
  coordinates: Coordinates
  description?: string
  floor?: number
  accessible?: boolean
  image?: string
  aliases?: string[]
}

export interface NavigationNode {
  id: string
  type: "entrance" | "intersection" | "destination" | "landmark"
  coordinates: Coordinates
}

export interface NavigationEdge {
  from: string
  to: string
  distance: number
  accessible: boolean
  surface?: string
  stairs?: boolean
}