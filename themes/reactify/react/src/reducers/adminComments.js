import {
  ADD_COMMENT,
  LOAD_ALL_COMMENTS,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  START,
  SUCCESS,
  FAIL
} from '../constants'

import {push} from 'react-router-redux'

export default (allCommentsState = {
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
    case LOAD_ALL_COMMENTS + START:
      return {
        ...allCommentsState,
        loading: true,
        message: {
          type: null,
          text: null
        }
      }

    case LOAD_ALL_COMMENTS + SUCCESS:
      return {
        ...allCommentsState,
        loading: false,
        loaded: true,
        items: allCommentsState.items.concat(response)
      }

    case LOAD_ALL_COMMENTS + FAIL:
      return {
        ...allCommentsState,
        loading: false,
        loaded: false,
      }

    case UPDATE_COMMENT + START:
      return {
        ...allCommentsState,
        saving: true
      }

    case UPDATE_COMMENT + SUCCESS:
      return {
        ...allCommentsState,
        message: {
          ...allCommentsState.message,
          text:'Comment was successfully updated',
          type: 'success'
        },
        items: allCommentsState.items.map(item => {
          if (item.id[0].value === response.id[0].value) {
            return response
          }
          return item
        })
      }

    case UPDATE_COMMENT + FAIL:
      return {
        ...allCommentsState,
        message: {
          ...allCommentsState.message,
          text: error.message,
          type: 'error'
        }
      }

    case DELETE_COMMENT + SUCCESS:
      const contentToDeleteArr =  allCommentsState.items.filter(item => item.id[0].value === id)
      return {
        ...allCommentsState,
        items: allCommentsState.items.filter(item => {
          if (item.id[0].value !== id) {
            return item
          }
        }),
        message: {
          ...allCommentsState.message,
          text: `${contentToDeleteArr[0].name[0].value} deleted`,
          type: 'success'
        },
        toast: {
          type: 'success',
          text: 'Comment successfully added'
        }
      }

    case DELETE_COMMENT + FAIL:
      return {
        ...allCommentsState,
        message: {
          ...allCommentsState.message,
          text: error.message ? error.message : "Couldn't delete comment",
          type: 'error'
        }
      }

    case ADD_COMMENT + START:
      return {
        ...allCommentsState,
        saving: true
      }
    case ADD_COMMENT + SUCCESS:
      return {
        ...allCommentsState,
        saving: false,
        items: [ response, ...allCommentsState.items],
        message: {
          ...allCommentsState.message,
          text: "Comment successfully added",
          type: 'success',
        },
        toast: {
          type: 'success',
          text: 'Comment successfully added'
        }
      }

    case ADD_COMMENT + FAIL:
      return {
        ...allCommentsState,
        saving: false,
        message: {
          ...allCommentsState.message,
          text: error.message ? error.message : "Couldn't add comment",
          type: 'error',
          error
        }
      }
  }
  return allCommentsState
}