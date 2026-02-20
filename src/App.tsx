import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useABTest } from './hooks/useABTest'
import PokemonView from './components/PokemonView'

function App() {
  const [count, setCount] = useState(0)
  const [showPokemon, setShowPokemon] = useState(false)

  // A/B Test para el botón principal
  const { variant, trackEvent } = useABTest({
    testName: 'button-cta-test',
    variantBPercentage: 50 // 50% de usuarios verán la variante B
  })

  const handleClick = () => {
    setCount((count) => count + 1)
    trackEvent('button_clicked', { count: count + 1 })
  }

  // Configuración de variantes
  const variantConfig = {
    A: {
      title: 'Vite + React',
      buttonText: `count is ${count}`,
      buttonClass: 'button-variant-a',
      description: 'Edit src/App.tsx and save to test HMR'
    },
    B: {
      title: '🚀 Vite + React - Versión Mejorada',
      buttonText: `¡Has clickeado ${count} veces!`,
      buttonClass: 'button-variant-b',
      description: '✨ Edita src/App.tsx y guarda para ver los cambios al instante'
    }
  }

  const config = variantConfig[variant]

  if (showPokemon) {
    return <PokemonView onBack={() => setShowPokemon(false)} />
  }

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

      {/* Indicador de variante (solo para demo) */}
      <div className="ab-test-indicator">
        Estás viendo la <strong>Variante {variant}</strong>
      </div>

      <div className="card">
        <button
          className={config.buttonClass}
          onClick={handleClick}
        >
          {config.buttonText}
        </button>
        <p>
          {config.description}
        </p>
      </div>

      <button className="pokemon-nav-btn" onClick={() => setShowPokemon(true)}>
        <span className="pokemon-nav-ball">⬤</span>
        Ver Pokédex
      </button>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
