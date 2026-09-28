import type { Coordinates } from "./campus"

export type NavigationStatus =
  | "IDLE"
  | "SELECTING_DESTINATION"
  | "ROUTE_PREVIEW"
  | "STARTING"
  | "NAVIGATING"
  | "OFF_ROUTE"
  | "RECALCULATING"
  | "ARRIVED"
  | "LOCATION_UNAVAILABLE"
  | "ROUTE_NOT_FOUND"
  | "PERMISSION_DENIED"
  | "NETWORK_ERROR"

export type Direction =
  | "straight"
  | "left"
  | "right"
  | "slight-left"
  | "slight-right"
  | "u-turn"

export interface RouteStep {
  instruction: string
  distance: number
  direction: Direction
  landmark?: string
  coordinates?: Coordinates
}

export interface Route {
  origin: string
  destination: string
  distance: number
  estimatedTime: number
  geometry: Coordinates[]
  steps: RouteStep[]
}

export interface LocationState {
  coordinates: Coordinates | null
  accuracy: number | null
  timestamp: number | null
  permission: PermissionState | "unknown"
}

export interface NavigationState {
  status: NavigationStatus
  origin: string | null
  destination: string | null
  route: Route | null
  currentStep: number
  distanceRemaining: number
  timeRemaining: number
}