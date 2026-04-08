import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import WeatherCarousel from './WeatherCarousel'

describe('WeatherCarousel', () => {
  it('renders the section heading', () => {
    render(<WeatherCarousel />)
    expect(
      screen.getByRole('heading', { name: 'Previsión del tiempo' }),
    ).toBeInTheDocument()
  })

  it('renders all 7 weather cards', () => {
    render(<WeatherCarousel />)
    // Each card has an article role
    expect(screen.getAllByRole('article').length).toBe(7)
  })

  it('renders pagination dots', () => {
    render(<WeatherCarousel />)
    const dots = screen.getAllByRole('button', { name: /Diapositiva/ })
    expect(dots.length).toBeGreaterThan(0)
  })

  it('first dot is active initially', () => {
    render(<WeatherCarousel />)
    const dots = screen.getAllByRole('button', { name: /Diapositiva/ })
    expect(dots[0]).toHaveAttribute('aria-pressed', 'true')
  })

  it('changes active dot on click', () => {
    render(<WeatherCarousel />)
    const dots = screen.getAllByRole('button', { name: /Diapositiva/ })
    if (dots.length > 1) {
      fireEvent.click(dots[1])
      expect(dots[1]).toHaveAttribute('aria-pressed', 'true')
    }
  })

  it('has region role with label', () => {
    render(<WeatherCarousel />)
    expect(
      screen.getByRole('region', { name: 'Carrusel de previsión del tiempo' }),
    ).toBeInTheDocument()
  })
})
