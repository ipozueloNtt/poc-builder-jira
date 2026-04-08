import { useState } from 'react'
import styles from './ReviewSection.module.scss'

const TOTAL_STARS = 5

export default function ReviewSection() {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)

  return (
    <section
      className={styles.section}
      aria-labelledby="reviews-heading"
    >
      <h2 id="reviews-heading" className={styles.heading}>
        Reseñas
      </h2>

      {/* Summary rating badge */}
      <div className={styles.ratingBadge}>
        <img
          src="/icons/star-sm-active.svg"
          alt="Valoración"
          width={12}
          height={12}
        />
        <div className={styles.ratingScore}>
          <strong>4,1</strong> (47)
        </div>
      </div>

      {/* User rating */}
      <div className={styles.userRating}>
        <p className={styles.userRatingLabel} id="rating-label">
          Aún no has puntuado este sendero
        </p>
        <div
          className={styles.stars}
          role="group"
          aria-labelledby="rating-label"
        >
          {Array.from({ length: TOTAL_STARS }, (_, i) => {
            const starVal = i + 1
            const isFilled = starVal <= (hovered || selected)
            return (
              <button
                key={i}
                className={styles.starBtn}
                aria-label={`Valorar con ${starVal} estrellas`}
                aria-pressed={selected === starVal}
                onMouseEnter={() => setHovered(starVal)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setSelected(starVal)}
              >
                <img
                  src={isFilled ? '/icons/star-active.svg' : '/icons/star-inactive.svg'}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                />
              </button>
            )
          })}
        </div>
      </div>

      <hr className={styles.divider} aria-hidden="true" />
    </section>
  )
}
