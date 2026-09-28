import { useNavigate } from "react-router-dom"

function Welcome() {
  const navigate = useNavigate()

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "520px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🧭</div>

        <p
          style={{
            color: "#38bdf8",
            fontWeight: 700,
            letterSpacing: "3px",
          }}
        >
          ANUGAMI
        </p>

        <h1
          style={{
            fontSize: "clamp(42px, 10vw, 72px)",
            margin: "10px 0",
          }}
        >
          Find Your Way.
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          Your smart campus navigation companion.
          <br />
          Explore. Navigate. Arrive.
        </p>

        <button
          onClick={() => navigate("/onboarding")}
          style={{
            marginTop: "28px",
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "14px",
            background: "#0ea5e9",
            color: "white",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Get Started →
        </button>
      </section>
    </main>
  )
}

export default Welcome