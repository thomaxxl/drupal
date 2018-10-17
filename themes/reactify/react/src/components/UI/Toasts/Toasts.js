import React, { Component } from 'react'
import {connect} from 'react-redux'
import Toast from './Toast'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import './style.scss'

import {removeToast} from '../../../AC'

const Toasts = ({toasts, removeToast}) => {

    return(
        <div className="toasts-container">
          <ReactCSSTransitionGroup
              transitionName="toasts"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
          {toasts.map(toast => {
            const {id} = toast
            return (
                <Toast {...toast} key={id} onClose={() => {removeToast(id)}}/>
            )
          })}
          </ReactCSSTransitionGroup>
        </div>
    )

}

export default connect(state => ({
  toasts: state.toasts
}), {removeToast})(Toasts)