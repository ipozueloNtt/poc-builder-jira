import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Tabs from './Tabs'

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'como-llegar', label: 'Cómo llegar' },
]

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} activeTab="general" onTabChange={vi.fn()} />)
    expect(screen.getByText('General')).toBeInTheDocument()
    expect(screen.getByText('Servicios')).toBeInTheDocument()
    expect(screen.getByText('Cómo llegar')).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected=true', () => {
    render(<Tabs tabs={tabs} activeTab="general" onTabChange={vi.fn()} />)
    expect(screen.getByRole('tab', { name: 'General' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Servicios' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
  })

  it('calls onTabChange when a tab is clicked', () => {
    const onTabChange = vi.fn()
    render(<Tabs tabs={tabs} activeTab="general" onTabChange={onTabChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Servicios' }))
    expect(onTabChange).toHaveBeenCalledWith('servicios')
  })

  it('renders with tablist role', () => {
    render(<Tabs tabs={tabs} activeTab="general" onTabChange={vi.fn()} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })
})
