import  {useEffect, useState, useRef} from 'react'
import logo from "/logo/TAT_web_01.svg"
import "./styles.sass"

const Header = () => {
  const [yPos, setYPos] = useState(0)
  const elementRef = useRef(null)

  const [toggleMenu, setToggleMenu] = useState(false)

    // menu - hide on scroll fx
  useEffect(() => {
    const handleScroll = () => {
      
      if(elementRef.current.getBoundingClientRect().y > -170) {
        setYPos(-window.scrollY)
        if(elementRef.current.getBoundingClientRect().y < 170) {
          setYPos(-175)
      }
      } if(window.scrollY < 175) {
        setYPos(-window.scrollY)
      } 
    }
    
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const headerStyle = {
    transform: `translateY(${yPos}px)`
  }
  const burgerStyle = {
    transform: `translateY(${-yPos}px)`
  }

  // burger menu (mobile)
  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu)
  }

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    
    targetElement.scrollIntoView({ 
        behavior: "smooth"
    })
    
    handleMenuToggle()
  }

  return (
    <nav className='header' style={headerStyle} ref={elementRef}>
      <div className='header_logo'>
        <img src={logo} className='header_logo_img' alt="Atelier tour à tour logo" />
      </div>
      <div className={`burger ${toggleMenu ? "active" : null}`} style={burgerStyle} onClick={handleMenuToggle}>
        <div className='burger_line line_1'></div>
        <div className='burger_line line_2'></div>
        <div className='burger_line line_3'></div>
      </div>
      <ul className={`header_nav ${toggleMenu ? "show" : null}`}>
        <li><a onClick={(e) => handleNavClick(e, 'main')}>Accueil</a></li>
        <li><a onClick={(e) => handleNavClick(e, 'meTrouver')}>Où me trouver</a></li>
        <li><a onClick={(e) => handleNavClick(e, 'tarifs')}>Tarifs</a></li>
        <li><a onClick={(e) => handleNavClick(e, 'galerie')}>Galerie</a></li>
        <li><a onClick={(e) => handleNavClick(e, 'partenaires')}>Partenaires</a></li>
      </ul>
    </nav>
  )
}

export default Header
