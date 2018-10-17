import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../../../../AC'

import './style.scss'

class EditProfile extends Component {
  state = {
    name: {value:this.props.user.name[0].value},
    mail: {value:this.props.user.mail[0].value},
    field_city: {value:this.props.user.field_city[0].value}
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: {value : ev.target.value}
    })
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.updateUser(this.state, this.props.user.uid[0].value)
    console.log(this.state)
  }

  render() {
    return(
    <div className="profile--edit-form">
      <h3>Profile settings</h3>
      <form onSubmit={this.handleSubmit}>
        <div className="input-wrapper">
        <label htmlFor="">Name</label>
        <input name="name" type="text" value={this.state.name.value} onChange={this.handleChange} />
        </div>
        <div className="input-wrapper">
        <label htmlFor="">E-mail</label>
        <input name="mail" type="mail" value={this.state.mail.value} onChange={this.handleChange} />
        </div>
        <div className="input-wrapper">
        <label htmlFor="">City</label>
        <input name="field_city" type="text" value={this.state.field_city.value} onChange={this.handleChange} />
        </div>
<div className="form-actions">
        <button>Save</button>
</div>
      </form>
    </div>
    )
  }
}

export default connect(state => ({
  user: state.currentUser.user
}), {updateUser}
    )(EditProfile)