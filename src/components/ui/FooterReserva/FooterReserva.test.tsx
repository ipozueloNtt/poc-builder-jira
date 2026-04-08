import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FooterReserva from './FooterReserva'

describe('FooterReserva', () => {
  it('renders the reservation note', () => {
    render(<FooterReserva />)
    expect(
      screen.getByText('Para hacer el sendero necesitas reservar antes'),
    ).toBeInTheDocument()
  })

  it('renders the Reservar button', () => {
    render(<FooterReserva />)
    expect(
      screen.getByRole('button', { name: /Reservar plaza/ }),
    ).toBeInTheDocument()
  })

  it('calls onReservar when button is clicked', () => {
    const onReservar = vi.fn()
    render(<FooterReserva onReservar={onReservar} />)
    fireEvent.click(screen.getByRole('button', { name: /Reservar plaza/ }))
    expect(onReservar).toHaveBeenCalledOnce()
  })

  it('renders as a footer landmark', () => {
    render(<FooterReserva />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
