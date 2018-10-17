import {
  LOAD_MENU,
  LOAD_ARTICLES,
  REGISTER_USER,
  TOKEN,
  REGISTER,
  FETCH_USER,
  THEME_SETTINGS,
  GET_CSRF_TOKEN,
  LOAD_COMMENTS,
  LOGIN,
  LOGOUT,
  START,
  SUCCESS,
  FAIL,
  LOAD_PAGE,
  ADD_TOAST,
  REMOVE_TOAST,
  TOGGLE_NOTIFICATION_BAR,
  SUBMIT_CONTACT_FORM,
  SET_LANG,
  LOAD_RECENT_CONTENT,
  LOAD_BANNER
} from "../constants"

import store from '../store'
import {BASE_URL} from '../config'

export function loadMenu() {
  return {
    type: LOAD_MENU,
    callApi: `${BASE_URL}/rest/menu/main?_format=json`
  }
}

export function registerUser(userCreds) {
  return dispatch => {
   // dispatch(getToken())

    fetch(`${BASE_URL}/rest/session/token`)
        .then(res => res.text())
        .then(token => {
              dispatch({
                type: REGISTER + START,
                token: token,
                creds: JSON.stringify(userCreds)
              })
              fetch(`${BASE_URL}/user/register?_format=json`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                      'X-CSRF-Token': token
                    },
                    body: JSON.stringify(userCreds)
                  })
                  .then(res => {
                    if (res.status >= 400) {
                      // res.json()
                      throw new Error(res.statusText)
                    }
                    res.json()
                  })
                  .then(response => {
                    dispatch({
                      type: REGISTER + SUCCESS,
                      response,
                      redirect: true
                    })
                    dispatch(addToast({type: 'success', toastAction: 'REGISTER_SUCCESS', response}))
                  })
                  .catch(error => {
                    dispatch({
                      type: REGISTER + FAIL,
                      error: error.message
                    })
                  })
            }
        )
        .catch(error => {
          dispatch({
            type: TOKEN + FAIL,
            error
          })
        })


    /*
    type: REGISTER_USER,
     register: true,
     callApi: `${BASE_URL}/user/register?_format=json`,
     userInfo: JSON.stringify(state)
     */
  }
}

export function getToken() {
  return {
    type: GET_CSRF_TOKEN,
    tokenUrl: `${BASE_URL}/rest/session/token`
  }
}

