import { render, screen } from '@testing-library/react'
import type { Badge as BadgeType } from 'types/user'
import UserBadges from 'components/UserBadges'

// Mock Badge component
jest.mock('components/Badge', () => {
  return ({
    badge,
    size,
    showTooltip,
  }: {
    badge: BadgeType
    size?: string
    showTooltip?: boolean
  }) => (
    <div
      data-testid="badge"
      data-badge-name={badge.name}
      data-size={size}
      data-tooltip={showTooltip}
    >
      {badge.name}
    </div>
  )
})

const mockBadges: BadgeType[] = [
  {
    name: 'OWASP Staff',
    description: 'Official OWASP Staff member',
    cssClass: 'fa-user-shield',
    weight: 100,
  },
  {
    name: 'Project Leader',
    description: 'Leader of an OWASP project',
    cssClass: 'fa-star',
    weight: 80,
  },
  {
    name: 'Chapter Leader',
    description: 'Leader of an OWASP chapter',
    cssClass: 'fa-users',
    weight: 70,
  },
  {
    name: 'Contributor',
    description: 'Active contributor',
    cssClass: 'fa-code',
    weight: 50,
  },
]

describe('UserBadges Component', () => {
  it('renders nothing when badges array is empty', () => {
    const { container } = render(<UserBadges badges={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when badges is undefined', () => {
    const { container } = render(<UserBadges badges={undefined!} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders all badges when count is less than maxDisplay', () => {
    render(<UserBadges badges={mockBadges.slice(0, 2)} />)

    expect(screen.getByText('OWASP Staff')).toBeInTheDocument()
    expect(screen.getByText('Project Leader')).toBeInTheDocument()
    expect(screen.queryByText('+1')).not.toBeInTheDocument()
  })

  it('limits displayed badges to maxDisplay and shows overflow count', () => {
    render(<UserBadges badges={mockBadges} maxDisplay={2} />)

    const badges = screen.getAllByTestId('badge')
    expect(badges).toHaveLength(2)
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('sorts badges by weight (higher first) then by name', () => {
    render(<UserBadges badges={mockBadges} />)

    const badges = screen.getAllByTestId('badge')
    // Should be sorted by weight: OWASP Staff (100), Project Leader (80), Chapter Leader (70), Contributor (50)
    expect(badges[0]).toHaveAttribute('data-badge-name', 'OWASP Staff')
    expect(badges[1]).toHaveAttribute('data-badge-name', 'Project Leader')
    expect(badges[2]).toHaveAttribute('data-badge-name', 'Chapter Leader')
    expect(badges[3]).toHaveAttribute('data-badge-name', 'Contributor')
  })

  it('passes correct props to Badge component', () => {
    render(<UserBadges badges={mockBadges.slice(0, 1)} size="lg" showTooltip={false} />)

    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-size', 'lg')
    expect(badge).toHaveAttribute('data-tooltip', 'false')
  })

  it('applies custom className', () => {
    render(<UserBadges badges={mockBadges.slice(0, 1)} className="custom-class" />)

    const container = screen.getByTestId('badge').parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('uses default values for size and showTooltip', () => {
    render(<UserBadges badges={mockBadges.slice(0, 1)} />)

    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-size', 'md')
    expect(badge).toHaveAttribute('data-tooltip', 'true')
  })
})
