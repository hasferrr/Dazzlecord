'use client'

import { useLogOutOpen } from '@/context/modal-context'

interface LogOutButtonWrapperProps {
  children: React.ReactNode
  className?: string
}

const LogOutButtonWrapper = ({
  children, className,
}: LogOutButtonWrapperProps) => {
  const logOutOpen = useLogOutOpen()
  return (
    <button onClick={logOutOpen} className={className}>
      {children}
    </button>
  )
}

export default LogOutButtonWrapper