// Login actions
export function startLogin(credentials) {
  return {
    type: LOGIN + START,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

export function successLogin(user) {
  return {
    type: LOGIN + SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

export function loginError(message) {
  return {
    type: LOGIN + FAIL,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function saveCSRFToken(token) {
  return {
    type: 'SAVE_CSRF',
    token: token
  }
}

// Get a token and dispatch actions.
export function userLogin(credentials) {

  return dispatch => {
    dispatch(getToken)

    fetch(`${BASE_URL}/rest/session/token`)
        .then(res => res.text())
        .then(token => {
          dispatch(saveCSRFToken(token))
          dispatch(startLogin(credentials))

          fetch(`${BASE_URL}/api/token?_format=json`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'X-CSRF-Token': token
            },
            body: JSON.stringify(credentials)
          })
              .then(res => {
                if (!res.ok) {
                  res.json().then(res => {
                    dispatch(loginError(res.message))
                    throw new Error(res.message)
                  })
                } else {
                  res.json().then(user => {
                    dispatch(successLogin(user))
                    localStorage.setItem('jwt_token', user.token)
                    localStorage.setItem('user_id', user.id)
                    localStorage.setItem('user_roles', user.roles.join())
                    dispatch(fetchUser())
                  })
                }
              }).catch(err => console.error('Error in fetch: ', err.message))

        }).catch(err => console.log('Error getting token: ', err))
  }
}

export function getJwt(user) {
  return (dispatch) => {
    dispatch({
      type: 'JWT_START',
      user
    })

    fetch(`${BASE_URL}/jwt/token`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': user.csrf_token
      },
    }).then(res => {
      if(!res.ok) {
        res.json().then(res => {
          dispatch(jwtError(res))
          throw new Error(res.message)
        })
      } else {
        return res.json()
      }
    }).then(response => {
      dispatch({
        type: 'JWT_RECEIVED',
        response
      })
    }).catch(err => console.warn(err))
  }
}

export function jwtError(res) {
  return {
    type: 'JWT_FAILED',
    res
  }
}

/**
 * Logout actions
 */
function requestLogout() {
  return {
    type: LOGOUT + START,
    isFetching: false,
    isAuthenticated: false
  }
}

export function successLogout() {
  return {
    type: LOGOUT + SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_id')
    dispatch(successLogout())
  }
}

//Contact form
function submitSuccessful(result) {
  return {
    type: SUBMIT_CONTACT_FORM,
    result
  }
}

export function submitContactForm(data) {

  return dispatch => {
    const csrfToken = store.getState().auth.csrfToken

    const additionalData = {

      "contact_form":[{"target_id":"feedback"}],
      "uuid": [{"target_id": "feedback" }],
    }

    let modifyFormData = (prop, obj, newObj) => {
      newObj[prop] = [{"value": obj[prop]}]
    }

    const formValues = data
    let newFormValues = {}
    for (let prop in formValues) {
      if(formValues.hasOwnProperty(prop)) {
        modifyFormData(prop, formValues, newFormValues)
      }
    }

    const formData = {
      ...additionalData,
      ...newFormValues
    }

    fetch(`${BASE_URL}/entity/contact_message?_format=json`,
        {
          method: 'POST',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData)
        }).then(res => {
      if (!res.ok) {
        res.json().then(res => {
          throw new Error(res.message)
        })
      } else {
        res.json().then(result => {
          dispatch(submitSuccessful(result))
        })
      }
    }).catch(err => console.error('Error in fetch: ', err.message))
  }
}

// User actions
export function fetchUser() {
  const userId = localStorage.getItem('user_id')
  return {
    type: FETCH_USER,
    callApi: `${BASE_URL}/user/${userId}?_format=json`,
    jwtToken: localStorage.getItem('jwt_token')
  }
}

// Load articles
export function loadArticles() {
  return {
    type: LOAD_ARTICLES,
    callApi: `${BASE_URL}/api/articles?_format=json`
  }
}

// Get theme settings.
export function getThemeSettings() {
  return {
    type: THEME_SETTINGS,
    callApi: `${BASE_URL}/api/theme_settings?_format=json`
  }
}

export function getAppSettings() {
  return (dispatch) => {

    fetch(`${BASE_URL}/api/theme_settings?_format=json`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': user.csrf_token
      },
    }).then(res => {
      if(!res.ok) {
        res.json().then(res => {
          //dispatch(jwtError(res))
          throw new Error(res.message)
        })
      } else {
        return res.json()
      }
    }).then(response => {
      dispatch({
        type: 'JWT_RECEIVED',
        response
      })
    }).catch(err => console.warn(err))
  }
}

// Load comments based on entity id.
export function loadArticleComments(articleId) {
  return {
    type: LOAD_COMMENTS,
    callApi: `${BASE_URL}/api/comments/${articleId}?_format=json`
  }
}

// Load page
export function loadPage(pageId, pageName) {
  return {
    type: LOAD_PAGE,
    callApi: `${BASE_URL}/node/${pageId}?_format=json`,
    id : pageId,
    pageName: pageName
  }
}

// App setup.
export function appSetup() {
  return dispatch => {
    dispatch(getThemeSettings())
  }
}


export function toggleNotificationBar() {
  return {
    type: TOGGLE_NOTIFICATION_BAR
  }
}
let toastId = 0

export function addToast(options = {}) {
  return {
    type: ADD_TOAST,
    payload: {...options,
      id: toastId++}
  }
}

export function removeToast(id) {
  return {
    type: REMOVE_TOAST,
    payload: id
  }
}

export function setLang(lang) {
  return {
    type: SET_LANG,
    lang: lang
  }
}

export function loadRecentContent() {
  return {
    type: LOAD_RECENT_CONTENT,
    callApi: `${BASE_URL}/api/articles/recent?_format=json`
  }
}

export function loadBanner(bannerId) {
  return {
    type: LOAD_BANNER,
    callApi: `${BASE_URL}/block/${bannerId}?_format=json`
  }
}
