import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { parseQRPayload } from "../../services/qr/qrService"

interface QRScannerProps {
  onScan?: (campusId: string, entryPointId: string) => void
}

function QRScanner({ onScan }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState("")

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode("anugami-qr-reader")
      scannerRef.current = scanner
      setScanning(true)

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          const payload = parseQRPayload(decodedText)

          if (payload) {
            setResult(
              `Campus: ${payload.campusId} | Entry: ${payload.entryPointId}`,
            )

            onScan?.(payload.campusId, payload.entryPointId)
          } else {
            setResult(`QR detected: ${decodedText}`)
          }

          await scanner.stop()
          scanner.clear()
          scannerRef.current = null
          setScanning(false)
        },
        () => {},
      )
    } catch {
      setResult("Unable to access camera.")
      setScanning(false)
    }
  }

  const stopScanner = async () => {
    if (!scannerRef.current) return

    try {
      await scannerRef.current.stop()
      scannerRef.current.clear()
    } catch {}

    scannerRef.current = null
    setScanning(false)
  }

  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {})
    }
  }, [])

  return (
    <section style={{ marginTop: "24px" }}>
      <button
        type="button"
        onClick={scanning ? stopScanner : startScanner}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          background: scanning ? "#dc2626" : "#0ea5e9",
          color: "white",
          fontWeight: 700,
        }}
      >
        {scanning ? "✕ Stop Scanner" : "📷 Scan Campus QR"}
      </button>

      <div
        id="anugami-qr-reader"
        style={{ width: "100%", marginTop: "16px" }}
      />

      {result && (
        <p
          style={{
            marginTop: "12px",
            padding: "12px",
            borderRadius: "10px",
            background: "#0f233a",
            color: "#cbd5e1",
          }}
        >
          {result}
        </p>
      )}
    </section>
  )
}

export default QRScanner