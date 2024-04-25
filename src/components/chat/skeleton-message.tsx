import { Skeleton } from '@/components/ui/skeleton'

const SkeletonMessage = () => (
  <div>
    <div className="p-4 flex items-center space-x-4">
      <Skeleton className="dark:bg-[#3b3d43] h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="dark:bg-[#3b3d43] h-4 w-[250px]" />
        <Skeleton className="dark:bg-[#3b3d43] h-4 w-[200px]" />
      </div>
    </div>
    <div className="p-4 flex items-center space-x-4">
      <Skeleton className="dark:bg-[#3b3d43] h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="dark:bg-[#3b3d43] h-4 w-[250px]" />
        <Skeleton className="dark:bg-[#3b3d43] h-4 w-[200px]" />
      </div>
    </div>
  </div>
)

export default SkeletonMessage
