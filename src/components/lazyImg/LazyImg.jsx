import  { useState } from 'react'
import PropTypes from 'prop-types'

const LazyImage = ({ url, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Create thumbnail URL by adding transformation parameters
  const thumbnailUrl = `${url}?width=50&quality=20`
  const fullImageUrl = `${url}?width=400&quality=75`

  return (
    <div className="lazy-image-container">
      <img 
        src={thumbnailUrl}
        className={`lazy-image-thumbnail ${isLoaded ? 'loaded' : ''}`}
        alt={alt}
        loading="lazy"
      />
      <img
        src={fullImageUrl}
        className={`lazy-image-full ${isLoaded ? 'loaded' : ''}`}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

LazyImage.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}

export default LazyImage
