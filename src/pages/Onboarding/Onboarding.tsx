import { useState } from "react"
import { useNavigate } from "react-router-dom"
import QRScanner from "../../components/common/QRScanner"

function Onboarding() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")

  const handleContinue = () => {
    if (!name.trim()) return

    navigate("/home")
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px 20px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <p
          style={{
            color: "#38bdf8",
            fontWeight: 700,
          }}
        >
          STEP 1 OF 2
        </p>

        <h1
          style={{
            fontSize: "42px",
            margin: "12px 0",
          }}
        >
          Let's get you started.
        </h1>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: 1.6,
          }}
        >
          Tell ANUGAMI a little about yourself.
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={inputStyle}
        />

        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department (optional)"
          style={inputStyle}
        />

        <QRScanner
          onScan={(campusId, entryPointId) => {
            sessionStorage.setItem(
              "anugamiEntry",
              JSON.stringify({
                campusId,
                entryPointId,
              }),
            )
          }}
        />

        <button
          onClick={handleContinue}
          style={buttonStyle}
        >
          Continue →
        </button>
      </section>
    </main>
  )
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginTop: "16px",
  borderRadius: "12px",
  border: "1px solid #1e3a5f",
  background: "#0b1728",
  color: "white",
  outline: "none",
}

const buttonStyle = {
  width: "100%",
  padding: "16px",
  marginTop: "24px",
  border: "none",
  borderRadius: "12px",
  background: "#0ea5e9",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
}

export default Onboarding