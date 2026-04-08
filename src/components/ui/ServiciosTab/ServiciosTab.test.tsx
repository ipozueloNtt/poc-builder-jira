import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ServiciosTab from './ServiciosTab'

describe('ServiciosTab', () => {
  it('renders the heading', () => {
    render(<ServiciosTab />)
    expect(
      screen.getByRole('heading', { name: 'Servicios disponibles' }),
    ).toBeInTheDocument()
  })

  it('renders the services list', () => {
    render(<ServiciosTab />)
    expect(screen.getByRole('list', { name: 'Lista de servicios' })).toBeInTheDocument()
  })

  it('renders 6 service items', () => {
    render(<ServiciosTab />)
    expect(screen.getAllByRole('listitem').length).toBe(6)
  })

  it('renders parking service', () => {
    render(<ServiciosTab />)
    expect(screen.getByText('Aparcamiento')).toBeInTheDocument()
  })

  it('renders visitor center service', () => {
    render(<ServiciosTab />)
    expect(screen.getByText('Centro de visitantes')).toBeInTheDocument()
  })

  it('renders water fountain service', () => {
    render(<ServiciosTab />)
    expect(screen.getByText('Fuente de agua')).toBeInTheDocument()
  })
})
