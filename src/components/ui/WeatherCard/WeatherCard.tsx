import styles from './WeatherCard.module.scss'

export type WeatherType = 'calima' | 'sol' | 'nuboso' | 'lluvia'

export interface WeatherCardProps {
  day: string
  date: number
  type: WeatherType
  label: string
  tempHigh: string
  tempLow: string
}

const iconMap: Record<WeatherType, string> = {
  calima: '/icons/calima.svg',
  sol: '/icons/sol.svg',
  nuboso: '/icons/nuboso.svg',
  lluvia: '/icons/lluvia.svg',
}

const colorClassMap: Record<WeatherType, string> = {
  calima: styles.cardCalima,
  sol: styles.cardSol,
  nuboso: styles.cardNuboso,
  lluvia: styles.cardLluvia,
}

const textClassMap: Record<WeatherType, string> = {
  calima: styles.textLight,
  sol: styles.textDark,
  nuboso: styles.textLight,
  lluvia: styles.textLight,
}

export default function WeatherCard({
  day,
  date,
  type,
  label,
  tempHigh,
  tempLow,
}: WeatherCardProps) {
  const colorClass = colorClassMap[type]
  const textClass = textClassMap[type]

  return (
    <article
      className={`${styles.card} ${colorClass}`}
      aria-label={`${day} ${date}: ${label}, ${tempHigh} / ${tempLow}`}
    >
      <div className={styles.content}>
        <div className={styles.dateBlock}>
          <span className={`${styles.dayLabel} ${textClass}`}>{day}</span>
          <span className={`${styles.dateNum} ${textClass}`}>{date}</span>
        </div>
        <div className={styles.weatherBlock}>
          <span className={`${styles.weatherLabel} ${textClass}`}>{label}</span>
          <span className={`${styles.tempLabel} ${textClass}`}>
            {tempHigh} / {tempLow}
          </span>
        </div>
      </div>
      <div className={styles.iconWrapper} aria-hidden="true">
        <div className={styles.iconBg} />
        <img
          src={iconMap[type]}
          alt=""
          width={32}
          height={32}
          className={styles.icon}
        />
      </div>
    </article>
  )
}
