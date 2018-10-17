import React from 'react'
import { connect } from 'react-redux'
import { loadPage } from "../AC"

class HomePage extends React.Component {

  componentWillReceiveProps(nextProps) {

    if (!nextProps.pages.frontpageLoaded && !nextProps.pages.frontpageLoading ) {
      const { router, settings } = this.props
      if (nextProps.settings.pages != undefined && nextProps.settings.pages.length > 0) {
        const frontPage = nextProps.settings.pages.filter(page => page.name == 'front')

        this.props.loadPage(frontPage[0].id, 'front')


      }
    }
  }

  getHomePage() {
    const { settings, pages } = this.props

    const settingsFrontPage = settings.pages ? settings.pages.filter(page => page.name === 'front') : []

    if (pages != undefined) {
      if (pages.frontpageLoaded) {

        const pagesArr = this.props.pages.items
        if (pagesArr !== undefined) {
          if (pagesArr.length > 0) {

            const frontPage = pagesArr.filter(page => page.nid[0].value === +settingsFrontPage[0].id)

            if (frontPage.length) {
              return (
                <main className="main--content">
                  <h2>{frontPage[0].title[0].value}</h2>
                  <div
                    dangerouslySetInnerHTML={{__html: frontPage[0].body[0].value}}/>
                </main>
              )
            }
          }
        }
      }

    }

    return  ( <main className="main--content">
      <h3>Home page</h3>
      <p>This is homepage placeholder text.
        Please specify homepage in theme settings.</p>
    </main>)
  }

  render() {
    return(
      this.getHomePage()
    )
  }
}

export default connect(state => ({
    settings: state.settings,
    pages: state.pages,
    router: state.router
  }), {loadPage}, null, { pure: false }

)(HomePage)
