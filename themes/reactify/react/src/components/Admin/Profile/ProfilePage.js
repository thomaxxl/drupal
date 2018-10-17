import React from 'react'
import {Router, Route} from 'react-router-dom'

import Profile from '../Profile'
import EditProfile from './EditProfile'

const ProfilePage = () => {
  return(
 <div>
    <Route path="/dashboard/profile" component={Profile}/>
    <Route path="/dashboard/profile/edit" component={EditProfile} />
 </div>
  )
}

export default ProfilePage