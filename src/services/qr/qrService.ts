export interface QRPayload {
  campusId: string
  entryPointId: string
  buildingId?: string
  eventId?: string
}

export function parseQRPayload(value: string): QRPayload | null {
  try {
    const data = JSON.parse(value)

    if (!data.campusId || !data.entryPointId) {
      return null
    }

    return data as QRPayload
  } catch {
    return null
  }
}