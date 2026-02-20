import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView'
import PokemonView from './views/PokemonView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/pokedex" element={<PokemonView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
