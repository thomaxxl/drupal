import React, {Component} from 'react'
import Menu from './../Menu'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ProfileLinks from '../Admin/ProfileLinks'
import AboutPage from './../AboutPage'
import HomePage from './../HomePage'
import Footer from './../Footer/Footer'
import LoginPage from './../Authentication/LoginPage'
import RegisterPage from './../Authentication/RegisterPage'
//import Article from './../Article/Article'
import ArticlesPage from './../Articles'
//import ArticlesList from './../ArticlesList'
import NotificationContainer from './../Admin/Notifications/NotificationContainer'
import NotFound from './../Routes/NotFound'

import LayoutRoute from './LayoutRoute'

import PageLayout from '../Layouts/PageLayout'
import AuthLayout from '../Layouts/AuthLayout'
import Toasts from '../UI/Toasts/Toasts'

import {getThemeSettings, loadMenu, appSetup} from '../../AC/index'
import ContactPage from "./../ContactPage"

import './../app.scss'

class Public extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menu: []
    }
  }

  componentDidMount() {
    this.props.dispatch(loadMenu())
  }

  render() {
    let styles = {
      fullWidth: '100%',
      fixedWidth: '1600px',
    }

    const {menu, auth, settings, dispatch} = this.props
    const renderMenu = menu.items.map((item) => {
      const reference = '/' + item.title.toLowerCase()
      return <Menu to = {reference} key = {item.id} />
    })

    const wrapperWidth = settings.full_width ? styles.fullWidth : styles.fixedWidth

    return(
        <div>
        <Switch>
          <LayoutRoute exact path="/" layout={PageLayout} component={HomePage} />
          <LayoutRoute path = "/about" layout={PageLayout} component = {AboutPage} />
          <LayoutRoute path = "/contact" layout={PageLayout} component = {ContactPage} />
          <LayoutRoute path = "/login" settings={settings} layout={AuthLayout} component = {LoginPage} />
          <LayoutRoute path = "/register" settings={settings} layout={AuthLayout} component = {RegisterPage} />
          <LayoutRoute path = "/articles" layout={PageLayout} component = {ArticlesPage} />
          <LayoutRoute path = "*" settings={settings} layout={AuthLayout} component={NotFound} />
        </Switch>
          <Toasts />
        </div>
    )
  }
}

export default connect((state) => ({
      menu: state.menu,
      auth: state.auth,
      settings: state.settings,
    })

)(Public)