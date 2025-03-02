import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import Modal from '../components/modal/Modal'
import './styles.sass'
import MarketForm from '../components/admin/MarketForm'

function Admin() {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState(null)

  const supabase = useMemo(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    return createClient(supabaseUrl, supabaseKey)
  }, [])

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        navigate('/keke')
      }
    }

    checkUser()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()

    navigate('/')
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleCloseModal = () => {
    setSelectedCard(null)
  }

  const renderModalContent = (card) => {
    switch (card.id) {
      case 1: // Agenda
        return (
          <div>
            <MarketForm onSuccess={handleCloseModal} />
          </div>
        )
      case 2: // Tarifs
        return (
          <div>
            <p>ça arrive !</p>
            {/* Add your pricing editing form here */}
          </div>
        )
      case 3: // Galerie
        return (
          <div>
            <p>patience !</p>
            {/* Add your gallery management interface here */}
          </div>

        )
      default:
        return <p>Module en développement</p>
    }
  }

  const dashboardCards = [
    {
      id: 1,
      title: 'Agenda',
      description: 'Gérer les dates des marchés',
      icon: '📅'
    },
    {
      id: 2,
      title: 'Tarifs',
      description: 'Modifier les prix des services',
      icon: '💰'
    },
    {
      id: 3,
      title: 'Galerie',
      description: 'Gérer les images de la galerie',
      icon: '🖼️'
    }
  ]

  return (
    <div className="admin">
      <div className="admin_header">
        <h1>Tableau de bord</h1>
        <button onClick={handleLogout} className="admin_logout">Déconnexion</button>
      </div>
      
      <div className="admin_grid">
        {dashboardCards.map(card => (
          <div 
            key={card.id} 
            className="admin_card"
            onClick={() => handleCardClick(card)}
          >
            <div className="admin_card_icon">{card.icon}</div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedCard}
        onClose={handleCloseModal}
        title={selectedCard?.title || ''}
      >
        {selectedCard && renderModalContent(selectedCard)}
      </Modal>
    </div>
  )
}

export default Admin