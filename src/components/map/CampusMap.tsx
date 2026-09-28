import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { sampleCampus } from "../../data/campus/sampleCampus"
import { useLocation } from "../../hooks/useLocation"

import "leaflet/dist/leaflet.css"

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

function CampusMap() {
  const location = useLocation(true)

  return (
    <MapContainer
      center={[sampleCampus.center.lat, sampleCampus.center.lng]}
      zoom={17}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {sampleCampus.buildings.map((building) => (
        <Marker
          key={building.id}
          position={[
            building.coordinates.lat,
            building.coordinates.lng,
          ]}
          icon={markerIcon}
        >
          <Popup>
            <strong>{building.name}</strong>
            <br />
            {building.description}
          </Popup>
        </Marker>
      ))}

      {location.coordinates && (
        <Marker
          position={[
            location.coordinates.lat,
            location.coordinates.lng,
          ]}
          icon={markerIcon}
        >
          <Popup>
            <strong>Your Location</strong>
            <br />
            Accuracy: {Math.round(location.accuracy ?? 0)} m
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default CampusMap