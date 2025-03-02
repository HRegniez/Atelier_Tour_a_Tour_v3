import { Header, Hero, OuMeTrouver, Tarifs, Partenaires, Footer } from "../components"
import Gallerie from "../components/gallerie/Gallerie"

export default function Home() {
  return (
    <div>
          <div className="contain">
      <header>
        <Header />
      </header>

      <main>
        <Hero />
        <OuMeTrouver />
        <Tarifs />
        <div className="wood wood_contain">
          <div className="wood_background"></div>
          <Gallerie />
          <Partenaires />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
    </div>
  )
}


