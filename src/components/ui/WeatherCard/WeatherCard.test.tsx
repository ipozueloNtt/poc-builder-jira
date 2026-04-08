import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WeatherCard from './WeatherCard'

const baseProps = {
  day: 'Lun',
  date: 28,
  type: 'calima' as const,
  label: 'Calima',
  tempHigh: '23º',
  tempLow: '15º',
}

describe('WeatherCard', () => {
  it('renders day label', () => {
    render(<WeatherCard {...baseProps} />)
    expect(screen.getByText('Lun')).toBeInTheDocument()
  })

  it('renders date number', () => {
    render(<WeatherCard {...baseProps} />)
    expect(screen.getByText('28')).toBeInTheDocument()
  })

  it('renders weather label', () => {
    render(<WeatherCard {...baseProps} />)
    expect(screen.getByText('Calima')).toBeInTheDocument()
  })

  it('renders temperatures', () => {
    render(<WeatherCard {...baseProps} />)
    expect(screen.getByText('23º / 15º')).toBeInTheDocument()
  })

  it('has an accessible article label', () => {
    render(<WeatherCard {...baseProps} />)
    expect(
      screen.getByRole('article', { name: /Lun 28: Calima/ }),
    ).toBeInTheDocument()
  })

  it('renders sol type card', () => {
    render(<WeatherCard {...baseProps} day="Mar" date={29} type="sol" label="Sol" />)
    expect(screen.getByText('Sol')).toBeInTheDocument()
  })

  it('renders nuboso type card', () => {
    render(<WeatherCard {...baseProps} day="Mar" date={30} type="nuboso" label="Nuboso" />)
    expect(screen.getByText('Nuboso')).toBeInTheDocument()
  })
})
