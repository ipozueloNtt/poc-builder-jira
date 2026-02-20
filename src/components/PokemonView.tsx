import { useState, useEffect } from 'react'
import './PokemonView.css'

interface Pokemon {
  name: string
  url: string
  id: number
  sprite: string
  types: string[]
}

interface PokemonApiEntry {
  name: string
  url: string
}

interface PokemonDetail {
  id: number
  sprites: { front_default: string }
  types: { type: { name: string } }[]
}

const TYPE_COLORS: Record<string, string> = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  normal: '#A8A878',
}

interface PokemonViewProps {
  onBack: () => void
}

export default function PokemonView({ onBack }: PokemonViewProps) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        const data = await res.json()

        const details = await Promise.all(
          data.results.map(async (entry: PokemonApiEntry) => {
            const detailRes = await fetch(entry.url)
            const detail: PokemonDetail = await detailRes.json()
            return {
              name: entry.name,
              url: entry.url,
              id: detail.id,
              sprite: detail.sprites.front_default,
              types: detail.types.map((t) => t.type.name),
            }
          })
        )

        setPokemonList(details)
      } catch {
        setError('Failed to load Pokémon. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  const formatId = (id: number) => `#${String(id).padStart(3, '0')}`

  if (loading) {
    return (
      <div className="pokemon-loading-screen">
        <div className="pokeball-loader">
          <div className="pokeball-top" />
          <div className="pokeball-center">
            <div className="pokeball-button" />
          </div>
          <div className="pokeball-bottom" />
        </div>
        <p className="pokemon-loading-text">Catching Pokémon...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pokemon-error-screen">
        <span className="pokemon-error-icon">⚠️</span>
        <p className="pokemon-error-message">{error}</p>
        <button className="back-btn" onClick={onBack}>Go Back</button>
      </div>
    )
  }

  return (
    <div className="pokemon-view">
      <header className="pokemon-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1 className="pokemon-title">Pokédex</h1>
        <span className="pokemon-count">{pokemonList.length} Pokémon</span>
      </header>

      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            style={{ '--type-color': TYPE_COLORS[pokemon.types[0]] || '#A8A878' } as React.CSSProperties}
          >
            <div className="pokemon-card-bg" />
            <span className="pokemon-number">{formatId(pokemon.id)}</span>
            <img
              className="pokemon-sprite"
              src={pokemon.sprite}
              alt={pokemon.name}
              loading="lazy"
            />
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="type-badge"
                  style={{ backgroundColor: TYPE_COLORS[type] || '#A8A878' }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
