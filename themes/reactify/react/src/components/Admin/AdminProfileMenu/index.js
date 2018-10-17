import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LangSwitcher from '../LangSwitcher'
import ProfileCard from '../Profile/ProfileCard'
import { faReact, faDrupal } from '@fortawesome/fontawesome-free-brands'
import { faCogs, faBell, faBellSlash, faLanguage } from '@fortawesome/fontawesome-free-solid'
import './style.scss'

class AdminProfileMenu extends Component {

  render() {
    const {user, notificationBar, toggleNotifications, changeLanguage, language} = this.props
    return(
        <nav className="auth-profile-nav">
         <LangSwitcher language={language} changeLanguage={changeLanguage} />
          <span className="auth--notification-icon" onClick={()=>toggleNotifications()}><FontAwesomeIcon icon={notificationBar ? faBellSlash : faBell}/></span>
          <ProfileCard user={user.user}/>
          <NavLink to="/dashboard/settings" className="auth--settings-link"><FontAwesomeIcon icon={faCogs}/><span className="tooltip">Settings</span></NavLink>
        </nav>
    )
  }
}

export default AdminProfileMenu