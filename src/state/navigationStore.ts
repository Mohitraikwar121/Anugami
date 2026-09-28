import type { NavigationState } from "../types/navigation"

export const initialNavigationState: NavigationState = {
  status: "IDLE",
  origin: null,
  destination: null,
  route: null,
  currentStep: 0,
  distanceRemaining: 0,
  timeRemaining: 0,
}