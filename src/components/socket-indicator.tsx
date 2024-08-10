'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { useIsConnected, useSocket } from '@/context/socket-context'

const SocketIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const socket = useSocket()
  const isConnected = useIsConnected()

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    socket?.connect()
  }, [socket])

  if (!isConnected) {
    return (
      <>
        <Badge
          variant="outline"
          className="bg-yellow-600 text-white border-none h-5 select-none cursor-pointer"
          onClick={toggleVisibility}
        >
          Reconnecting
        </Badge>
        {isVisible && (
          <div
            className="bg-page dark:bg-page-dark
            flex fixed top-0 left-0 right-0 bottom-0 z-40
            transition-all animate-overlayShow
            flex-col justify-center items-center gap-8"
          >
            <Image
              src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/653714c1f22aef3b6921d63d_636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
              alt=""
              height={75}
              width={75}
            />
            <div className="flex flex-col items-center gap-2">
              <p>Did you know?</p>
              <p className="text-sm font-extralight">
                I didn&apos;t know either
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-yellow-600 text-white border-none h-5 select-none cursor-pointer"
              onClick={() => {
                toggleVisibility()
                setIsHovered(false)
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? 'Click to Hide' : 'Reconnecting'}
            </Badge>
          </div>
        )}
      </>
    )
  }

  return (
    <Badge
      variant="outline"
      className="bg-emerald-600 text-white border-none h-5 select-none"
    >
      Connected
    </Badge>
  )
}

export default SocketIndicator
