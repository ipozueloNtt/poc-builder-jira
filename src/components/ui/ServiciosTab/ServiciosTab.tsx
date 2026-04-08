import styles from './ServiciosTab.module.scss'

const SERVICIOS = [
  {
    icon: '🚗',
    label: 'Aparcamiento',
    desc: 'Disponible en el acceso principal. Capacidad para 50 vehículos.',
  },
  {
    icon: '🚻',
    label: 'Aseos',
    desc: 'Disponibles en el centro de visitantes (km 0).',
  },
  {
    icon: '💧',
    label: 'Fuente de agua',
    desc: 'Fuente de agua potable en el kilómetro 1,5 de la ruta.',
  },
  {
    icon: '🛖',
    label: 'Zona de descanso',
    desc: 'Merendero con mesas y bancos junto al observatorio principal.',
  },
  {
    icon: '🏛️',
    label: 'Centro de visitantes',
    desc: 'Abierto de 9:00 a 18:00 (temporada alta) y 9:00 a 15:00 (temporada baja).',
  },
  {
    icon: '🛍️',
    label: 'Tienda',
    desc: 'Pequeña tienda de recuerdos en el centro de visitantes.',
  },
]

export default function ServiciosTab() {
  return (
    <section className={styles.section} aria-labelledby="servicios-heading">
      <h2 id="servicios-heading" className={styles.heading}>Servicios disponibles</h2>
      <ul className={styles.list} aria-label="Lista de servicios">
        {SERVICIOS.map((s) => (
          <li key={s.label} className={styles.item}>
            <span className={styles.icon} aria-hidden="true">{s.icon}</span>
            <div className={styles.itemContent}>
              <span className={styles.itemLabel}>{s.label}</span>
              <p className={styles.itemDesc}>{s.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
