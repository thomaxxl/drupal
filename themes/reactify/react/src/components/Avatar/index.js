import React from 'react'
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg'
import './style.scss'

const Avatar = props => {
  const src = props.src ? props.src : defaultAvatar // defaultAvatar //

  return(
      <img className="avatar" src={src} />
  )
}

export default Avatar