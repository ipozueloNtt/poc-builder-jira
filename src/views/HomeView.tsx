import { useNavigate } from 'react-router-dom'
import './HomeView.css'

export default function HomeView() {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <img
        src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/786927/Screenshot_2023-06-07_at_3.00.51_PM.png"
        alt="Builder.io"
        className="logo-left"
      />
      <div className="home-center">
        <h1 className="home-title">Pildora Builder.io</h1>
        <p className="home-subtitle">
          Explora senderos naturales de forma interactiva
        </p>
        <button
          className="home-trail-btn"
          onClick={() => navigate('/sendero/laguna-del-acebuche')}
          aria-label="Ver detalle del sendero Laguna del Acebuche"
        >
          <span className="home-trail-btn__label">🏞️ Laguna del Acebuche</span>
          <span className="home-trail-btn__sub">Espacio Natural de Doñana · Ver sendero</span>
        </button>
      </div>
      <img
        src="https://www.drupal.org/files/styles/grid-4-2x/public/Logo%20Global%20NTT%20DATA%20Future%20Blue%20RGB.png?itok=J9FK9FNw"
        alt="NTT Data"
        className="logo-right"
      />
    </div>
  )
}
