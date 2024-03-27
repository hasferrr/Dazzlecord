'use client'

import { useEffect, useState } from 'react'

/**
  * The children only rendered if screen width is LESS than 768px (Mobile)
 */
export const MobileScreen = ({ children }: { children: React.ReactNode }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mediaQuery = window.matchMedia('(max-width: 768px)')
      setIsMobileScreen(mediaQuery.matches)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>{isMobileScreen && children}</>
  )
}

export default MobileScreen
