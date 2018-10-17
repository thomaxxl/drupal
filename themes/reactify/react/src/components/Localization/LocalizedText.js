import React from 'react'
import PropTypes from 'prop-types'
import LocalizationContext  from './LocalizationContext'

// Pass translated string if it exists from dictionaries.
function LocalizedText({ children }) {

  return (
    <LocalizationContext.Consumer>
      {({ dictionary }) => (
        <span>{ dictionary[children] || children }</span>
      )}
    </LocalizationContext.Consumer>
  )
}

LocalizedText.propTypes = {
  children: PropTypes.string
}

/**
 * Legacy Context API.
 * It will not work after React major update (in 17.x versions)
 function LocalizedText(props, context) {
  if (typeof props.children !== 'string') {
    console.warn('string child expected')
    return <span>{props.children}</span>
  }
  return <span>{context.dictionary[props.children] || props.children}</span>
}

 LocalizedText.propTypes = {
  children: PropTypes.string
}

 LocalizedText.contextTypes = {
  dictionary: PropTypes.object.isRequired
}
 */

export default LocalizedText
