import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadBanner} from '../../AC'
import './style.scss'

class TopBanner extends Component {

  componentWillReceiveProps(nextProps) {
    if (!nextProps.banner.loaded && this.props.bannerId !== nextProps.bannerId) {
      this.props.loadBanner(nextProps.bannerId)
    }
  }

  renderBanner() {
    const {banner} = this.props
    if (!banner.loaded) {
      return (
          <div className="banner--top">
            <div className="banner--content">
              <h2>Reactify</h2>
            </div>
          </div>
      )
    }

    return (
        <div className="banner--top" style= {{ backgroundImage: `url('${banner.items.field_banner_image[0].url}')`}}>
          <div className="banner--content">
            <h2>{banner.items.field_title[0].value}</h2>
            <p>{banner.items.field_subtitle[0].value}</p>
          </div>
        </div>
    )
  }

  render() {
    return (
        this.renderBanner()
    )
  }
}

export default connect(state => ({
      banner: state.content.banner,
      bannerId: state.settings.banner_block_id,
    }),
    {loadBanner}, null, { pure: false }

)(TopBanner)