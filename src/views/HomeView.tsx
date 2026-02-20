import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import { useABTest } from '../hooks/useABTest'

export default function HomeView() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const { variant, trackEvent } = useABTest({
    testName: 'button-cta-test',
    variantBPercentage: 50,
  })

  const handleClick = () => {
    setCount((count) => count + 1)
    trackEvent('button_clicked', { count: count + 1 })
  }

  const variantConfig = {
    A: {
      title: 'Vite + React',
      buttonText: `count is ${count}`,
      buttonClass: 'button-variant-a',
      description: 'Edit src/App.tsx and save to test HMR',
    },
    B: {
      title: '🚀 Vite + React - Versión Mejorada',
      buttonText: `¡Has clickeado ${count} veces!`,
      buttonClass: 'button-variant-b',
      description: '✨ Edita src/App.tsx y guarda para ver los cambios al instante',
    },
  }

  const config = variantConfig[variant]

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>{config.title}</h1>

      <div className="ab-test-indicator">
        Estás viendo la <strong>Variante {variant}</strong>
      </div>

      <div className="card">
        <button className={config.buttonClass} onClick={handleClick}>
          {config.buttonText}
        </button>
        <p>{config.description}</p>
      </div>

      <button className="pokemon-nav-btn" onClick={() => navigate('/pokedex')}>
        <span className="pokemon-nav-ball">⬤</span>
        Ver Pokédex
      </button>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}
