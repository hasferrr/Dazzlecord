'use client'

const MemberSection = ({ title }: { title: string }) => {

  return (
    <div className="flex items-center justify-between pt-2 pb-1">
      <p className="text-xs uppercase font-bold text-channel-section">
        {title}
      </p>
    </div>
  )
}

export default MemberSection
