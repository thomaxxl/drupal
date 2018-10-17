import React, { Component } from 'react'
import './footer.scss'

class Footer extends Component {
  render() {

    const footerText = this.props.text ? this.props.text : 'No footer text'
    return(
        <div className="footer">
          <div className="container">
            <p>{footerText}</p>
          </div>
        </div>
    )
  }
}

export default Footer