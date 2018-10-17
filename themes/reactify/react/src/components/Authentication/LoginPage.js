import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { userLogin } from '../../AC'
import './style.scss'

class LoginPage extends Component {

  state = {
    name: '',
    pass: '',
  }

  render() {
    const { from } = this.props.location.state|| { from: { pathname: '/'}}
    const  redirectToReferrer  = this.props.isAuthenticated
    const message = this.props.message ? <p className="alert error">{this.props.message}</p> : null



    if (redirectToReferrer) {
      return (
          <Redirect to={from} />
      )
    }

    return(
    <div className="auth--box">
      <h3>Sign in</h3>
      {message}

      <form onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Username" value={this.state.name} onChange={this.handleChange} />
        <input type="password" name="pass" placeholder="Password" value={this.state.pass} onChange={this.handleChange} />
        <button type="submit">Login</button>
      </form>
      <p className="auth--text">Don't have an account? <Link to="/register">Sign Up</Link></p>
    </div>
    )
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.userLogin(this.state)
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }
}

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
  message: state.auth.message
}), {userLogin}
)(LoginPage)