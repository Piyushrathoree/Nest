import type { Badge as BadgeType } from 'types/user'
import Badge from 'components/Badge'

interface UserBadgesProps {
  badges: BadgeType[]
  maxDisplay?: number
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
  className?: string
}

const UserBadges = ({
  badges,
  maxDisplay = 6,
  size = 'md',
  showTooltip = true,
  className = '',
}: UserBadgesProps) => {
  if (!badges || badges.length === 0) {
    return null
  }

  // Sort badges by weight (higher weight first) and then by name
  const sortedBadges = [...badges].sort((a, b) => {
    if (a.weight !== b.weight) {
      return b.weight - a.weight // Higher weight first
    }
    return a.name.localeCompare(b.name)
  })

  const displayedBadges = sortedBadges.slice(0, maxDisplay)

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {displayedBadges.map((badge, index) => (
        <Badge key={`${badge.name}-${index}`} badge={badge} size={size} showTooltip={showTooltip} />
      ))}
      {sortedBadges.length > maxDisplay && (
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          +{sortedBadges.length - maxDisplay}
        </span>
      )}
    </div>
  )
}

export default UserBadges
