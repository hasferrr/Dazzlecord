'use client'

import { useEffect, useState } from 'react'

/**
  * The children only rendered if screen width is LESS than 768px (Mobile)
 */
export const MobileScreen = ({ children, width = 768 }: {
  children: React.ReactNode
  width?: number
}) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false)
  const match = `(max-width: ${width}px)`

  useEffect(() => {
    const handleResize = () => {
      const mediaQuery = window.matchMedia(match)
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
