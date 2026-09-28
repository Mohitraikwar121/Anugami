import { useNavigate, useSearchParams } from "react-router-dom"
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet"
import L from "leaflet"

import { destinations } from "../../data/destinations"
import { calculateRoute } from "../../services/routing/routingService"
import { isOffRoute } from "../../services/navigation/offRouteService"
import { hasArrived } from "../../services/navigation/arrivalService"
import { useLocation } from "../../hooks/useLocation"

import "leaflet/dist/leaflet.css"

const destinationNodeMap: Record<string, string> = {
  administration: "node-admin",
  "cse-department": "node-cse",
  "central-library": "node-library",
}

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function Navigation() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const location = useLocation(true)

  const destinationId = params.get("destination")

  const destination = destinations.find(
    (item) => item.id === destinationId,
  )

  const route = destination
    ? calculateRoute(
        "node-gate",
        destinationNodeMap[destination.id],
      )
    : null

  if (!destination || !route) {
    return (
      <main style={{ padding: "24px" }}>
        <h1>Route unavailable</h1>

        <button onClick={() => navigate("/search")}>
          Choose Destination
        </button>
      </main>
    )
  }

  const offRoute =
    location.coordinates && route.geometry.length > 0
      ? isOffRoute(
          location.coordinates,
          route.geometry,
        )
      : false

  const arrived =
    location.coordinates &&
    route.geometry.length > 0
      ? hasArrived(
          location.coordinates,
          route.geometry[route.geometry.length - 1],
        )
      : false

  const routePositions = route.geometry.map(
    (point) => [point.lat, point.lng] as [number, number],
  )

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      <button onClick={() => navigate("/home")}>
        ← Back
      </button>

      <h1>🧭 {destination.name}</h1>

      <p style={{ color: "#94a3b8" }}>
        {route.distance} m • {route.estimatedTime} sec
      </p>

      {offRoute && !arrived && (
        <div
          style={{
            padding: "14px",
            margin: "16px 0",
            borderRadius: "12px",
            background: "#7f1d1d",
            color: "white",
            fontWeight: 700,
          }}
        >
          ⚠️ You are off route. Recalculating...
        </div>
      )}

      {arrived && (
        <div
          style={{
            padding: "16px",
            margin: "16px 0",
            borderRadius: "14px",
            background: "#065f46",
            color: "white",
            fontWeight: 700,
          }}
        >
          🎉 You have arrived!
          <br />
          <button
            onClick={() => navigate("/arrival")}
            style={{
              marginTop: "12px",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </div>
      )}

      <MapContainer
        center={routePositions[0]}
        zoom={17}
        style={{
          width: "100%",
          height: "450px",
          borderRadius: "20px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={routePositions} />

        <Marker
          position={routePositions[0]}
          icon={markerIcon}
        >
          <Popup>Start</Popup>
        </Marker>

        <Marker
          position={routePositions[routePositions.length - 1]}
          icon={markerIcon}
        >
          <Popup>{destination.name}</Popup>
        </Marker>

        {location.coordinates && (
          <Marker
            position={[
              location.coordinates.lat,
              location.coordinates.lng,
            ]}
            icon={markerIcon}
          >
            <Popup>
              <strong>You are here</strong>
              <br />
              Accuracy: {Math.round(location.accuracy ?? 0)} m
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <section style={{ marginTop: "24px" }}>
        <h2>Directions</h2>

        {route.steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: "16px",
              marginTop: "12px",
              borderRadius: "14px",
              background: "#0f233a",
            }}
          >
            <strong>{index + 1}. </strong>
            {step.instruction}
          </div>
        ))}
      </section>
    </main>
  )
}

export default Navigation