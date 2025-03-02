import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import './styles.sass'


const Contact = () => {
  return (
    <section className='contact'>
      <h3>Contact</h3>
      <div className='contact_contain'>
        <ul >
          <li><FontAwesomeIcon className='contact_icon icon' icon={faPhone} /> 
            07 75 75 10 88
          </li>
          <li>
            <a className='contact_link' href="mailto:ateliertouratour@gmail.com">
              <FontAwesomeIcon className='contact_icon icon' icon={faEnvelope} /> 
              ateliertouratour@gmail.com
            </a>
          </li>
          <li>
            <a className='contact_link' href="https://www.facebook.com/profile.php?id=61556399373405&locale=fr_FR%2F" target='_blanc'>
              <FontAwesomeIcon className='contact_icon icon' icon={faFacebook} />
              Facebook
            </a>
          </li>
        </ul>
        <div>
          
        </div>
      </div>
    </section>
  )
}

export default Contact
