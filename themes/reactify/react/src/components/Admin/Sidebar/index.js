import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import LocalizedText from '../../Localization/LocalizedText'


import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faTachometerAlt, faChartPie, faUsers, faFileAlt, faComments, faChessQueen } from '@fortawesome/fontawesome-free-solid'
import './style.scss'

const Sidebar = ({minified, settings}) => {
 const userRoles = localStorage.getItem('user_roles')
  const isAdmin = userRoles.includes('administrator')
  return (
      <div className={`auth--sidebar${minified ? ' minified' : ''}${settings.dashboard.inversedColor ? ' dark-bg' : ''}`}>
        <nav className={`sidebar-navigation`}>

          <Link to="/dashboard"><span><FontAwesomeIcon
              icon={faChartPie}/></span>{minified ? null : <LocalizedText>Dashboard</LocalizedText>}</Link>
          <Link to="/dashboard/content"><span><FontAwesomeIcon
              icon={faFileAlt}/></span>{minified ? null : 'Content'}</Link>
          {isAdmin && <Link to="/dashboard/users"><span>
              <FontAwesomeIcon icon={faUsers}/></span>{minified ? null : 'Users'}</Link>}
          <Link to="/dashboard/comments"><span>
              <FontAwesomeIcon icon={faComments}/></span>{minified ? null : 'Comments'}</Link>
          {isAdmin && <Link to="/dashboard/clients"><span><FontAwesomeIcon
              icon={faChessQueen}/></span>{minified ? null : <LocalizedText>Clients</LocalizedText>}</Link>}
        </nav>
      </div>
  )
}

export default Sidebar