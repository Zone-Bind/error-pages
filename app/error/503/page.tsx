"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppWindow, Server, AlertTriangle, Check, X } from "lucide-react"

export default function Error503() {
  const searchParams = useSearchParams()
  const [timestamp, setTimestamp] = useState("")
  const [rayId, setRayId] = useState("")
  const [hostname, setHostname] = useState("www.example.com")
  const [ipAddress, setIpAddress] = useState<string | null>(null)
  const [showIp, setShowIp] = useState(false)
  const location = searchParams.get("location") || "Amsterdam"

  useEffect(() => {
    setTimestamp(new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC")
    setHostname(window.location.hostname || "www.example.com")
    const chars = "0123456789abcdef"
    let id = ""
    for (let i = 0; i < 16; i++) id += chars[Math.floor(Math.random() * chars.length)]
    setRayId(id)
  }, [])

  const handleIpReveal = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (showIp) return
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      setIpAddress(data.ip)
    } catch {
      setIpAddress("203.0.113.1")
    }
    setShowIp(true)
  }

  return (
    <>
      <div className="main-content">
        <div className="header">
          <h1>Service unavailable</h1>
          <span className="error-code">Error code 503</span>
          <p>
            Visit <a href="https://zone-bind.com/error/503" target="_blank" rel="noopener noreferrer">zone-bind.com</a> for more information.
          </p>
          <p className="timestamp">{timestamp}</p>
        </div>

        <div className="diagram-section">
          <div className="diagram">
            <div className="node">
              <div className="icon-wrapper">
                <div className="icon-container"><AppWindow /></div>
                <div className="status-badge status-working"><Check /></div>
              </div>
              <div className="node-label">You</div>
              <div className="node-title">Browser</div>
              <div className="node-status status-working-text">Working</div>
            </div>

            <div className="node">
              <div className="icon-wrapper">
                <div className="icon-container"><Server /></div>
                <div className="status-badge status-working"><Check /></div>
              </div>
              <div className="node-label">{location}</div>
              <div className="node-title">Zone Bind</div>
              <div className="node-status status-working-text">Working</div>
            </div>

            <div className="node">
              <div className="icon-wrapper">
                <div className="icon-container"><AlertTriangle /></div>
                <div className="status-badge status-error"><X /></div>
              </div>
              <div className="node-label">{hostname}</div>
              <div className="node-title">Host</div>
              <div className="node-status status-error-text">Error</div>
            </div>
          </div>
        </div>

        <div className="content">
          <div>
            <h2>What happened?</h2>
            <p>The origin server is temporarily unable to handle the request. This may be due to maintenance, overload, or a temporary issue.</p>
          </div>
          <div>
            <h2>What can I do?</h2>
            <p>Try again in a few moments. If the problem persists, contact the website administrator or check back later.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <span className="ray-id">Zone Bind Ray ID: <span>{rayId}</span></span> • Your IP:{" "}
          <a href="#" onClick={handleIpReveal} style={{ cursor: showIp ? "default" : "pointer" }}>
            {showIp ? ipAddress : "Click to reveal"}
          </a>{" "}• Performance & security by{" "}
          <a href="https://zone-bind.com" target="_blank" rel="noopener noreferrer">Zone Bind</a>
        </div>
      </div>
    </>
  )
}
