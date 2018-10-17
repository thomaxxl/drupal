import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {registerUser} from '../../AC'

class RegisterPage extends Component {

  state = {
    name: { value : ''},
    mail: { value : ''},
    pass: { value : ''}
  }

  render() {
    return(
        <div className="auth--box">
          <h3>Sign up</h3>

          <form onSubmit = {this.handleSubmit}>
            <input type="text" name="name" placeholder="Username" value={this.state.name.value} onChange = {this.handleChange} />
            <input name="mail" placeholder="E-mail" value={this.state.mail.value} onChange={this.handleChange} />
            <input type="password" name="pass"  placeholder="Password" value = {this.state.pass.value} onChange = {this.handleChange} />
            <button type="submit">Register</button>
          </form>
          <p className="auth--text">Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
    )
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.registerUser(this.state)
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: {value : ev.target.value}
    })
    console.log(JSON.stringify(this.state))
  }
}

export default connect(null, {registerUser}

)(RegisterPage)