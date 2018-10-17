import React, { Component } from 'react'
import ThemeColorInverser from './ThemeColorInverser'
import { connect } from 'react-redux'

import {inverseThemeColor} from '../../../AC/adminActions'

class Settings extends Component {

  render() {

    const classes = {
      toggleWrapper: {
        display: 'flex',
        alignItems: 'center'
      },
      text: {
        marginLeft: '20px'
      }
    }

    return(
        <div>
          <h3>Settings page</h3>

          <div style={classes.toggleWrapper}>
            <ThemeColorInverser/><span style={classes.text}>Inverse theme color</span>
          </div>
        </div>
    )
  }
}

export default connect(null, {inverseThemeColor})(Settings)
