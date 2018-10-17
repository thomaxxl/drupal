import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loadArticles} from "../../AC"

import CommentList from '../CommentList/CommentList'

class Article extends Component {
  render() {
    return(
        <article>
          {this.getBody()}
        </article>
    )
  }

  getBody = () => {
    const {articles, id} = this.props

    const article = articles.items.filter(item => {
      if (item.nid[0].value == id) {
        return item
      }
    })

    if (!this.props.match) {
      return <h3>There is no such article</h3>
    } else {
      return(
          <div>
            <h2>{article[0].title[0].value}</h2>
            <img src = {article[0].field_image[0].url} alt = {article[0].field_image[0].alt} />
            {article[0].body[0].value}
            <CommentList articleId = {id} />
          </div>
      )
    }

  }
}

export default connect((state, props) => ({
      id: props.match.params.id,
      articles: state.articles.items.length > 0 ? state.articles : state.content.recentContent,
      legacyArticle: state.articles.items.filter(item => {
        if (item.nid[0].value == props.match.params.id) {
          return item
        }
      })
    }),
    {loadArticles}
)(Article)