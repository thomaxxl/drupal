import React from 'react'
import { connect } from 'react-redux'
import {loadPage} from '../AC'

class AboutPage extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.router.location.pathname === '/about' && !nextProps.pages.aboutpageLoaded && !nextProps.pages.aboutpageLoading ) {
      if (nextProps.settings.pages != undefined  && nextProps.settings.pages.length > 0) {
        const aboutPage = nextProps.settings.pages.filter(page => page.name === 'about')
        this.props.loadPage(aboutPage[0].id, 'about')
      }
    }
  }

  getAboutPage() {
    const { settings, pages } = this.props
    const settingsAboutPage = settings.pages ? settings.pages.filter(page => page.name === 'about') : []

    if (pages !== undefined) {
      if (pages.aboutpageLoaded) {
        const pagesArr = this.props.pages.items
        if (pagesArr !== undefined) {
          if (pagesArr.length > 0) {

            const aboutpage = pagesArr.filter(page => page.nid[0].value === +settingsAboutPage[0].id)

            if (aboutpage.length) {
              return (
                  <main className="main--content">
                    <h2>{aboutpage[0].title[0].value}</h2>
                    <div
                        dangerouslySetInnerHTML={{__html: aboutpage[0].body[0].value}}/>
                  </main>
              )
            }
          }
        }
      }
    }

    return (
        <main className="main--content">
          <h3>About us page</h3>
          <p>This is about page placeholder text.
            Please specify about us page in theme settings.</p>
        </main>
    )
  }

  render() {
    return(
        this.getAboutPage()
    )
  }
}

export default connect(state => ({
  settings: state.settings,
  pages: state.pages,
  router: state.router
}), {loadPage}, null, { pure: false })
(AboutPage)
