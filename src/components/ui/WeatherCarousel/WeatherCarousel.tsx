import { useRef, useState, useEffect, useCallback } from 'react'
import WeatherCard from '../WeatherCard/WeatherCard'
import type { WeatherCardProps } from '../WeatherCard/WeatherCard'
import styles from './WeatherCarousel.module.scss'

const WEATHER_DATA: WeatherCardProps[] = [
  { day: 'Lun', date: 28, type: 'calima', label: 'Calima',  tempHigh: '23º', tempLow: '15º' },
  { day: 'Mar', date: 29, type: 'sol',    label: 'Sol',     tempHigh: '26º', tempLow: '17º' },
  { day: 'Mar', date: 30, type: 'nuboso', label: 'Nuboso',  tempHigh: '21º', tempLow: '14º' },
  { day: 'Mié', date: 31, type: 'lluvia', label: 'Lluvia',  tempHigh: '18º', tempLow: '12º' },
  { day: 'Jue', date:  1, type: 'sol',    label: 'Sol',     tempHigh: '25º', tempLow: '16º' },
  { day: 'Vie', date:  2, type: 'calima', label: 'Calima',  tempHigh: '24º', tempLow: '15º' },
  { day: 'Sáb', date:  3, type: 'nuboso', label: 'Nuboso',  tempHigh: '20º', tempLow: '13º' },
]

const GAP = 8

function getCardsPerSlide(): number {
  return window.innerWidth >= 1024 ? 4 : 2
}

function getTotalSlides(): number {
  return Math.ceil(WEATHER_DATA.length / getCardsPerSlide())
}

export default function WeatherCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(getTotalSlides)
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollToSlide = useCallback((slideIndex: number) => {
    if (!trackRef.current) return
    const firstCard = trackRef.current.children[0] as HTMLElement | null
    if (!firstCard) return
    const cardWidth = firstCard.getBoundingClientRect().width
    const cardsPerSlide = getCardsPerSlide()
    const offset = slideIndex * cardsPerSlide * (cardWidth + GAP)
    trackRef.current.style.transform = `translateX(-${offset}px)`
    setCurrentSlide(slideIndex)
  }, [])

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0)
      setSlideCount(getTotalSlides())
      if (trackRef.current) {
        trackRef.current.style.transform = 'translateX(0)'
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      className={styles.section}
      aria-labelledby="weather-heading"
    >
      <h2 id="weather-heading" className={styles.heading}>
        Previsión del tiempo
      </h2>

      <div
        className={styles.carouselWrapper}
        aria-label="Carrusel de previsión del tiempo"
        role="region"
        aria-live="polite"
      >
        <div className={styles.track} ref={trackRef}>
          {WEATHER_DATA.map((card) => (
            <div key={`${card.day}-${card.date}`} className={styles.cardSlot}>
              <WeatherCard {...card} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div
        className={styles.dots}
        role="group"
        aria-label="Diapositivas de previsión del tiempo"
      >
        {Array.from({ length: slideCount }, (_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`}
            aria-label={`Diapositiva ${i + 1} de ${slideCount}`}
            aria-pressed={i === currentSlide}
            onClick={() => scrollToSlide(i)}
          />
        ))}
      </div>

      <hr className={styles.divider} aria-hidden="true" />
    </section>
  )
}
