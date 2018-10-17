import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/fontawesome-free-solid'

import Logo from '../Header/Logo'

const EmptyLayout = ({settings, children}) => {
  return(
      <div className="empty-layout--container">
        <div className="empty-layout--back">
          <Link to="/">
        <Logo settings={settings} />
          <span>
            <FontAwesomeIcon icon={faArrowLeft}/>
            Back to App</span>
          </Link>
        </div>
        {children}
      </div>

  )
}

export default EmptyLayout