import { lazy, Suspense, useState, useEffect } from 'react'
import './styles.sass'
import '../../svg.sass'
import { useSupabase } from '../../hooks/useSupabase'


const LazyImage = lazy(() => import('../lazyImg/LazyImg'))

const Gallerie = () => {
  const [visibleCount, setVisibleCount] = useState(30)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const supabase = useSupabase()

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.getImages()
      if (!error) {
        setImages(data)
      }
    }
    fetchImages()
  }, [])

  const visibleImages = images
    .slice()
    .reverse()
    .slice(0, visibleCount)

  const hasMore = visibleCount < images.length

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 30)
  }

  const handleImageClick = (img) => {
    setSelectedImage(img)
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id='galerie' className='gallerie'>
      <div className='gallerie_gradient'></div>
      <h2>Galerie</h2>
      <div className="gallerie_contain">
        <Suspense fallback={<div>Loading...</div>}>
          {Array.isArray(visibleImages) && visibleImages.map(img => (
            <div 
              className='gallerie_contain_img' 
              key={img.id}
              onClick={() => handleImageClick(img)}
              style={{ cursor: 'pointer' }}
            >
              <LazyImage url={img.url} alt={img.alt} />
            </div>
          ))}
        </Suspense>
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} className="gallerie_load-more">
          Voir plus
        </button>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="gallerie_modal"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.alt}
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              objectFit: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default Gallerie