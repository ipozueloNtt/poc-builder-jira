import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TrailDetailView from './TrailDetailView'

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <TrailDetailView />
    </MemoryRouter>,
  )
}

describe('TrailDetailView', () => {
  it('renders the hero image', () => {
    renderWithRouter()
    expect(
      screen.getByAltText('Vista aérea de la Laguna del Acebuche, Doñana'),
    ).toBeInTheDocument()
  })

  it('renders the back button', () => {
    renderWithRouter()
    expect(
      screen.getByRole('button', { name: 'Volver atrás' }),
    ).toBeInTheDocument()
  })

  it('renders the trail info card', () => {
    renderWithRouter()
    expect(screen.getByText('Laguna del Acebuche')).toBeInTheDocument()
  })

  it('renders all tabs', () => {
    renderWithRouter()
    expect(screen.getByRole('tab', { name: 'General' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Servicios' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Cómo llegar' })).toBeInTheDocument()
  })

  it('shows General content by default', () => {
    renderWithRouter()
    expect(screen.getByRole('heading', { name: 'Descripción' })).toBeInTheDocument()
  })

  it('switches to Servicios tab on click', () => {
    renderWithRouter()
    fireEvent.click(screen.getByRole('tab', { name: 'Servicios' }))
    expect(
      screen.getByRole('heading', { name: 'Servicios disponibles' }),
    ).toBeInTheDocument()
  })

  it('switches to Cómo llegar tab on click', () => {
    renderWithRouter()
    fireEvent.click(screen.getByRole('tab', { name: 'Cómo llegar' }))
    expect(
      screen.getByRole('heading', { name: 'Cómo llegar', level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText(/A-483/, { selector: 'p' })).toBeInTheDocument()
  })

  it('renders the footer with Reservar button', () => {
    renderWithRouter()
    expect(
      screen.getByRole('button', { name: /Reservar plaza/ }),
    ).toBeInTheDocument()
  })
})
