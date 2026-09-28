import { useNavigate } from "react-router-dom"
import CampusMap from "../../components/map/CampusMap"

function Home() {
  const navigate = useNavigate()

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        maxWidth: "1100px",
        margin: "auto",
      }}
    >
      <header>
        <p style={{ color: "#38bdf8", fontWeight: 700 }}>
          ANUGAMI
        </p>

        <h1 style={{ fontSize: "40px", margin: "8px 0" }}>
          Where do you want to go?
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Navigate your campus with confidence.
        </p>
      </header>

      <button
        onClick={() => navigate("/search")}
        style={{
          width: "100%",
          padding: "18px",
          marginTop: "28px",
          borderRadius: "16px",
          border: "1px solid #1e3a5f",
          background: "#0b1728",
          color: "#94a3b8",
          textAlign: "left",
          fontSize: "16px",
        }}
      >
        🔍 Search buildings, departments, rooms...
      </button>

      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <Card
          icon="📍"
          title="Use My Location"
          text="Find your current position"
        />

        <Card
          icon="🗺️"
          title="Explore Campus"
          text="Discover places around you"
        />

        <Card
          icon="⭐"
          title="Popular Places"
          text="Quickly find common destinations"
        />
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Explore Campus</h2>
        <CampusMap />
      </section>
    </main>
  )
}

function Card({
  icon,
  title,
  text,
}: {
  icon: string
  title: string
  text: string
}) {
  return (
    <article
      style={{
        padding: "24px",
        borderRadius: "18px",
        background: "rgba(15, 35, 58, 0.8)",
        border: "1px solid #173452",
      }}
    >
      <div style={{ fontSize: "32px" }}>{icon}</div>

      <h2 style={{ fontSize: "20px" }}>
        {title}
      </h2>

      <p style={{ color: "#94a3b8" }}>
        {text}
      </p>
    </article>
  )
}

export default Home