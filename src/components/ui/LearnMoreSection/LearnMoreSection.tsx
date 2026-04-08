import styles from './LearnMoreSection.module.scss'

export default function LearnMoreSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="saber-mas-heading"
    >
      <h2 id="saber-mas-heading" className={styles.heading}>
        Saber más
      </h2>

      <div className={styles.cards}>
        {/* Card 1 — La cabra montesa */}
        <article className={styles.card} aria-label="La cabra montesa">
          <div className={styles.cardImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=208&q=80"
              alt="Cabra montesa en la sierra"
              className={styles.cardImage}
              loading="lazy"
            />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>La cabra montesa</h3>
            <p className={styles.cardDesc}>
              Especie endémica ibérica que se localiza de forma natural en las sierras españolas...
            </p>
          </div>
        </article>

        {/* Card 2 — Perfil de la ruta */}
        <article className={styles.card} aria-label="Perfil de la ruta">
          <div className={styles.cardImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=208&q=80"
              alt="Perfil topográfico de la ruta"
              className={styles.cardImage}
              loading="lazy"
            />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>Perfil de la ruta</h3>
            <ul className={styles.profileList}>
              <li className={styles.profileItem}>
                <div className={styles.profileIcon} aria-hidden="true">
                  <img
                    src="/icons/arrow-up-double.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </div>
                <span className={styles.profileKey}>Cota Máxima:</span>
                <span className={styles.profileVal}>2068 m</span>
              </li>
              <li className={styles.profileItem}>
                <div className={styles.profileIcon} aria-hidden="true">
                  <img
                    src="/icons/elevation.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </div>
                <span className={styles.profileKey}>Desnivel Máximo:</span>
                <span className={styles.profileVal}>1226 m</span>
              </li>
              <li className={styles.profileItem}>
                <div className={styles.profileIcon} aria-hidden="true">
                  <img
                    src="/icons/arrow-down-double.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </div>
                <span className={styles.profileKey}>Cota Mínima:</span>
                <span className={styles.profileVal}>842 m</span>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
