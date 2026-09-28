export interface UserProfile {
  name?: string
  studentId?: string
  department?: string
  semester?: number
  phone?: string
  email?: string
}

export interface UserPreferences {
  navigationMode?: "shortest" | "fastest" | "accessible" | "simple"
  reducedMotion?: boolean
  voiceNavigation?: boolean
}

export interface UserState {
  profile: UserProfile
  preferences: UserPreferences
  isGuest: boolean
}