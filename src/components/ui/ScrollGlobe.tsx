import { useEffect, useState } from 'react'
import Globe from './Globe'

export function ScrollGlobe() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[460px] transition-transform duration-500"
      style={{ transform: `translateY(${offset * 0.04}px)` }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(83,74,183,0.2),_transparent_40%)] blur-2xl" />
      <Globe />
    </div>
  )
}
