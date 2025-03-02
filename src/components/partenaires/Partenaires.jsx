import React from 'react'
import './styles.sass'
import '../../svg.sass'

const Partenaires = () => {
  return (
    <section id='partenaires' className='partenaires'>
      <div className='partenaires_contain'> 
        <h2>Partenaires</h2>
        <div className='partenaires_flex'>
          <a href="https://www.instagram.com/labo.fl17" target='_blanc'>
            <div>
              <img src="/images/partenaires/Flip17_logo.webp" alt="Flip 17 logo" />
              <h3 className='partenaires_title'>FL17 Lab</h3>
              <h4>Réalisation de tapis en laine sur mesure.</h4>
            </div>
            <p>Laine acrylique, finition en tissu antidérapant. Motifs personnalisés. En création ou à la commande.</p>
          </a>
          <a href="https://www.instagram.com/gypsytattoomarion" target='_blanc'>
            <div>
              <img src="/images/partenaires/Gypsytattoo_logo.svg" alt="Gypsy tattoo logo" />
              <h3 className='partenaires_title'>Gypsy Tattoo</h3>
              <h4>Tatoueuse</h4>
            </div>
            <p>Salon privé Bordeaux Caudéran </p>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Partenaires
