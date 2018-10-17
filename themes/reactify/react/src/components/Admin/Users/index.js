import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import {addToast} from "../../../AC";
import {loadUsers} from "../../../AC/adminActions";

import Alert from '../../UI/Alerts/Alert'

import UserList from './UserList'
import AddUser from "./AddUser";
//import AddContentPage from "../AddContentPage";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";

class UsersPage extends Component {
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
    if (!this.props.users.loaded) {
      this.props.loadUsers()
    }
    const toast = this.props.users.toast ? this.props.users.toast : null
    if (toast) {
      this.props.addToast(toast)
    }
    console.warn(this.props.users.message)
  }


  getUsers() {
    const {userRoles} = this.props
    const {users} = this.props

    if (!userRoles.includes('administrator')) {
      return <h3>You are not authorized to access this page.</h3>
      setTimeout(() => {}, 4000)
    }

    const message = this.props.users.message.text ? <Alert type={this.props.users.message.type} text={this.props.users.message.text}/> : null
    const savingIndicator = users.saving  ? <h3>Saving ...</h3> : null
    if (users.loading) return <h3>Loading users...</h3>

console.warn(this.props.users.message)
    return(
        <div className="admin-content-section">
          {message}
          {savingIndicator}

          <div className="content-wrapper">
            <div className="content-list-section">
              <h3 className="card-title">Users</h3>
              <Link to='/dashboard/users/add'>Add new user</Link>
              <UserList
                  users={this.props.users.items}
                  isOpen={this.state.isOpen}
                  toggleDialog={this.toggleDialog}
                  selectDeleteId={this.selectDeleteId}
                  deleteId={this.state.deleteId}
              />
            </div>
            <div className="content-actions-section">
              <Route path="/dashboard/users/add" component={AddUser} />
              <Route path="/dashboard/users/:id/view" component={ViewUser} />
              <Route path="/dashboard/users/:id/edit" component={EditUser} />
            </div>
          </div>
        </div>
    )

  }
  render() {
    return(
        this.getUsers()
    )
  }
}

export default connect(state => ({
  users: state.users,
  //menu: state.menu
}), {loadUsers, addToast}, null, {pure: false})(UsersPage)