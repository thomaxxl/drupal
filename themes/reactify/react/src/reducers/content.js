import {
  ADD_CONTENT,
  LOAD_CONTENT,
  UPDATE_CONTENT,
  DELETE_CONTENT,
  LOAD_RECENT_CONTENT,
  LOAD_BANNER,
  START,
  SUCCESS,
  FAIL
} from '../constants'

export default (contentState = {
  loading: false,
  loaded: false,
  items: [],
  errorMessage: null,
  message: {
    type: null,
    text: null
  },
  recentContent: {
    loading: false,
    loaded: false,
    items: []
  },
  banner: {
    loading: false,
    loaded: false,
    items: []

  }
}, action) => {
  const {type, id, response, error} = action

  switch(type) {
    case LOAD_CONTENT + START:
      return {
        ...contentState,
        loading: true,
        message: {
          type: null,
          text: null
        }
      }

    case LOAD_CONTENT + SUCCESS:
      return {
        ...contentState,
        loading: false,
        loaded: true,
        items: contentState.items.concat(response)
      }

    case LOAD_CONTENT + FAIL:
      return {
        ...contentState,
        loading: false,
        loaded: false,
        message: {
            ...contentState.message,
          text: error.message,
          type: 'error'
        }
      }

    case UPDATE_CONTENT + START:
      return {
          ...contentState,
        message: {
          type: null,
          text: null
        }
      }

    case UPDATE_CONTENT + SUCCESS:
      return {
        ...contentState,
        message: {
            ...contentState.message,
            text:'Content was successfully updated',
            type: 'success'
        },
        items: contentState.items.map(item => {
         if (item.nid[0].value == response.nid[0].value) {
            return response
          }
          return item
        })
      }

    case UPDATE_CONTENT + FAIL:
      return {
        ...contentState,
        message: {
          ...contentState.message,
          text: error.message,
          type: 'error'
        }
      }

    case DELETE_CONTENT + SUCCESS:
      const contentToDeleteArr = contentState.items.filter(item => item.nid[0].value == id)
      return {
          ...contentState,
          items: contentState.items.filter(item => {
            if (item.nid[0].value != id) {
              return item
            }
          }),
        message: {
            ...contentState.message,
            text: `${contentToDeleteArr[0].title[0].value} deleted`,
          type: 'success'
          }
      }

    case DELETE_CONTENT + FAIL:
      return {
          ...contentState,
        message: {
            ...contentState.message,
          text: error.message ? error.message : "Couldn't delete content",
          type: 'error'
        }
      }

    case ADD_CONTENT + SUCCESS:
      return {
        ...contentState,
        items: [...contentState.items, response],
        message: {
          ...contentState.message,
          text: "Content successfully added",
          type: 'success'
        }
      }

    case ADD_CONTENT + FAIL:
       return {
           ...contentState,
         message: {
           ...contentState.message,
           text: error.message ? error.message : "Couldn't add content",
           type: 'error'
         }
       }
       // Recent content block in sidebar.
    case LOAD_RECENT_CONTENT + START:
      return {
          ...contentState,
          recentContent: {
            loading: true,
            loaded: false,
            items: []
          }
      }

    case LOAD_RECENT_CONTENT + SUCCESS:
      return {
          ...contentState,
        recentContent: {
            loading: false,
            loaded: true,
            items:  contentState.recentContent.items.concat(response)
        }
      }

    case LOAD_RECENT_CONTENT + FAIL:
      return {
          ...contentState,
          recentContent: {
              ...contentState.recentContent,
            loading: false,
            loaded: false,
            error: error.message
          }
      }

    case LOAD_BANNER + START:
      return {
          ...contentState,
        banner: {
            ...contentState.banner,
            loading: true
        }
      }

    case LOAD_BANNER + SUCCESS:
      return {
          ...contentState,
        banner: {
            ...contentState.banner,
            loading: false,
          loaded: true,
          items: response
        }
      }

      case LOAD_BANNER + FAIL:
        return {
            ...contentState,
            banner: {
                ...contentState.banner,
              message: error.message
            }
        }
  }
  return contentState
}