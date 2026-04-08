import styles from './TrailInfoCard.module.scss'

export default function TrailInfoCard() {
  return (
    <article className={styles.card} aria-label="Información de la ruta Laguna del Acebuche">
      {/* Title + completed check */}
      <div className={styles.titleRow}>
        <h1 className={styles.title}>Laguna del Acebuche</h1>
        <div
          className={styles.completedCheck}
          role="img"
          aria-label="Ruta completada"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={styles.checkBorder}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.077 3.538A1.538 1.538 0 0 0 3.538 5.077v13.846a1.538 1.538 0 0 0 1.539 1.539h13.846a1.538 1.538 0 0 0 1.539-1.539V5.077a1.538 1.538 0 0 0-1.539-1.539H5.077ZM2 5.077A3.077 3.077 0 0 1 5.077 2h13.846A3.077 3.077 0 0 1 22 5.077v13.846A3.077 3.077 0 0 1 18.923 22H5.077A3.077 3.077 0 0 1 2 18.923V5.077Z"
              fill="#087021"
            />
          </svg>
          <div className={styles.checkInner} aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.33 3.624a.75.75 0 0 1 .046 1.059l-7 8a.75.75 0 0 1-1.084.046l-3-3a.75.75 0 0 1 1.06-1.06l2.622 2.622 6.297-7.12a.75.75 0 0 1 1.059-.047Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Location */}
      <p className={styles.location}>
        Espacio Natural de Doñana, Almonte, Huelva
      </p>

      {/* Distance / time + tags */}
      <div className={styles.metaRow}>
        <span className={styles.metaText}>2,1 km&nbsp;&nbsp;|&nbsp;&nbsp;1h&nbsp;&nbsp;·&nbsp;&nbsp;A 30 km de tí</span>
        <div className={styles.tags}>
          <span className={styles.tagMedia} aria-label="Dificultad media">MEDIA</span>
          <span className={styles.tagLineal} aria-label="Ruta lineal">
            <img src="/icons/transfer.svg" alt="" aria-hidden="true" width={16} height={16} />
            LINEAL
          </span>
        </div>
      </div>

      {/* Rating + accessibility */}
      <div className={styles.ratingRow}>
        <div className={styles.rating}>
          <img
            src="/icons/star-sm-active.svg"
            alt="Valoración"
            width={12}
            height={12}
            className={styles.starIcon}
          />
          <span className={styles.ratingText}>
            <strong>4,1</strong>{' '}(47)
          </span>
        </div>
        <span className={styles.separator} aria-hidden="true">|</span>
        <div className={styles.accessible}>
          <img
            src="/icons/wheelchair.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
          />
          <span>Accesible</span>
        </div>
      </div>
    </article>
  )
}
