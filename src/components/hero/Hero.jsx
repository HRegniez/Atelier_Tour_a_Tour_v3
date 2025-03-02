import React from 'react'
import './styles.sass'
import backgroundImg from '/images/hero_bg.webp'

const Hero = () => {


  return (
    <article id="main" className='hero'>
      <img src={backgroundImg} alt="Rémouleur en action" />
      <div className='hero_intro'>
        <h1>Atelier tour <span>à</span> tour</h1>
        <h2>affûtage, rémoulage et tournage sur bois</h2>
      </div>
      <div className='hero_details'>
        <section>
          <h3>
            Affûteur rémouleur mobile
          </h3>
          <p>
            Diplomé de l'Ecole Nationale d'Affûtage et de Rémoulage votre artisan vous propose un affûtage professionnel sur les marchés ou directement à domicile.
          </p>
        </section>
        <aside>
          <h3>
            Tournage sur bois
          </h3>
            Atelier tour à tour vous propose aussi des creations d'objets en bois. Ils sont produits avec des bois locaux ou avec des chutes récuperées chez des ébenistes du coin.
        </aside>  
      </div>
      
      <div className='hero_background' ></div>
      <div className='hero_gradient'></div>
    </article>
  )
}

export default Hero
