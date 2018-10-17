import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import PrivateRoute from './Routes/PrivateRoute'

import PublicArea from './Routes/Public'

import ProtectedArea from "./Routes/Protected";

import LocalizationProvider from './Localization/LocalizationProvider'

import {appSetup, setLang} from "../AC";

class App extends Component {

  state = {
    language: 'en'
  }

  componentDidMount() {
    this.props.appSetup()
  }

  changeLanguage = language => ev => {
    this.setState({ language })
    this.props.setLang(language)
  }

  render() {
    if (this.props.settings.loading) return <p>Loading settings..</p>
    return(
      <LocalizationProvider language={this.state.language}>
        <Switch>
          <PrivateRoute
            isAuthenticated = {this.props.auth.isAuthenticated}
            changeLanguage={this.changeLanguage}
            path = "/dashboard"
            component = {ProtectedArea} />
          <Route path="/admin"  render={() => <Redirect to={window.location} />} />
          <Route path="/user"  render={() => <Redirect to={window.location} />} />
          <Route path="/" component={PublicArea} />
        </Switch>
      </LocalizationProvider>
    )
  }
}

export default withRouter(connect(state => ({
    auth: state.auth,
    settings: state.settings
  }), {setLang, appSetup}

)(App))
