import styles from './ComoLlegarTab.module.scss'

export default function ComoLlegarTab() {
  return (
    <section className={styles.section} aria-labelledby="como-llegar-heading">
      <h2 id="como-llegar-heading" className={styles.heading}>Cómo llegar</h2>

      <div className={styles.blocks}>
        {/* By car */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <span className={styles.blockIcon} aria-hidden="true">🚗</span>
            <h3 className={styles.blockTitle}>En coche</h3>
          </div>
          <p className={styles.blockText}>
            Desde Almonte: Tomar la A-483 dirección El Rocío. A 2 km antes de El Rocío,
            girar a la derecha por la carretera A-483a hacia Matalascañas. El
            aparcamiento se encuentra a 500 m a la derecha.
          </p>
        </div>

        {/* By public transport */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <span className={styles.blockIcon} aria-hidden="true">🚌</span>
            <h3 className={styles.blockTitle}>En transporte público</h3>
          </div>
          <p className={styles.blockText}>
            Autobús: Línea Almonte – Matalascañas (DAMAS). Parada: Acebuche. Consulta
            los horarios actualizados en la web de DAMAS.
          </p>
        </div>

        {/* GPS */}
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <span className={styles.blockIcon} aria-hidden="true">📍</span>
            <h3 className={styles.blockTitle}>Coordenadas GPS</h3>
          </div>
          <p className={styles.blockText}>
            37°04′59″N&nbsp;&nbsp;6°31′20″O
          </p>
          <p className={styles.blockNote}>
            Introduce estas coordenadas en tu GPS o aplicación de navegación para
            llegar directamente al punto de inicio de la ruta.
          </p>
        </div>
      </div>
    </section>
  )
}
