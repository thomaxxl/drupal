import {
  LOAD_CLIENTS, ADD_CLIENT, UPDATE_CLIENT, DELETE_CLIENT,
  LOAD_ALL_COMMENTS, ADD_COMMENT, DELETE_COMMENT,
  LOAD_CONTENT, ADD_CONTENT, UPDATE_CONTENT, DELETE_CONTENT,
  LOAD_USERS, ADD_USER, UPDATE_USER, DELETE_USER,
  LOAD_DASHBOARD_STATS, INVERSE_THEME_COLOR
} from "../constants"

// Content in admin area.
export function loadContent() {
  return {
    type: LOAD_CONTENT,
    callApi: `${BASE_URL}/api/content?_format=json`,
    jwtToken: localStorage.getItem('jwt_token')
  }
}

export function addContent(content) {
  return {
    type: ADD_CONTENT,
    postApi: `${BASE_URL}/entity/node?_format=hal_json`,
    method: 'POST',
    jwtToken: localStorage.getItem('jwt_token'),
    contentType: 'application/hal+json',
    csrfToken: store.getState().auth.csrfToken,
    content: content
  }
}

// Admin actions.
export function updateContent(content, id) {
  return {
    type: UPDATE_CONTENT,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi: `${BASE_URL}/node/${id}/?_format=json`,
    method: 'PATCH',
    csrfToken: store.getState().auth.csrfToken,
    content: content,
    redirect: true
  }
}

export function deleteContent(id) {
  return {
    type: DELETE_CONTENT,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi: `${BASE_URL}/node/${id}/?_format=json`,
    method: 'DELETE',
    csrfToken: store.getState().auth.csrfToken,
    redirect: true
  }
}

// Users in admin area.
export function loadUsers() {
  return {
    type: LOAD_USERS,
    callApi: `${BASE_URL}/api/users?_format=json`,
    jwtToken: localStorage.getItem('jwt_token')
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    postApi: `${BASE_URL}/entity/user?_format=hal_json`,
    method: 'POST',
    jwtToken: localStorage.getItem('jwt_token'),
    contentType: 'application/hal+json',
    csrfToken: store.getState().auth.csrfToken,
    content: user,
    updateStats: true
  }
}

export function updateUser(content, id) {
  return {
    type: UPDATE_USER,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi:  `${BASE_URL}/user/${id}/?_format=json`,
    method: 'PATCH',
    csrfToken: store.getState().auth.csrfToken,
    content: content,
    redirect: true
  }
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi: `${BASE_URL}/user/${id}/?_format=json`,
    method: 'DELETE',
    csrfToken: store.getState().auth.csrfToken,
    redirect: true,
    updateStats: true
  }
}

// Clients AC
import store from "../store";
import {BASE_URL} from "../config";

export function loadClients() {
  return {
    type: LOAD_CLIENTS,
    callApi: `${BASE_URL}/api/clients?_format=json`,
  }
}

export function addClient(client) {
  return {
    type: ADD_CLIENT,
    postApi: `${BASE_URL}/entity/client?_format=hal_json`,
    method: 'POST',
    jwtToken: localStorage.getItem('jwt_token'),
    contentType: 'application/hal+json',
    csrfToken: store.getState().auth.csrfToken,
    content: client,
    updateStats: true
  }
}

export function updateClient(client, id) {
  return {
    type: UPDATE_CLIENT,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi: `${BASE_URL}/admin/structure/clients/${id}/?_format=json`,
    method: 'PATCH',
    csrfToken: store.getState().auth.csrfToken,
    content: client,
    redirect: true,
    updateStats: true
  }
}

export function deleteClient(id) {
  return {
    type: DELETE_CLIENT,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi: `${BASE_URL}/admin/structure/clients/${id}/?_format=json`,
    method: 'DELETE',
    csrfToken: store.getState().auth.csrfToken,
    redirect: true,
    updateStats: true
  }
}

// Comments AC.
export function loadAllComments() {
  return {
    type: LOAD_ALL_COMMENTS,
    callApi: `${BASE_URL}/api/comments/all?_format=json`,
    jwtToken: localStorage.getItem('jwt_token')
  }
}
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    postApi: `${BASE_URL}/entity/comment?_format=hal_json`,
    method: 'POST',
    jwtToken: localStorage.getItem('jwt_token'),
    contentType: 'application/hal+json',
    csrfToken: store.getState().auth.csrfToken,
    content: comment
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id: id,
    jwtToken: localStorage.getItem('jwt_token'),
    postApi: `${BASE_URL}/comment/${id}/?_format=json`,
    method: 'DELETE',
    csrfToken: store.getState().auth.csrfToken,
    redirect: true
  }
}

// Dashboard stats.
export function loadDashboardStats() {
  return {
    type: LOAD_DASHBOARD_STATS,
    callApi: `${BASE_URL}/api/dashboard_stats?_format=json`,
    jwtToken: localStorage.getItem('jwt_token')
  }
}

// Change color theme.
export function inverseThemeColor(inversedColor) {
  return {
    type: INVERSE_THEME_COLOR,
    inversedColor: inversedColor
  }
}
