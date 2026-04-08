import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MapSection from './MapSection'

describe('MapSection', () => {
  it('renders the section heading', () => {
    render(<MapSection />)
    expect(screen.getByRole('heading', { name: 'Puntos de interés' })).toBeInTheDocument()
  })

  it('renders the PDF download button', () => {
    render(<MapSection />)
    expect(screen.getByRole('button', { name: 'Descargar PDF' })).toBeInTheDocument()
  })

  it('renders the map image region', () => {
    render(<MapSection />)
    expect(
      screen.getByRole('img', { name: /Mapa de la ruta/ }),
    ).toBeInTheDocument()
  })

  it('renders all 4 points of interest', () => {
    render(<MapSection />)
    expect(screen.getByText('Calamón común')).toBeInTheDocument()
    expect(screen.getByText('Cascada de la higuera')).toBeInTheDocument()
    expect(screen.getByText('Molino de la encina')).toBeInTheDocument()
    expect(screen.getByText('Casona del molino')).toBeInTheDocument()
  })

  it('renders "Ver detalle" buttons for each POI', () => {
    render(<MapSection />)
    const detailBtns = screen.getAllByRole('button', { name: /Ver detalle/ })
    expect(detailBtns).toHaveLength(4)
  })

  it('renders distances for each POI', () => {
    render(<MapSection />)
    expect(screen.getByText(/2.5 km del inicio/)).toBeInTheDocument()
    expect(screen.getByText(/10.8 km del inicio/)).toBeInTheDocument()
  })
})
