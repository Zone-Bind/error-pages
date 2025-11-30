"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppWindow, Server, Lock, ShieldBan, FileQuestion, ServerOff, AlertTriangle, Check, X } from "lucide-react"

interface ErrorConfig {
  title: string
  description: string
  icon: React.ComponentType<any>
  whatHappened: string
  whatCanIDo: string
}

const errorConfigs: Record<string, ErrorConfig> = {
  "401": { title: "Authorization required", description: "Authorization required to access", icon: Lock, whatHappened: "The server requires authentication to access this resource.", whatCanIDo: "Provide valid credentials or contact the website administrator." },
  "403": { title: "Access forbidden", description: "Access to", icon: ShieldBan, whatHappened: "Access to this resource on the server is denied.", whatCanIDo: "Contact the website owner if you believe you should have access." },
  "404": { title: "Page not found", description: "The page you are looking for on", icon: FileQuestion, whatHappened: "The requested page could not be found on this server.", whatCanIDo: "Check the URL for typos or return to the homepage." },
  "500": { title: "Internal server error", description: "The server for", icon: ServerOff, whatHappened: "The web server reported an internal error.", whatCanIDo: "Please try again in a few minutes." },
  "502": { title: "Bad gateway", description: "The server for", icon: ServerOff, whatHappened: "The web server reported a bad gateway error.", whatCanIDo: "Please try again in a few minutes." },
  "503": { title: "Service unavailable", description: "Service temporarily unavailable for", icon: AlertTriangle, whatHappened: "The origin server is temporarily unable to handle the request. This may be due to maintenance, overload, or a temporary issue.", whatCanIDo: "Try again in a few moments. If the problem persists, contact the website administrator or check back later." },
}

interface ErrorPageClientProps {
  code: string
}

export default function ErrorPage({ params }: { params: { code: string } }) {
  return <ErrorPageClient code={params.code} />
}

function ErrorPageClient({ code }: ErrorPageClientProps) {
  const searchParams = useSearchParams()
  const [timestamp, setTimestamp] = useState("")
  const [rayId, setRayId] = useState("")
  const [hostname, setHostname] = useState("www.example.com")
  const [ipAddress, setIpAddress] = useState<string | null>(null)
  const [showIp, setShowIp] = useState(false)
  const config = errorConfigs[code] || errorConfigs["404"]
  const location = searchParams.get("location") || "Amsterdam"
  const ErrorIcon = config.icon

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
          <h1>{config.title}</h1>
          <span className="error-code">Error code {code}</span>
          <p>
            Visit <a href={`https://zone-bind.com/error/${code}`} target="_blank" rel="noopener noreferrer">zone-bind.com</a> for more information.
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
                <div className="icon-container"><ErrorIcon /></div>
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
            <p>{config.whatHappened}</p>
          </div>
          <div>
            <h2>What can I do?</h2>
            <p>{config.whatCanIDo}</p>
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