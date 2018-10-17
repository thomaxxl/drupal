import React, { Component } from 'react'
import {connect} from 'react-redux'

import {addComment} from '../../../AC/adminActions'
import store from "../../../store";

class AddComment extends Component {

  state = {
    _links: {
      type: {
        href: `${this.props.baseUrl}/rest/type/comment/comment`
      }
    },
    entity_type: {value: 'node'},
    field_name: {value: 'comment'},
    comment_type: {target_id: 'comment'},

    entity_id: {target_id: ''},
    uid: {target_id: ''},
    subject: {value: ''},
    comment_body: {value: ''},
    status: {value: '1'}

  }

  handleSubmit = ev => {
    ev.preventDefault()
    store.dispatch(addComment(this.state))
    console.warn(this.state)
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: {value : ev.target.value}
    })
  }

  handleReferenceChange = ev => {
    this.setState({
      [ev.target.name]: {target_id : +ev.target.value}
    })
  }


  render() {
    return(
        <div className="className">
          <h3>Add new comment</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-item">
              <label>Content id</label>
              <input name="entity_id" onChange={this.handleReferenceChange} type="text" value={this.state.entity_id.target_id}/>
            </div>

            <div className="form-item">
              <label htmlFor="">Comment author</label>
              <input name="uid" onChange={this.handleReferenceChange} value={this.state.uid.target_id} />
            </div>

            <div className="form-item">
              <label htmlFor="">Subject</label>
              <input name="subject" onChange={this.handleChange} value={this.state.subject.value} />
            </div>

           <div className="form-item">
              <label htmlFor="">Comment</label>
              <textarea name="comment_body" onChange={this.handleChange} value={this.state.comment_body.value} />
            </div>

            <button>Add comment</button>
          </form>
        </div>
    )
  }
}

export default connect(state => ({
  baseUrl: state.settings.base_url
}))(AddComment)