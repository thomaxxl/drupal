import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import { addToast } from "../../../AC";
import { loadClients, addClient } from "../../../AC/adminActions";
import LocalizedText from '../../Localization/LocalizedText'

import Alert from '../../UI/Alerts/Alert'

import ClientList from './ClientList'
import AddClient from "../Clients/AddClient";
import EditClient from "./EditClient";
import ViewClient from "./ViewClient";

class ClientPage extends Component {
  state = {
    isOpen: false,
    deleteId: null
  }

  toggleDialog = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  selectDeleteId = id => {
    this.setState({
      deleteId: id
    })
  }

  componentDidMount() {
     if (!this.props.clients.loaded) {
    this.props.loadClients()
     }
  }

  getClients() {
    const userRoles = localStorage.getItem('user_roles')
    if (!userRoles.includes('administrator')) {
      return <h3><LocalizedText>You are not authorized to access this page</LocalizedText></h3>
    }
    const {clients} = this.props
    // const savingIndicator = clients.saving  ? <h3>Saving ...</h3> : null
    if (clients.loading) return <h3>Loading clients...</h3>

    return(
        <div className="admin-content-section">

          <div className="content-wrapper">
            <div className="content-list-section">
              <h3 className="card-title">Clients list</h3>

              <Link to='/dashboard/clients/add'>Add new client</Link>
              <ClientList
                  clients={this.props.clients.items}
                  isOpen={this.state.isOpen}
                  toggleDialog={this.toggleDialog}
                  selectDeleteId={this.selectDeleteId}
                  deleteId={this.state.deleteId}
              />
            </div>

            <Route exact path="/dashboard/clients/add" component={AddClient} />
            <Route exact path="/dashboard/clients/:id" component={ViewClient} />
            <Route path="/dashboard/clients/:id/edit" component={EditClient} />
          </div>
        </div>
    )

  }
  render() {
    return(
        <div>
          {this.getClients()}
        </div>
    )
  }
}

export default connect(state => ({
  clients: state.clients,
}), {loadClients, addToast, addClient}, null, {pure: false})(ClientPage)