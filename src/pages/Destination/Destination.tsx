import { useNavigate, useSearchParams } from "react-router-dom"
import { destinations } from "../../data/destinations"

function Destination() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const id = params.get("id")
  const destination = destinations.find((item) => item.id === id)

  if (!destination) {
    return (
      <main style={{ padding: "24px" }}>
        <h1>Destination not found</h1>

        <button onClick={() => navigate("/search")}>
          Back to Search
        </button>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <button onClick={() => navigate("/search")}>
        ← Back
      </button>

      <section style={{ marginTop: "40px" }}>
        <p style={{ color: "#38bdf8", fontWeight: 700 }}>
          {destination.category.toUpperCase()}
        </p>

        <h1 style={{ fontSize: "44px" }}>
          {destination.name}
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          {destination.description}
        </p>

        <button
          onClick={() =>
            navigate(
              `/navigation?destination=${destination.id}`,
            )
          }
          style={{
            width: "100%",
            padding: "17px",
            marginTop: "24px",
            border: "none",
            borderRadius: "14px",
            background: "#0ea5e9",
            color: "white",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          🧭 Guide Me
        </button>
      </section>
    </main>
  )
}

export default Destination