import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchUser} from "../../../AC/index"
import {Route} from 'react-router-dom'
import EditProfile from './EditProfile'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/fontawesome'
import './style.scss'

class Profile extends Component {
  componentDidMount() {
    if (!this.props.currentUser.userLoaded) {
      this.props.fetchUser()
    }
  }

  render() {
//  console.warn(this.props.currentUser)
    if (this.props.currentUser.userLoading) return <p>Loading user...</p>

    const { name, field_city, user_picture, mail, created } = this.props.currentUser.user
    return(
        <div className="auth--profile-page">
          <div className="auth--profile">
            <img src={user_picture && user_picture[0] ? user_picture[0].url : ''} alt={user_picture && user_picture[0] ? user_picture[0].alt : ''} />
            <p className="profile--name">{name[0].value}</p>
            <p><span className="label">City:</span>{field_city && field_city[0] ? field_city[0].value : 'no city'}</p>
            <p><span className="label">Email:</span>{mail && mail[0] ? mail[0].value : 'no mail'}</p>
          </div>

        </div>
    )
  }
}

export default connect(state => ({
      currentUser: state.currentUser
    }),
    {fetchUser}

)(Profile)