import PropTypes from 'prop-types'

const Prices = ({tarif}) => {
    
  return (
    <article className='tarifs_box'>
        <h3>{tarif.name}</h3>
        {
            tarif.prices.map((item) =>
            <div className='item' key={item.name}><h4>{item.name} </h4><span>{item.price}</span></div>
            )
        }
    </article>
  )
}

Prices.propTypes = {
  tarif: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
}

export default Prices
