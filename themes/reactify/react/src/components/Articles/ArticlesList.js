import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadArticles} from '../../AC'
import {convertTimestamp} from "../../helpers";
import './article.scss'

class ArticlesList extends Component {

  componentDidMount() {
    this.props.loadArticles()
  }

  render() {
    const {articles} = this.props
    let renderedArticles = articles.items.map(article => (
        <div className="articles--item" key={article.nid[0].value}>

          <div className="article--image"><img src={article.field_image[0].url} alt=""/></div>
          <div className="article--teaser">
            <h4><Link to={`/articles/${article.nid[0].value}`}>{article.title[0].value}</Link></h4>
            Published: {convertTimestamp(article.created[0].value)}
          </div>
          {/* <p>{article.body[0].summary}</p> */}
        </div>
    ))

    return(
        <main className="main--content">
          {renderedArticles}
        </main>
    )
  }
}

export default connect(state => ({
      articles: state.articles
    }),
    {loadArticles}
)(ArticlesList)