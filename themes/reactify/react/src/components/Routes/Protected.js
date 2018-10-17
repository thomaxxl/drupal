import React, { Component } from 'react'
import Dashboard from '../Admin/Dashboard'

class Protected extends Component {

  render() {
console.log(this.props)
    return(
    <div className="app-wrapper">
      <Dashboard changeLanguage={this.props.changeLanguage} />
    </div>
    )
  }
}

export default Protected