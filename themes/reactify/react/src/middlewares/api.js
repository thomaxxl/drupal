import {START, SUCCESS, FAIL} from "../constants"

export default store => next => action => {
  const {callApi, jwtToken, type, register, ...rest} = action

  if (!callApi) return next(action)

  let config = null
  if (register) {
    let config = {
    method: 'POST',
        headers: {'Content-type': 'application/json'},

  } }

  //let config = null
  if (jwtToken) {
    config = {
      headers: {
      'Authorization': `Bearer ${jwtToken}`
      }
    }
  }

  next({...rest, type: type + START})

  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response)
    }

    if (!response.ok) {
      return response.json().then(json => {
        const error = new Error(json.message || response.statusText)
        return Promise.reject(Object.assign(error, {response}))
      })
    }
  }

  fetch(callApi, config)
      .then(checkStatus)
      .then(res => res.json())
      .then(response => next({...rest, type: type + SUCCESS, response}))
      .catch(error => next({...rest, type: type + FAIL, error}))
}