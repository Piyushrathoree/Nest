import { render, screen } from '@testing-library/react'
import React from 'react'
import type { Badge as BadgeType } from 'types/user'
import Badge from 'components/Badge'

// Mock FontAwesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }: { icon: { iconName: string }; className?: string }) => (
    <span data-testid="font-awesome-icon" data-icon={icon.iconName} className={className} />
  ),
}))

jest.mock('wrappers/FontAwesomeIconWrapper', () => {
  return ({ icon, className }: { icon: string; className?: string }) => (
    <span data-testid="font-awesome-wrapper" data-icon={icon} className={className} />
  )
})

// Mock HeroUI Tooltip
jest.mock('@heroui/tooltip', () => ({
  Tooltip: ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => (
    <div data-testid="tooltip" title={typeof content === 'string' ? content : 'tooltip-content'}>
      {children}
    </div>
  ),
}))

const mockBadge: BadgeType = {
  name: 'OWASP Staff',
  description: 'Official OWASP Staff member',
  cssClass: 'fa-user-shield',
  weight: 100,
}

describe('Badge Component', () => {
  it('renders badge with custom icon from cssClass', () => {
    render(<Badge badge={mockBadge} />)

    const wrapper = screen.getByTestId('font-awesome-wrapper')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveAttribute('data-icon', 'fa-user-shield')
  })

  it('renders badge with default icon when cssClass is empty', () => {
    const badgeWithoutIcon = { ...mockBadge, cssClass: '' }
    render(<Badge badge={badgeWithoutIcon} />)

    const icon = screen.getByTestId('font-awesome-icon')
    expect(icon).toBeInTheDocument()
  })

  it('renders tooltip with badge name and description', () => {
    render(<Badge badge={mockBadge} />)

    const tooltip = screen.getByTestId('tooltip')
    expect(tooltip).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<Badge badge={mockBadge} size="sm" />)
    let wrapper = screen.getByTestId('font-awesome-wrapper')
    expect(wrapper).toHaveClass('h-4', 'w-4')

    rerender(<Badge badge={mockBadge} size="md" />)
    wrapper = screen.getByTestId('font-awesome-wrapper')
    expect(wrapper).toHaveClass('h-5', 'w-5')

    rerender(<Badge badge={mockBadge} size="lg" />)
    wrapper = screen.getByTestId('font-awesome-wrapper')
    expect(wrapper).toHaveClass('h-6', 'w-6')
  })

  it('renders without tooltip when showTooltip is false', () => {
    render(<Badge badge={mockBadge} showTooltip={false} />)

    const tooltip = screen.queryByTestId('tooltip')
    expect(tooltip).not.toBeInTheDocument()

    const wrapper = screen.getByTestId('font-awesome-wrapper')
    expect(wrapper).toBeInTheDocument()
  })
})
