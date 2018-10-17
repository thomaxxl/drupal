import React from 'react'
import {Route} from 'react-router-dom'
import ArticlesList from "./ArticlesList"
import Article from './Article'

const ArticlesPage = props => {
  return(
      <main className="main--content">
      <Route exact path="/articles" component={ArticlesList}/>
      <Route path="/articles/:id" component={Article}/>
      </main>
  )
}

export default ArticlesPage