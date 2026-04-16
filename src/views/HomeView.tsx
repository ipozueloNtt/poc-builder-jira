import { useEffect, useRef, useState } from 'react'
import './HomeView.css'

export default function HomeView() {
  const buttonRef = useRef<HTMLElement | null>(null)
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const buttonEl = buttonRef.current
    if (!buttonEl) {
      return
    }

    const onAthClick = () => setClicks(prev => prev + 1)
    buttonEl.addEventListener('athClick', onAthClick as EventListener)

    return () => {
      buttonEl.removeEventListener('athClick', onAthClick as EventListener)
    }
  }, [])

  return (
    <div className="home-container">
      <img
        src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/786927/Screenshot_2023-06-07_at_3.00.51_PM.png"
        alt="Builder.io"
        className="logo-left"
      />
      <div className="home-content">
        <h1 className="home-title">Pildora Builder.io</h1>
        <div className="demo-box">
          <ath-button ref={buttonRef} color="primary" size="md">
            Boton Aletheia
          </ath-button>
          <p className="click-counter">Clicks recibidos desde athClick: {clicks}</p>
        </div>
      </div>
      <img
        src="https://www.drupal.org/files/styles/grid-4-2x/public/Logo%20Global%20NTT%20DATA%20Future%20Blue%20RGB.png?itok=J9FK9FNw"
        alt="NTT Data"
        className="logo-right"
      />
    </div>
  )
}
