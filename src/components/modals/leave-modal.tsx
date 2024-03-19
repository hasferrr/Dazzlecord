'use client'

import type { Server } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  useLeaveServerClose,
  useLeaveServerValue,
} from '@/context/modalContext'

const LeaveModal = ({ server }: { server: Server }) => {
  const router = useRouter()

  const onLeaveModalClose = useLeaveServerClose()
  const isLeaveModalOpen = useLeaveServerValue()

  const handleOpenDialog = () => {
    onLeaveModalClose()
  }

  const handleLeave = () => {
    console.log('leave')
    onLeaveModalClose()
    router.refresh()
  }

  return (
    <Dialog open={isLeaveModalOpen} onOpenChange={handleOpenDialog}>
      <DialogContent className="p-0 m-0 dark:bg-[#313338] text-black dark:text-white w-[29rem]">

        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-bold">Leave {`'${server.name}'`}</DialogTitle>
          <DialogDescription className="text-sm mt-8 text-primary">
            Are you sure you want to leave <strong>{server.name}</strong>? You won{'\''}t be able to
            rejoin this server unless you are re-invited.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-gray-100 dark:bg-[#2b2d31] rounded-b-lg">
          <Button variant="destructive" onClick={handleLeave}>
            Leave Server
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog >
  )
}

export default LeaveModal
