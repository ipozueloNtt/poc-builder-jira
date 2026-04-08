import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrailInfoCard from './TrailInfoCard'

describe('TrailInfoCard', () => {
  it('renders the trail name as a heading', () => {
    render(<TrailInfoCard />)
    expect(
      screen.getByRole('heading', { name: 'Laguna del Acebuche' }),
    ).toBeInTheDocument()
  })

  it('renders the location text', () => {
    render(<TrailInfoCard />)
    expect(
      screen.getByText('Espacio Natural de Doñana, Almonte, Huelva'),
    ).toBeInTheDocument()
  })

  it('renders the distance info', () => {
    render(<TrailInfoCard />)
    expect(screen.getByText(/2,1 km/)).toBeInTheDocument()
  })

  it('renders difficulty tag', () => {
    render(<TrailInfoCard />)
    expect(screen.getByText('MEDIA')).toBeInTheDocument()
  })

  it('renders type tag', () => {
    render(<TrailInfoCard />)
    expect(screen.getByText('LINEAL')).toBeInTheDocument()
  })

  it('renders the rating score', () => {
    render(<TrailInfoCard />)
    expect(screen.getByText('4,1')).toBeInTheDocument()
  })

  it('renders accessible label', () => {
    render(<TrailInfoCard />)
    expect(screen.getByText('Accesible', { selector: 'span' })).toBeInTheDocument()
  })

  it('shows completed check with aria-label', () => {
    render(<TrailInfoCard />)
    expect(screen.getByRole('img', { name: 'Ruta completada' })).toBeInTheDocument()
  })

  it('renders the article with accessible label', () => {
    render(<TrailInfoCard />)
    expect(
      screen.getByRole('article', {
        name: 'Información de la ruta Laguna del Acebuche',
      }),
    ).toBeInTheDocument()
  })
})
