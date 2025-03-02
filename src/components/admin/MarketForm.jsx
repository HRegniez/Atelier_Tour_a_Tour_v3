import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSupabase } from '../../hooks/useSupabase'
import PropTypes from 'prop-types'
import './styles.sass'

const MarketForm = ({ onSuccess }) => {
  const [markets, setMarkets] = useState([])
  const supabase = useSupabase()

  useEffect(() => {
    const fetchMarkets = async () => {
      const { data, error } = await supabase.getMarchesLocaux()
      if (!error) {
        setMarkets(data)
      }
    }
    fetchMarkets()
  }, [])

  const handleInputChange = (id, field, value) => {
    setMarkets(prevMarkets => 
      prevMarkets.map(market => 
        market.id === id ? { ...market, [field]: value } : market
      )
    )
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const newMarkets = [...markets]
    ;[newMarkets[index], newMarkets[index - 1]] = [newMarkets[index - 1], newMarkets[index]]
    setMarkets(newMarkets)
  }

  const handleMoveDown = (index) => {
    if (index === markets.length - 1) return
    const newMarkets = [...markets]
    ;[newMarkets[index], newMarkets[index + 1]] = [newMarkets[index + 1], newMarkets[index]]
    setMarkets(newMarkets)
  }

  const handleDelete = (id) => {
    setMarkets(prevMarkets => prevMarkets.filter(market => market.id !== id))
  }

  const handleAddNew = () => {
    const newMarket = {
      id: `temp-${Date.now()}`,
      adresse: '',
      dates: '',
      next_dates: '',
      maps_link: ''
    }
    setMarkets(prevMarkets => [...prevMarkets, newMarket])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const { data, error } = await supabase.updateMarchesLocaux(markets)
      if (error) {
        alert('Erreur lors de la sauvegarde des marchés')
        console.error('Error saving markets:', error)
        return
      }
      alert('Marchés sauvegardés avec succès')
      setMarkets(data)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde des marchés')
      console.error('Error saving markets:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="market-form">
      {markets.map((market, index) => (
        <div key={market.id} className="market-form__item">
          <div className="market-form__controls">
            <button 
              type="button" 
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <button 
              type="button" 
              onClick={() => handleMoveDown(index)}
              disabled={index === markets.length - 1}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <button 
              type="button" 
              onClick={() => handleDelete(market.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          <div className="market-form__fields">
            <div>
              <label htmlFor={`adresse-${market.id}`}>Adresse:</label>
              <input
                id={`adresse-${market.id}`}
                type="text"
                value={market.adresse}
                onChange={(e) => handleInputChange(market.id, 'adresse', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`dates-${market.id}`}>Dates:</label>
              <input
                id={`dates-${market.id}`}
                type="text"
                value={market.dates}
                onChange={(e) => handleInputChange(market.id, 'dates', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`next-dates-${market.id}`}>Prochaines dates:</label>
              <input
                id={`next-dates-${market.id}`}
                type="text"
                value={market.next_dates}
                onChange={(e) => handleInputChange(market.id, 'next_dates', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor={`maps-link-${market.id}`}>Lien Google Maps:</label>
              <input
                id={`maps-link-${market.id}`}
                type="text"
                value={market.maps_link}
                onChange={(e) => handleInputChange(market.id, 'maps_link', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="market-form__actions">
        <button type="button" onClick={handleAddNew}>
          <FontAwesomeIcon icon={faPlus} /> Ajouter un marché
        </button>
        <button type="submit">Enregistrer les modifications</button>
      </div>
    </form>
  )
}

MarketForm.propTypes = {
  onSuccess: PropTypes.func
}

MarketForm.defaultProps = {
  onSuccess: () => {}
}

export default MarketForm 