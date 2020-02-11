import { fetch } from './Fetch'

export default {
  get(url) {
    return fetch('GET', url)
  },

  post(url, params) {
    return fetch('POST', url, params)
  },

  put(url, params) {
    return fetch('PUT', url, params)
  },

  delete(url) {
    return fetch('DELETE', url)
  }
}