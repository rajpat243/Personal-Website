import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Experience from './pages/Experience.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const location = useLocation()
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    const onMove = (e) => {
      glow.style.opacity = '1'
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Ambient dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '62px 62px',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, #000, transparent 78%)',
          maskImage: 'radial-gradient(circle at 50% 30%, #000, transparent 78%)',
        }}
      />
      {/* Cursor glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '480px',
          height: '480px',
          pointerEvents: 'none',
          zIndex: 30,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          background: 'radial-gradient(circle, rgba(81,228,255,0.09), transparent 65%)',
          transition: 'opacity 0.4s',
          borderRadius: '50%',
        }}
      />

      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
