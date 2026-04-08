import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ReviewSection from './ReviewSection'

describe('ReviewSection', () => {
  it('renders the heading', () => {
    render(<ReviewSection />)
    expect(screen.getByRole('heading', { name: 'Reseñas' })).toBeInTheDocument()
  })

  it('renders the rating score', () => {
    render(<ReviewSection />)
    // The strong element has exactly "4,1" as its text
    expect(screen.getByText('4,1', { selector: 'strong' })).toBeInTheDocument()
  })

  it('renders the review count badge', () => {
    render(<ReviewSection />)
    // Badge div contains "4,1 (47)"
    expect(screen.getByText(/\(47\)/)).toBeInTheDocument()
  })

  it('renders the "aún no has puntuado" message', () => {
    render(<ReviewSection />)
    expect(
      screen.getByText('Aún no has puntuado este sendero'),
    ).toBeInTheDocument()
  })

  it('renders 5 star buttons', () => {
    render(<ReviewSection />)
    const stars = screen.getAllByRole('button', { name: /Valorar con/ })
    expect(stars).toHaveLength(5)
  })

  it('star buttons have correct labels', () => {
    render(<ReviewSection />)
    expect(
      screen.getByRole('button', { name: 'Valorar con 1 estrellas' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Valorar con 5 estrellas' }),
    ).toBeInTheDocument()
  })
})
