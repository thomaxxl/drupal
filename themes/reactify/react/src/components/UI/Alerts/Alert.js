import React from 'react'
import './style.scss'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

const Alert = props => {
  const {type, text, dismiss} = props

  return(
      <div className = {`alert ${type}`}>
        {text}
        <span onClick={() => dismiss()} className="alert-dismiss">
        <FontAwesomeIcon icon={faTimes} />
          </span>
      </div>
  )
}

export default Alert