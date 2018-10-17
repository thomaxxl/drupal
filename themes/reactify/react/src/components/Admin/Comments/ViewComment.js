import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DeleteComment from '../DeleteButton'
import Dialog from '../../UI/Alerts/Dialog'
import {deleteComment} from "../../../AC/adminActions";
import {connect} from 'react-redux'

class ViewComment extends Component {
  state= {
    isOpen: false
  }

  handleDelete = (id) =>  {
    this.props.deleteComment(id)
    this.toggleDialog()
  }

  toggleDialog = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const {id, comment} = this.props
    console.log(comment)

    if (comment.length === 0) return null
    return (
        <div>
          <div>
            <h2>Subject: {comment[0].subject[0].value}</h2>
            <div>Comment: {comment[0].comment_body[0].value}</div>
            <div>Author's id: {comment[0].uid[0].target_id}</div>
            <div>{comment[0].comment_type[0] !== undefined ? comment[0].comment_type[0].value : null}</div>

          </div>
          <div className="action-btns">
            <button><Link to={`/dashboard/comments/${id}/edit`}>Edit</Link></button>
            <DeleteComment
                id={id}
                toggleDialog={this.toggleDialog}
            />
          </div>

          <Dialog id={id}
                  show={this.state.isOpen}
                  onConfirm={this.handleDelete}
                  onClose={this.toggleDialog}>
            Are you sure you want to delete the comment?
          </Dialog>
        </div>
    )
  }
}

export default connect((state, props) => ({
  // deleteContent: props.deleteContent,
  //clients: state.clients,
  id: props.match.params.id,
  comment: state.allComments.items.filter(item => {

    if (item.cid[0].value === +props.match.params.id) {
      return item
    }
  })
}), {deleteComment})(ViewComment)