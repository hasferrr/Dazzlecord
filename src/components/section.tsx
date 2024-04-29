'use client'

interface SectionProps {
  title: string
}

const Section = ({
  title,
}: SectionProps) => (
  <div className="flex items-center justify-between py-2">
    <p className="text-xs uppercase font-bold text-channel-section">
      {title}
    </p>
  </div>
)

export default Section
