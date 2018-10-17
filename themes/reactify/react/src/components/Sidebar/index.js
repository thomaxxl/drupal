import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadRecentContent} from "../../AC";
import './style.scss'

import RecentPostsBlock from '../RecentPosts'

class Sidebar extends Component {
  componentDidMount() {
   if (this.props.content.items.length >0) {return}
   this.props.loadRecentContent()
  }
  render() {
    return (
        <aside className="sidebar">
          <RecentPostsBlock posts={this.props.recentContent}/>
        </aside>
    )
  }
}

export default connect(state => ({
  content: state.content,
  recentContent: state.content.recentContent
}), {loadRecentContent})(Sidebar)