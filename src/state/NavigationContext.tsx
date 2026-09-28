import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import type { NavigationState } from "../types/navigation"
import { initialNavigationState } from "./navigationStore"

interface NavigationContextValue {
  navigation: NavigationState
  setNavigation: React.Dispatch<React.SetStateAction<NavigationState>>
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] =
    useState<NavigationState>(initialNavigationState)

  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)

  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider")
  }

  return context
}