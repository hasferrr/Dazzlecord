'use client'

import { useEffect, useState } from 'react'

/**
 * The children only rendered if screen width is MORE than 768px
 */
const BigScreen = ({ children, width = 768 }: {
  children: React.ReactNode
  width?: number
}) => {
  const [isBigScreen, setIsBigScreen] = useState(false)
  const match = `(min-width: ${width}px)`

  useEffect(() => {
    const handleResize = () => {
      const mediaQuery = window.matchMedia(match)
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
