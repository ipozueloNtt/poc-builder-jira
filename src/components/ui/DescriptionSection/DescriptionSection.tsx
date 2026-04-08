import { useState } from 'react'
import styles from './DescriptionSection.module.scss'

const SHORT_TEXT =
  'Este trazado, paralelo a la laguna de la que toma su nombre, permite llegar a diferentes observatorios desde los que descubrir a la fauna acuática que frecuenta estas zonas húmedas.'

const EXTRA_PARAGRAPHS = [
  'Es una formación palustre permanente que, tras sufrir un proceso de desecación en los años cincuenta del pasado siglo fue recuperada y reacondicionada para representar diversos ambientes acuáticos y terrestres.',
  'El entorno acoge una gran variedad de aves acuáticas, entre las que destacan flamencos, cigüeñas, espátulas y numerosas especies de patos. Es una de las rutas más emblemáticas del Parque Nacional de Doñana.',
]

export default function DescriptionSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      className={styles.section}
      aria-labelledby="descripcion-heading"
    >
      <h2 id="descripcion-heading" className={styles.heading}>
        Descripción
      </h2>

      <div className={styles.textWrapper}>
        <p className={styles.text}>{SHORT_TEXT}</p>

        {expanded && (
          <div className={styles.extraText}>
            {EXTRA_PARAGRAPHS.map((p) => (
              <p key={p.slice(0, 20)} className={styles.text}>
                {p}
              </p>
            ))}
          </div>
        )}

        <button
          className={styles.toggleBtn}
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Ver menos' : 'Ver descripción completa'}
        </button>
      </div>

      <hr className={styles.divider} aria-hidden="true" />
    </section>
  )
}
