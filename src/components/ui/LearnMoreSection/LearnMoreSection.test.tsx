import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LearnMoreSection from './LearnMoreSection'

describe('LearnMoreSection', () => {
  it('renders the heading', () => {
    render(<LearnMoreSection />)
    expect(screen.getByRole('heading', { name: 'Saber más' })).toBeInTheDocument()
  })

  it('renders the cabra montesa card', () => {
    render(<LearnMoreSection />)
    expect(
      screen.getByRole('article', { name: 'La cabra montesa' }),
    ).toBeInTheDocument()
  })

  it('renders the ruta profile card', () => {
    render(<LearnMoreSection />)
    expect(
      screen.getByRole('article', { name: 'Perfil de la ruta' }),
    ).toBeInTheDocument()
  })

  it('renders card titles', () => {
    render(<LearnMoreSection />)
    expect(screen.getByText('La cabra montesa')).toBeInTheDocument()
    expect(screen.getByText('Perfil de la ruta')).toBeInTheDocument()
  })

  it('renders profile data items', () => {
    render(<LearnMoreSection />)
    expect(screen.getByText('Cota Máxima:')).toBeInTheDocument()
    expect(screen.getByText('Desnivel Máximo:')).toBeInTheDocument()
    expect(screen.getByText('Cota Mínima:')).toBeInTheDocument()
  })

  it('renders metric values', () => {
    render(<LearnMoreSection />)
    expect(screen.getByText('2068 m')).toBeInTheDocument()
    expect(screen.getByText('1226 m')).toBeInTheDocument()
    expect(screen.getByText('842 m')).toBeInTheDocument()
  })

  it('renders card images', () => {
    render(<LearnMoreSection />)
    expect(screen.getByAltText('Cabra montesa en la sierra')).toBeInTheDocument()
    expect(screen.getByAltText('Perfil topográfico de la ruta')).toBeInTheDocument()
  })
})
