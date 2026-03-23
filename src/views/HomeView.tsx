import './HomeView.css'

export default function HomeView() {
  return (
    <div className="home-container">
      <img
        src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/786927/Screenshot_2023-06-07_at_3.00.51_PM.png"
        alt="Builder.io"
        className="logo-left"
      />
      <h1 className="home-title">Pildora Builder.io</h1>
      <img
        src="https://www.drupal.org/files/styles/grid-4-2x/public/Logo%20Global%20NTT%20DATA%20Future%20Blue%20RGB.png?itok=J9FK9FNw"
        alt="NTT Data"
        className="logo-right"
      />
    </div>
  )
}
