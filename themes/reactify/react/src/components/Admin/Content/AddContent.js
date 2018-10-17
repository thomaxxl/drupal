import React, {Component} from 'react'
import {connect} from 'react-redux'
import Alert from '../../UI/Alerts/Alert'

import {addContent} from "../../../AC/adminActions";

class AddContentPage extends Component {

  state = {
    _links: {
      type: {
        href: `${this.props.baseUrl}/rest/type/node/page`
      }
    },
    type: {target_id: 'page'},
    title: { value : ''},
    body: { value : ''}
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.props.addContent(this.state)
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: {value : ev.target.value}
    })
  }

  render() {
    const {content} = this.props

    return(
        <div className="content-actions-section">
        <div className="add-content-section">
          <h3>Add new content</h3>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">Select type
              <select name="type" onChange={this.handleChange} value={this.state.type.target_id}>
                <option value="article">Article</option>
                <option value="page">Page</option>
              </select>
            </label>
            <label htmlFor="">Title
              <input name="title" onChange={this.handleChange} value={this.state.title.value} />
            </label>
            <label htmlFor="">Body
              <textarea name="body" onChange={this.handleChange} value={this.state.body.value}/>
            </label>
             <button>Add content</button>
          </form>
        </div>
        </div>
    )
  }
}
export default connect(state => ({
  content: state.content,
  baseUrl: state.settings.base_url
}), {addContent}
)(AddContentPage)