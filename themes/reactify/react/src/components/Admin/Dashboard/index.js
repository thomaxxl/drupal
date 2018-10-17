import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

// Components import.
//import DashboardCharts from '../charts/DashboardCharts'
import AdminMenu from '../AdminMenu/AdminMenu'
import AdminProfileMenu from '../AdminProfileMenu'
import Logo from '../../Header/Logo'
import ProfilePage from '../Profile/ProfilePage'
import Toasts from '../../UI/Toasts/Toasts'
import Content from '../Content'
import UsersPage from '../Users'
import Comments from '../Comments'
import Clients from '../Clients'
import Settings from '../Settings'
import Sidebar from '../Sidebar'
import DashboardStats from './DashboardStats'
import NotificationContainer from '../Notifications/NotificationContainer'
import {toggleNotificationBar} from "../../../AC";
import {loadDashboardStats} from "../../../AC/adminActions";
import Alert from '../../UI/Alerts/Alert'
import './dashboard.scss'

class Dashboard extends Component {
  state = {
    miniSidebar: false,
    sidebarBg: 'light',
    showDashboardAlert: !this.props.settings.dashboard.dashboardStats.enabled
  }

  toggleNotifications = () => {
    this.props.toggleNotificationBar()
  }

  toggleSidebar = () => {
    this.setState({
      miniSidebar: !this.state.miniSidebar
    })
  }

  dismissAlert = () => {
    this.setState({
      showDashboardAlert: false
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.settings.dashboard.dashboardStats.enabled !== nextProps.settings.dashboard.dashboardStats.enabled) {
      this.props.loadDashboardStats()
      this.setState({showDashboardAlert: !nextProps.settings.dashboard.dashboardStats.enabled })
    }
  }

  render() {
    const { settings, currentUser, changeLanguage, clients, stats, miniSidebar } = this.props

    console.log('loaded', settings.dashboard.dashboardStats)

    return (
      <div className={`auth--layout-container${settings.dashboard.inversedColor ? ' inversed-color' : ''}`}>
        <header className="auth--header">
          <Link to="/" className={`auth--branding${this.state.miniSidebar ? ' minified' : ''}${this.state.sidebarBg === 'dark' ? ' dark-bg' : ''}`}>
            <Logo settings={settings} />
            {this.state.miniSidebar ? null : settings.site_name}
          </Link>
          <div className="auth--navbar">
            <AdminMenu toggleSidebar={this.toggleSidebar} />
            <AdminProfileMenu
              settings={settings}
              user={currentUser}
              notificationBar={settings.showNotificationBar}
              toggleNotifications={this.toggleNotifications}
              language={settings.language}
              changeLanguage={changeLanguage}
            />
          </div>
        </header>
        <Sidebar
          settings={settings}
          minified={this.state.miniSidebar}
          sidebarBg={this.state.sidebarBg}
        />
        <div className={`auth--main-wrapper ${this.state.miniSidebar ? 'with-mini-sidebar' : ''}`}>

          <main className="auth--main">
            { settings.dashboard.dashboardStats && <DashboardStats dashboardStats={settings.dashboard.dashboardStats}  /> }
            { this.state.showDashboardAlert && <Alert type="info" text="Dashboard statistics block can be enabled in theme settings page. (Requires reactify_dashboard_stats
               module.)" dismiss={this.dismissAlert} /> }

            { /* !!settings.dashboard.dashboardStats.enabled && <Route exact path="/dashboard" render={() => <DashboardCharts />} /> */}
            <Route path="/dashboard/content" component={Content}/>
            <Route path="/dashboard/users" render={() => <UsersPage userRoles={localStorage.getItem('user_roles')}/>}/>
            <Route path="/dashboard/comments" component={Comments}/>
            <Route path="/dashboard/clients" render={() => <Clients userRoles={localStorage.getItem('user_roles')}/>}/>
            <Route path="/dashboard/profile" component={ProfilePage}/>
            <Route path="/dashboard/settings" render={() => <Settings setSidebarBg={this.setSidebarBg} />}/>
          </main>
        </div>
        {settings.showNotificationBar ? <NotificationContainer/> : null }
        <Toasts/>
      </div>
    )
  }
}

export default withRouter(connect((store, props)  => ({
  settings: store.settings,
  currentUser: store.currentUser,
  changeLanguage: props.changeLanguage,
  clients: store.clients

}), {loadDashboardStats, toggleNotificationBar})(Dashboard))
