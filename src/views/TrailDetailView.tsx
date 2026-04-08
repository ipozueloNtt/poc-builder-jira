import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TrailInfoCard from '../components/ui/TrailInfoCard/TrailInfoCard'
import Tabs from '../components/ui/Tabs/Tabs'
import type { TabItem } from '../components/ui/Tabs/Tabs'
import DescriptionSection from '../components/ui/DescriptionSection/DescriptionSection'
import WeatherCarousel from '../components/ui/WeatherCarousel/WeatherCarousel'
import MapSection from '../components/ui/MapSection/MapSection'
import ReviewSection from '../components/ui/ReviewSection/ReviewSection'
import LearnMoreSection from '../components/ui/LearnMoreSection/LearnMoreSection'
import FooterReserva from '../components/ui/FooterReserva/FooterReserva'
import ServiciosTab from '../components/ui/ServiciosTab/ServiciosTab'
import ComoLlegarTab from '../components/ui/ComoLlegarTab/ComoLlegarTab'
import styles from './TrailDetailView.module.scss'

const TABS: TabItem[] = [
  { id: 'general',     label: 'General' },
  { id: 'servicios',   label: 'Servicios' },
  { id: 'como-llegar', label: 'Cómo llegar' },
]

type ActiveTab = 'general' | 'servicios' | 'como-llegar'

export default function TrailDetailView() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('general')
  const navigate = useNavigate()

  const handleBack = () => navigate(-1)

  return (
    <div className={styles.page}>
      {/* ── Hero image ──────────────────────────────────────── */}
      <section className={styles.hero} aria-label="Imagen de la ruta">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/bde8682b5d0000618c4629a0662a7fbdbddff5b4?width=720"
          alt="Vista aérea de la Laguna del Acebuche, Doñana"
          className={styles.heroImage}
        />

        {/* Status bar spacer + action bar */}
        <div className={styles.heroBar}>
          <button
            className={styles.heroBtn}
            onClick={handleBack}
            aria-label="Volver atrás"
          >
            <img src="/icons/back.svg" alt="" aria-hidden="true" width={24} height={24} />
          </button>

          <div className={styles.heroActions}>
            <button className={styles.heroBtn} aria-label="Compartir ruta">
              <img src="/icons/share.svg" alt="" aria-hidden="true" width={24} height={24} />
            </button>
            <button className={styles.heroBtn} aria-label="Descargar ruta">
              <img src="/icons/download.svg" alt="" aria-hidden="true" width={24} height={24} />
            </button>
            <button className={styles.heroBtn} aria-label="Añadir a favoritos">
              <img src="/icons/heart.svg" alt="" aria-hidden="true" width={24} height={24} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Content area (overlaps hero) ────────────────────── */}
      <div className={styles.contentArea}>
        <TrailInfoCard />

        <nav aria-label="Secciones del sendero">
          <Tabs
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as ActiveTab)}
          />
        </nav>

        {/* Tab panels */}
        <div
          id={`tabpanel-${activeTab}`}
          className={styles.tabPanel}
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTab === 'general' && (
            <div className={styles.generalContent}>
              <DescriptionSection />
              <WeatherCarousel />
              <MapSection />
              <ReviewSection />
              <LearnMoreSection />
            </div>
          )}
          {activeTab === 'servicios' && <ServiciosTab />}
          {activeTab === 'como-llegar' && <ComoLlegarTab />}
        </div>
      </div>

      <FooterReserva />
    </div>
  )
}
