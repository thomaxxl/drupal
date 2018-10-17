import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadClients} from '../../../AC/adminActions'

import ClientChart from './ClientChart'

class DashboardCharts extends Component {

  componentDidMount() {
    if (!this.props.clients.loaded) {
      this.props.loadClients()
    }
  }

  getClientChart() {
    const {clients} = this.props
    if (clients.length === 0) {return null}
    return(
        <div className="charts">
          <ClientChart clients={clients.items}/>
        </div>
    )
  }

  render() {
    return(
        this.getClientChart()
    )
  }
}

export default connect(store => ({
  clients: store.clients
}), {loadClients})(DashboardCharts)
