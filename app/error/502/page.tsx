"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AppWindow, Server, ServerOff, Check, X } from "lucide-react"

export default async function Error502(props: {
  searchParams: Promise<{ location?: string }>
}) {
  const searchParams = await props.searchParams
  const location = searchParams.location || "Amsterdam"

  return <Error502Content location={location} />
}

function Error502Content({ location }: { location: string }) {
  const [timestamp, setTimestamp] = useState("")
  const [rayId, setRayId] = useState("")
  const [hostname, setHostname] = useState("www.example.com")
  const [ipAddress, setIpAddress] = useState<string | null>(null)
  const [showIp, setShowIp] = useState(false)

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
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body { font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, "Helvetica Neue", Arial, sans-serif; background: linear-gradient(135deg, #0a0a0a 0%, #0f0c18 50%, #0a0a0a 100%); background-attachment: fixed; color: #4a4a4a; line-height: 1.5; display: flex; flex-direction: column; }
        .main-content { flex: 1 0 auto; }
        .header { padding: 2rem 2rem 1rem 2rem; max-width: 1200px; margin: 0 auto; width: 100%; }
        h1 { font-size: 2.5rem; font-weight: 300; color: #f2f2f2; display: inline-block; margin-right: 1rem; }
        .error-code { display: inline-block; background: rgba(80, 80, 255, 0.15); color: #f2f2f2; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.875rem; font-weight: 400; vertical-align: middle; }
        .header p { margin-top: 0.5rem; color: rgba(242, 242, 242, 0.7); font-size: 1rem; }
        .header a { color: rgba(100, 100, 255, 0.9); text-decoration: none; }
        .header a:hover { text-decoration: underline; }
        .timestamp { margin-top: 0.5rem; color: rgba(242, 242, 242, 0.6); font-size: 0.875rem; }
        .diagram-section { background: rgba(15, 12, 24, 0.4); border-top: 1px solid rgba(80, 80, 255, 0.15); border-bottom: 1px solid rgba(80, 80, 255, 0.15); padding: 3rem 2rem; margin-top: 2rem; }
        .diagram { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-around; align-items: center; gap: 2rem; }
        .node { text-align: center; flex: 1; max-width: 300px; }
        .icon-wrapper { position: relative; display: inline-block; margin-bottom: 1rem; }
        .icon-container { width: 120px; height: 120px; margin: 0 auto; display: flex; align-items: center; justify-content: center; background: rgba(224, 224, 224, 0.1); border-radius: 8px; border: 2px solid rgba(153, 153, 153, 0.3); }
        .icon-container svg { width: 64px; height: 64px; stroke: #999; stroke-width: 1.5; }
        .status-badge { position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; border-radius: 50%; border: 3px solid rgba(15, 12, 24, 0.4); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.5rem; }
        .status-badge svg { width: 20px; height: 20px; stroke: white; stroke-width: 3; }
        .status-working { background: #84cc16; }
        .status-error { background: #dc2626; }
        .node-label { color: rgba(242, 242, 242, 0.6); font-size: 0.875rem; margin-bottom: 0.25rem; }
        .node-title { color: rgba(100, 100, 255, 0.9); font-size: 1.125rem; margin-bottom: 0.5rem; font-weight: 500; }
        .node-status { font-size: 1rem; font-weight: 500; }
        .status-working-text { color: #84cc16; }
        .status-error-text { color: #dc2626; }
        .content { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; width: 100%; }
        h2 { font-size: 1.75rem; font-weight: 400; color: #f2f2f2; margin-bottom: 1rem; }
        .content p { color: rgba(242, 242, 242, 0.8); line-height: 1.6; }
        .footer { flex-shrink: 0; text-align: center; padding: 2rem; color: rgba(242, 242, 242, 0.5); font-size: 0.8125rem; border-top: 1px solid rgba(80, 80, 255, 0.1); width: 100%; }
        .footer-content { max-width: 1200px; margin: 0 auto; }
        .footer a { color: rgba(100, 100, 255, 0.9); text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
        .ray-id { color: rgba(242, 242, 242, 0.6); }
        @media (max-width: 768px) {
          h1 { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
          .error-code { display: block; width: fit-content; }
          .diagram { flex-direction: column; gap: 3rem; }
          .node { max-width: 100%; }
          .content { grid-template-columns: 1fr; gap: 2rem; padding: 2rem 1rem; }
          .diagram-section { padding: 2rem 1rem; }
          .header { padding: 1.5rem 1rem; }
          .footer { padding: 1.5rem 1rem; font-size: 0.75rem; }
        }
      `}</style>
      <div className="main-content">
        <div className="header">
          <h1>Bad gateway</h1>
          <span className="error-code">Error code 502</span>
          <p>
            Visit{" "}
            <a href="https://zone-bind.com/error/502" target="_blank" rel="noopener noreferrer">
              zone-bind.com
            </a>{" "}
            for more information.
          </p>
          <p className="timestamp">{timestamp}</p>
        </div>

        <div className="diagram-section">
          <div className="diagram">
            <div className="node">
              <div className="icon-wrapper">
                <div className="icon-container">
                  <AppWindow />
                </div>
                <div className="status-badge status-working">
                  <Check />
                </div>
              </div>
              <div className="node-label">You</div>
              <div className="node-title">Browser</div>
              <div className="node-status status-working-text">Working</div>
            </div>

            <div className="node">
              <div className="icon-wrapper">
                <div className="icon-container">
                  <Server />
                </div>
                <div className="status-badge status-working">
                  <Check />
                </div>
              </div>
              <div className="node-label">{location}</div>
              <div className="node-title">Zone Bind</div>
              <div className="node-status status-working-text">Working</div>
            </div>

            <div className="node">
              <div className="icon-wrapper">
                <div className="icon-container">
                  <ServerOff />
                </div>
                <div className="status-badge status-error">
                  <X />
                </div>
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
            <p>The web server reported a bad gateway error.</p>
          </div>
          <div>
            <h2>What can I do?</h2>
            <p>Please try again in a few minutes.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <span className="ray-id">
            Zone Bind Ray ID: <span>{rayId}</span>
          </span>{" "}
          • Your IP:{" "}
          <a href="#" onClick={handleIpReveal} style={{ cursor: showIp ? "default" : "pointer" }}>
            {showIp ? ipAddress : "Click to reveal"}
          </a>{" "}
          • Performance & security by{" "}
          <a href="https://zone-bind.com" target="_blank" rel="noopener noreferrer">
            Zone Bind
          </a>
        </div>
      </div>
    </>
  )
}
