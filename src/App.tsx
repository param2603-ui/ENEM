import { Routes, Route } from 'react-router-dom'
import DemoOne from '@/components/ui/demo'
import AboutPage from '@/pages/About'
import ServicesPage from '@/pages/Services'
import ContactPage from '@/pages/Contact'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DemoOne />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<DemoOne />} />
    </Routes>
  )
}

export default App
