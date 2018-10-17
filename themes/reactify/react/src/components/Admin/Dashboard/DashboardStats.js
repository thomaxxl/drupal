import React from 'react'

import LocalizedText from '../../Localization/LocalizedText'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUsers, faComments, faFileAlt, faChessQueen } from '@fortawesome/fontawesome-free-solid'

const DashboardStats = ({dashboardStats}) => {

  if (dashboardStats.loading) return <p>Stats are loading..</p>

  /*return(
      <div>
        {Object.keys(dashboard.dashboardStats).forEach( key =>
            <div>{key}:{dashboard.dashboardStats[key]}</div>)}
      </div>
  )*/
  return (
      <div className="auth--dashboard-stats">
        <div className="auth--dashboard-stat">
          <span className="stats-icon"><FontAwesomeIcon icon={faUsers} /></span>
          Users: <span className="stats-number">{dashboardStats.stats ? dashboardStats.stats.usersTotal: 'No user stats'}</span>
        </div>
        <div className="auth--dashboard-stat">
            <span className="stats-icon">
             <FontAwesomeIcon icon={faChessQueen} /></span>
          <LocalizedText>Clients</LocalizedText>: <span className="stats-number">{dashboardStats.stats ? dashboardStats.stats.clientsTotal : 'No client stats'}</span></div>
        <div className="auth--dashboard-stat">
            <span className="stats-icon">
              <FontAwesomeIcon icon={faFileAlt} /></span>
          Content: <span className="stats-number">{dashboardStats.stats ? dashboardStats.stats.contentTotal : 'No content stats'}</span>
        </div>
        <div className="auth--dashboard-stat">
            <span className="stats-icon">
              <FontAwesomeIcon icon={faComments} /></span>
          Comments: <span className="stats-number">{dashboardStats.stats ? dashboardStats.stats.commentTotal : 'No comment stats'}</span>
        </div>
      </div>
  )
}

export default DashboardStats
