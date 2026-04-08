import styles from './MapSection.module.scss'

const POINTS_OF_INTEREST = [
  { id: 1, name: 'Calamón común',       distance: '2.5 km del inicio' },
  { id: 2, name: 'Cascada de la higuera', distance: '3.7 km del inicio' },
  { id: 3, name: 'Molino de la encina',  distance: '6.4 km del inicio' },
  { id: 4, name: 'Casona del molino',    distance: '10.8 km del inicio' },
]

export default function MapSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="poi-heading"
    >
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <h2 id="poi-heading" className={styles.heading}>
          Puntos de interés
        </h2>
        <button className={styles.pdfBtn}>
          Descargar PDF
        </button>
      </div>

      <div className={styles.mapAndList}>
        {/* Map with SVG overlay */}
        <div
          className={styles.mapContainer}
          role="img"
          aria-label="Mapa de la ruta con puntos de interés numerados"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/837a9e3906684d94fe6163ee04a72c85e159fcad?width=1342"
            alt=""
            className={styles.mapImage}
            aria-hidden="true"
          />
          {/* SVG trail overlay — viewBox matches container logical size */}
          <svg
            className={styles.trailOverlay}
            viewBox="0 0 328 215"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Trail path */}
            <path
              d="M296.335 90.013C252.024 106.246 125.446 189.146 126.481 147.179C127.775 94.721 144.738 60.051 29 120.49"
              stroke="#087021"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Endpoint dots */}
            <circle cx="27" cy="121" r="3.5" fill="white" stroke="#087021" strokeWidth="1" />
            <circle cx="300" cy="89"  r="3.5" fill="white" stroke="#087021" strokeWidth="1" />

            {/* Point 1 */}
            <circle cx="248" cy="113" r="11" fill="white" stroke="#087021" strokeWidth="2" />
            <text x="248" y="118" textAnchor="middle" fill="#087021" fontSize="13" fontWeight="600" fontFamily="Source Sans 3, Source Sans Pro, sans-serif">1</text>

            {/* Point 2 */}
            <circle cx="192" cy="140" r="11" fill="white" stroke="#087021" strokeWidth="2" />
            <text x="192" y="145" textAnchor="middle" fill="#087021" fontSize="13" fontWeight="600" fontFamily="Source Sans 3, Source Sans Pro, sans-serif">2</text>

            {/* Point 3 */}
            <circle cx="128" cy="129" r="11" fill="white" stroke="#087021" strokeWidth="2" />
            <text x="128" y="134" textAnchor="middle" fill="#087021" fontSize="13" fontWeight="600" fontFamily="Source Sans 3, Source Sans Pro, sans-serif">3</text>

            {/* Point 4 */}
            <circle cx="43" cy="112" r="11" fill="white" stroke="#087021" strokeWidth="2" />
            <text x="43" y="117" textAnchor="middle" fill="#087021" fontSize="13" fontWeight="600" fontFamily="Source Sans 3, Source Sans Pro, sans-serif">4</text>
          </svg>
        </div>

        {/* Points of interest list */}
        <ol className={styles.poiList} aria-label="Lista de puntos de interés">
          {POINTS_OF_INTEREST.map((poi, idx) => (
            <li key={poi.id} className={styles.poiItem}>
              <div className={styles.poiLeft}>
                <div className={styles.poiMarker} aria-hidden="true">
                  <div className={styles.markerCircle}>
                    <span className={styles.markerNum}>{poi.id}</span>
                  </div>
                  {idx < POINTS_OF_INTEREST.length - 1 && (
                    <div className={styles.markerLine} aria-hidden="true" />
                  )}
                </div>
                <div className={styles.poiInfo}>
                  <span className={styles.poiName}>{poi.name}</span>
                  <span className={styles.poiDistance}>A {poi.distance}</span>
                </div>
              </div>
              <button
                className={styles.detailBtn}
                aria-label={`Ver detalle de ${poi.name}`}
              >
                Ver detalle
              </button>
            </li>
          ))}
        </ol>
      </div>

      <hr className={styles.divider} aria-hidden="true" />
    </section>
  )
}
