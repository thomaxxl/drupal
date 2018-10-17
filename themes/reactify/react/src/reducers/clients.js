import {
  ADD_CLIENT,
  LOAD_CLIENTS,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  START,
  SUCCESS,
  FAIL
} from '../constants'

import {push} from 'react-router-redux'

export default (clientsState = {
  loading: false,
  loaded: false,
  items: [],
  message: {
    type: null,
    text: null
  }
}, action) => {
  const {type, id, response, error} = action

  switch(type) {
    case LOAD_CLIENTS + START:
      return {
        ...clientsState,
        loading: true,
        message: {
          type: null,
          text: null
        }
      }

    case LOAD_CLIENTS + SUCCESS:
      return {
        ...clientsState,
        loading: false,
        loaded: true,
        items: clientsState.items.concat(response)
      }

    case LOAD_CLIENTS + FAIL:
      return {
        ...clientsState,
        loading: false,
        loaded: false,
      }

    case UPDATE_CLIENT + START:
      return {
        ...clientsState,
        saving: true
      }

    case UPDATE_CLIENT + SUCCESS:
      return {
        ...clientsState,
        message: {
          ...clientsState.message,
          text:'Client was successfully updated',
          type: 'success'
        },
        items: clientsState.items.map(item => {
          if (item.id[0].value === response.id[0].value) {
            return response
          }
          return item
        })
      }

    case UPDATE_CLIENT + FAIL:
      return {
        ...clientsState,
        message: {
          ...clientsState.message,
          text: error.message,
          type: 'error'
        }
      }

    case DELETE_CLIENT + SUCCESS:
      const contentToDeleteArr =  clientsState.items.filter(item => item.id[0].value === id)
      return {
        ...clientsState,
        items: clientsState.items.filter(item => {
          if (item.id[0].value !== id) {
            return item
          }
        }),
        message: {
          ...clientsState.message,
          text: `${contentToDeleteArr[0].name[0].value} deleted`,
          type: 'success'
        },
        toast: {
          type: 'success',
          text: 'Client successfully added'
        }
      }

    case DELETE_CLIENT + FAIL:
      return {
        ...clientsState,
        message: {
          ...clientsState.message,
          text: error.message ? error.message : "Couldn't delete client",
          type: 'error'
        }
      }

    case ADD_CLIENT + START:
      return {
        ...clientsState,
        saving: true
      }
    case ADD_CLIENT + SUCCESS:
      return {
        ...clientsState,
        saving: false,
        items: [ response, ...clientsState.items],
        message: {
          ...clientsState.message,
          text: "Client successfully added",
          type: 'success',
        },
        toast: {
          type: 'success',
          text: 'Client successfully added'
        }
      }

    case ADD_CLIENT + FAIL:
      return {
        ...clientsState,
        saving: false,
        message: {
          ...clientsState.message,
          text: error.message ? error.message : "Couldn't add client",
          type: 'error',
          error
        }
      }
  }
  return clientsState
}