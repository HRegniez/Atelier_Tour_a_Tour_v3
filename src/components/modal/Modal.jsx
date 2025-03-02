import PropTypes from 'prop-types'
import './styles.sass'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={e => e.stopPropagation()}>
        <div className="modal_header">
          <h2>{title}</h2>
          <button className="modal_close" onClick={onClose}>×</button>
        </div>
        <div className="modal_body">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal