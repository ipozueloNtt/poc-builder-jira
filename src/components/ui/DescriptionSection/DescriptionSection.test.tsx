import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DescriptionSection from './DescriptionSection'

describe('DescriptionSection', () => {
  it('renders the heading', () => {
    render(<DescriptionSection />)
    expect(screen.getByRole('heading', { name: 'Descripción' })).toBeInTheDocument()
  })

  it('renders the short description by default', () => {
    render(<DescriptionSection />)
    expect(screen.getByText(/paralelo a la laguna/)).toBeInTheDocument()
  })

  it('shows "Ver descripción completa" button initially', () => {
    render(<DescriptionSection />)
    expect(
      screen.getByRole('button', { name: 'Ver descripción completa' }),
    ).toBeInTheDocument()
  })

  it('expands on button click and shows additional text', () => {
    render(<DescriptionSection />)
    const btn = screen.getByRole('button', { name: 'Ver descripción completa' })
    fireEvent.click(btn)
    expect(screen.getByText(/formación palustre/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver menos' })).toBeInTheDocument()
  })

  it('collapses on "Ver menos" click', () => {
    render(<DescriptionSection />)
    fireEvent.click(screen.getByRole('button', { name: 'Ver descripción completa' }))
    fireEvent.click(screen.getByRole('button', { name: 'Ver menos' }))
    expect(screen.queryByText(/formación palustre/)).not.toBeInTheDocument()
  })

  it('toggle button has aria-expanded attribute', () => {
    render(<DescriptionSection />)
    const btn = screen.getByRole('button', { name: 'Ver descripción completa' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(screen.getByRole('button', { name: 'Ver menos' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
