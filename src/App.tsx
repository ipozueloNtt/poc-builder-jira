import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeView from './views/HomeView'
import PokemonView from './views/PokemonView'
import TrailDetailView from './views/TrailDetailView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/pokedex" element={<PokemonView />} />
        <Route path="/sendero/laguna-del-acebuche" element={<TrailDetailView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
