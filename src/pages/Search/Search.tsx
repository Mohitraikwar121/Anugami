import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { destinations } from "../../data/destinations"

function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const value = query.toLowerCase().trim()

    if (!value) return destinations

    return destinations.filter((destination) =>
      [
        destination.name,
        destination.category,
        ...(destination.aliases ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(value),
    )
  }, [query])

  return (
    <main style={{ minHeight: "100vh", padding: "24px", maxWidth: "900px", margin: "auto" }}>
      <button onClick={() => navigate("/home")}>← Back</button>

      <h1 style={{ fontSize: "40px" }}>Find a destination</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search CSE, library, administration..."
        style={{
          width: "100%",
          padding: "18px",
          borderRadius: "14px",
          border: "1px solid #1e3a5f",
          background: "#0b1728",
          color: "white",
          fontSize: "16px",
        }}
      />

      <div style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
        {results.map((destination) => (
          <button
            key={destination.id}
            onClick={() => navigate(`/destination?id=${destination.id}`)}
            style={{
              padding: "18px",
              borderRadius: "14px",
              border: "1px solid #173452",
              background: "#0f233a",
              color: "white",
              textAlign: "left",
            }}
          >
            <strong>{destination.name}</strong>
            <br />
            <small style={{ color: "#94a3b8" }}>
              {destination.category}
            </small>
          </button>
        ))}
      </div>
    </main>
  )
}

export default Search