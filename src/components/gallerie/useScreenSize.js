import { useState, useEffect } from 'react'

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isSmall: window.innerWidth <= 450,
    isMedium: window.innerWidth > 450 && window.innerWidth <= 768,
    isLarge: window.innerWidth > 768
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isSmall: window.innerWidth <= 450,
        isMedium: window.innerWidth > 450 && window.innerWidth <= 768,
        isLarge: window.innerWidth > 768
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}

export default useScreenSize