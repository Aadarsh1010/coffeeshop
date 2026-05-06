import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Navbar           from './components/Navbar'
import Footer           from './components/Footer'
import ScrollToTop      from './components/ScrollToTop'
import LoadingScreen    from './components/LoadingScreen'
import DailySpecialPopup from './components/DailySpecialPopup'
import WhatsAppButton   from './components/WhatsAppButton'
import CookieBanner     from './components/CookieBanner'
import Home         from './pages/Home'
import Menu         from './pages/Menu'
import About        from './pages/About'
import Gallery      from './pages/Gallery'
import Reservations from './pages/Reservations'
import Contact      from './pages/Contact'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* Skip-to-content link (only visible on focus, for keyboard users) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-coffee-950 transition-colors duration-500">
        <Navbar />
        <ScrollToTop />
        <WhatsAppButton />
        <CookieBanner />
        <DailySpecialPopup />

        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"             element={<Home />} />
              <Route path="/menu"         element={<Menu />} />
              <Route path="/about"        element={<About />} />
              <Route path="/gallery"      element={<Gallery />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/contact"      element={<Contact />} />
              {/* 404 fallback */}
              <Route path="*"             element={<Home />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
