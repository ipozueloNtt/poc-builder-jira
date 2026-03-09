import './HomeView.css'

export default function HomeView() {
  return (
    <div className="home-container">
      <img
        src="https://www.builder.io/m/design-systems/logo"
        alt="Builder.io"
        className="logo-left"
      />
      <h1 className="home-title">Pildora Builder.io</h1>
      <img
        src="https://www.nttdata.com/content/dam/nttdata-logo/logo.svg"
        alt="NTT Data"
        className="logo-right"
      />
    </div>
  )
}
