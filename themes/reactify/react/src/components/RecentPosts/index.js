/**
 * Recent posts block on Sidebar.
 */

import React from 'react'
import {Link} from 'react-router-dom'

const RecentPostsBlock = ({posts}) => {

  const getPosts = () => {
    if (posts.loaded) {
      return posts.items.map(post => <li key={post.nid[0].value}><Link to={`/articles/${post.nid[0].value}`}>{post.title[0].value}</Link></li>)
    }
    return 'No posts'
  }

  return(
      <div className="recent-posts">
        <h3>Recent posts</h3>
        <ul>
          {getPosts()}
        </ul>
      </div>
  )
}

export default RecentPostsBlock