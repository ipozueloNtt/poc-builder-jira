import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComoLlegarTab from './ComoLlegarTab'

describe('ComoLlegarTab', () => {
  it('renders the heading', () => {
    render(<ComoLlegarTab />)
    expect(screen.getByRole('heading', { name: 'Cómo llegar', level: 2 })).toBeInTheDocument()
  })

  it('renders the car section', () => {
    render(<ComoLlegarTab />)
    expect(screen.getByRole('heading', { name: 'En coche', level: 3 })).toBeInTheDocument()
  })

  it('renders the public transport section', () => {
    render(<ComoLlegarTab />)
    expect(
      screen.getByRole('heading', { name: 'En transporte público', level: 3 }),
    ).toBeInTheDocument()
  })

  it('renders the GPS section', () => {
    render(<ComoLlegarTab />)
    expect(
      screen.getByRole('heading', { name: 'Coordenadas GPS', level: 3 }),
    ).toBeInTheDocument()
  })

  it('renders directions text with A-483 road', () => {
    render(<ComoLlegarTab />)
    expect(screen.getByText(/A-483/, { selector: 'p' })).toBeInTheDocument()
  })

  it('renders GPS coordinates', () => {
    render(<ComoLlegarTab />)
    expect(screen.getByText(/37°04′59″N/)).toBeInTheDocument()
  })
})
