import { useNavigate } from "react-router-dom"

function Arrival() {
  const navigate = useNavigate()

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <section style={{ maxWidth: "500px" }}>
        <div style={{ fontSize: "72px" }}>🎉</div>

        <p
          style={{
            color: "#38bdf8",
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          ARRIVED
        </p>

        <h1 style={{ fontSize: "48px", margin: "10px 0" }}>
          You made it!
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            lineHeight: 1.6,
          }}
        >
          You have successfully reached your destination.
        </p>

        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%",
            padding: "16px",
            marginTop: "24px",
            border: "none",
            borderRadius: "14px",
            background: "#0ea5e9",
            color: "white",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Back to Campus
        </button>
      </section>
    </main>
  )
}

export default Arrival