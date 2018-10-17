import React from 'react'

const Logo = props => {
  const { settings } = props
  const logoUrl = '' + settings.base_url + settings.logo_url
  return (
      <div className="logo">
        <img src={ logoUrl } alt="Reactify theme"/>
      </div>
  )
}

export default Logo
