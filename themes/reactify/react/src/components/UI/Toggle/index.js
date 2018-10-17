import React, { Component } from 'react'
import './style.scss'

class Toggle extends Component {


  render() {
    return(
        <label className="toggle">
          <input type="checkbox" onChange={ev => this.props.handleChange(ev)}/>
          <span className="toggle-slider"></span>
        </label>
    )
  }
}

export default Toggle