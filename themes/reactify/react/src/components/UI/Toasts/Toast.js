import React, { Component } from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faTimes, faCheck, faInfo, faExclamationTriangle} from '@fortawesome/fontawesome-free-solid'

class Toast extends Component {

  componentDidMount() {
    setTimeout(() => {this.props.onClose()}
  , 7000)
  }

  render() {
const {toastAction, type, response, error} = this.props
    let toastIcon = <FontAwesomeIcon icon={faInfo}/>
    let text = 'Success'
    if (type === 'success') {
     toastIcon = <FontAwesomeIcon icon={faCheck}/>
      switch (toastAction) {
        case 'ADD_USER':
          const userName = response.name[0].value
          text = `User ${userName} successfully added`
          break

        case 'ADD_CONTENT':
          text = 'Content added'
          break

        case 'REGISTER_SUCCESS':
          text = 'You are successfully registered'
      }
     }

     if (type === 'error') {
      text = error
       toastIcon = <FontAwesomeIcon icon={faExclamationTriangle}/>
     }

    return(
    <div className={`toast ${type}`}>

      <p className="toast--content">
        <span className="toast-icon">{toastIcon}</span>
        {text}
      </p>
      <button onClick={this.props.onClose} className="toast--dismiss"><FontAwesomeIcon icon={faTimes} /></button>
    </div>
    )
  }
}

export default Toast