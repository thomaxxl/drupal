import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../Header/Header'
import TopBanner from "../Banner"
import Sidebar from '../Sidebar'

import Footer from '../Footer/Footer'

class Layout extends Component {


  render() {
    const {layout, auth, settings, menu, dispatch, children} = this.props

    return (
        <div className="app-container" style={{}}>

          {!!layout.showHeader && <Header auth={auth} settings={settings} menu={menu} dispatch={dispatch} />}
          {!!layout.showBanner && <TopBanner/>}
          <main className={`app--content ${layout.sidebarPosition === 'left' ? 'sidebar-left' : ''}`}>


            {children}
            {!!layout.showSidebar && <Sidebar/>}

          </main>
          {!!layout.showFooter && <Footer text={settings.text.footerText}/>}
        </div>

    )
  }
}

export default withRouter(connect(state => ({
  layout: state.settings.layout,
  menu: state.menu,
  auth: state.auth,
  settings: state.settings,
}))(Layout))
