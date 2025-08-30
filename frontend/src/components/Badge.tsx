import { faAward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@heroui/tooltip'
import FontAwesomeIconWrapper from 'wrappers/FontAwesomeIconWrapper'
import type { Badge as BadgeType } from 'types/user'

interface BadgeProps {
  badge: BadgeType
  size?: 'sm' | 'md' | 'lg'
  showTooltip?: boolean
}

const Badge = ({ badge, size = 'md', showTooltip = true }: BadgeProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const badgeIcon = (
    <div className="inline-flex items-center">
      {badge.cssClass ? (
        <FontAwesomeIconWrapper
          icon={badge.cssClass}
          className={`${sizeClasses[size]} text-yellow-500 dark:text-yellow-400`}
        />
      ) : (
        <FontAwesomeIcon
          icon={faAward}
          className={`${sizeClasses[size]} text-yellow-500 dark:text-yellow-400`}
        />
      )}
    </div>
  )

  if (!showTooltip) {
    return badgeIcon
  }

  return (
    <Tooltip
      content={
        <div className="max-w-xs p-2">
          <div className="font-semibold">{badge.name}</div>
          {badge.description && (
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{badge.description}</div>
          )}
        </div>
      }
      placement="top"
      className="rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      {badgeIcon}
    </Tooltip>
  )
}

export default Badge
