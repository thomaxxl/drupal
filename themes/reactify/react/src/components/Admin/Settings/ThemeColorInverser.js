import React, { Component } from 'react'
import Toggle from '../../UI/Toggle'
import {connect} from 'react-redux'
import {inverseThemeColor} from "../../../AC/adminActions";

class ThemeColorInverser extends Component {

  state = {
    toggled: false,
    inversedColor: false
  }

  toggle = ev => {
    this.setState({
      toggled: !this.state.toggled,
      inversedColor: !this.state.inversedColor
    })

    this.props.inverseThemeColor(this.state.inversedColor)
  }
  render() {

    return (
        <Toggle handleChange={this.toggle} />
    )
  }
}

export default connect(null, {inverseThemeColor})(ThemeColorInverser)