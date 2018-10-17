import React from 'react'

import dictionaries from './dictionaries'
import LocalizationContext from './LocalizationContext'

const LocalizationProvider = props => {
  return <LocalizationContext.Provider
    value={{dictionary: dictionaries[props.language]}}>
    {props.children}
  </LocalizationContext.Provider>
}

export default LocalizationProvider

/**
 * Legacy Context API.
 class LangProvider extends Component {
  static propTypes = {
    language: PropTypes.string
  };

  static childContextTypes = {
    dictionary: PropTypes.object
  }

  getChildContext() {
    return {
      dictionary: dictionaries[this.props.language]
    }
  }

  render() {
    return (

          this.props.children

    )
  }
}
*/
