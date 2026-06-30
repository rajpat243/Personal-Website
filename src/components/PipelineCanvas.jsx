import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'

const NODES = [
  { x: 0.10, y: 0.26, label: 'SOURCE' },
  { x: 0.10, y: 0.74, label: 'STREAM' },
  { x: 0.40, y: 0.50, label: 'INGEST' },
  { x: 0.66, y: 0.50, label: 'TRANSFORM' },
  { x: 0.92, y: 0.27, label: 'AI / LLM' },
  { x: 0.92, y: 0.73, label: 'SERVE' },
]
const EDGES = [[0, 2], [1, 2], [2, 3], [3, 4], [3, 5]]
const ACC = '#51E4FF'
const ACC2 = '#38bdf8'

export default function PipelineCanvas() {
  const canvasRef = useRef(null)
  const deadRef = useRef(false)
  const reduce = useReducedMotion()
  const { dark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    deadRef.current = false
    let particles = []
    let W = 0, H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const edgeColor = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.12)'
    const nodeFill = dark ? '#0B0D10' : '#F0F2F5'
    const nodeLabel = dark ? 'rgba(255,255,255,0.52)' : 'rgba(0,0,0,0.55)'

    const resize = () => {
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    let ro
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(resize)
      ro.observe(canvas)
    }

    const pos = (n) => ({ x: n.x * W, y: n.y * H })

    const frame = () => {
      if (deadRef.current) return
      ctx.clearRect(0, 0, W, H)

      EDGES.forEach(([a, b]) => {
        const p1 = pos(NODES[a]), p2 = pos(NODES[b])
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = edgeColor
        ctx.lineWidth = 1
        ctx.stroke()
      })

      if (!reduce && Math.random() < 0.3) {
        const ei = (Math.random() * EDGES.length) | 0
        particles.push({
          ei,
          t: 0,
          speed: 0.006 + Math.random() * 0.009,
          c: Math.random() < 0.5 ? ACC : ACC2,
        })
      }

      particles.forEach((pt) => {
        if (!reduce) pt.t += pt.speed
        const [a, b] = EDGES[pt.ei]
        const p1 = pos(NODES[a]), p2 = pos(NODES[b])
        const x = p1.x + (p2.x - p1.x) * pt.t
        const y = p1.y + (p2.y - p1.y) * pt.t
        ctx.beginPath()
        ctx.arc(x, y, 2.3, 0, 6.283)
        ctx.fillStyle = pt.c
        ctx.shadowColor = pt.c
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      })
      particles = particles.filter((p) => p.t < 1)

      NODES.forEach((n) => {
        const p = pos(n)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4.5, 0, 6.283)
        ctx.fillStyle = nodeFill
        ctx.fill()
        ctx.lineWidth = 1.4
        ctx.strokeStyle = ACC
        ctx.shadowColor = ACC
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
        ctx.font = "10px 'JetBrains Mono', monospace"
        ctx.fillStyle = nodeLabel
        ctx.textAlign = 'center'
        ctx.fillText(n.label, p.x, p.y - 13)
      })

      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)

    return () => {
      deadRef.current = true
      if (ro) ro.disconnect()
    }
  }, [reduce, dark])

  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-text-soft">
          <span className="pulse-glow h-2 w-2 rounded-full bg-brand" />
          pipeline.live
        </span>
        <span className="font-mono text-[11px] tracking-wide text-text-xsoft">● STREAMING</span>
      </div>
      <canvas ref={canvasRef} className="block w-full" style={{ height: '340px' }} />
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <span className="font-mono text-[10.5px] tracking-wide text-text-xsoft">dbt · spark · bedrock</span>
        <span className="font-mono text-[10.5px] tracking-wide text-text-xsoft">
          uptime <span className="text-brand">99.98%</span>
        </span>
      </div>
    </div>
  )
}
