'use client'

import { useEffect, useState } from 'react'

/**
 * The children only rendered if screen width is MORE than 768px
 */
const BigScreen = ({ children }: { children: React.ReactNode }) => {
  const [isBigScreen, setIsBigScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mediaQuery = window.matchMedia('(min-width: 768px)')
      setIsBigScreen(mediaQuery.matches)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>{isBigScreen && children}</>
  )
}

export default BigScreen
