import styles from './FooterReserva.module.scss'

interface FooterReservaProps {
  onReservar?: () => void
}

export default function FooterReserva({ onReservar }: FooterReservaProps) {
  return (
    <footer className={styles.footer} aria-label="Reserva de la ruta">
      <div className={styles.inner}>
        <p className={styles.note}>
          Para hacer el sendero necesitas reservar antes
        </p>
        <button
          className={styles.reservarBtn}
          onClick={onReservar}
          aria-label="Reservar plaza en la ruta Laguna del Acebuche"
        >
          Reservar
        </button>
      </div>
    </footer>
  )
}
