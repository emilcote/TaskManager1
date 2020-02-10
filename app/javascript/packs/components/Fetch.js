import axios from 'axios'
import qs from 'qs'
import {toCamelCase, toSnakeCase} from './Helper'

export function authenticityToken() {
  const token = document.querySelector('meta[name="csrf-token"]')
  return token ? token.content : null
}
function headers() {
  return {
    Accept: '*/*',
    'content-Type': 'application/json',
    'X-CSRF-Token': authenticityToken(),
    'X-Requested-With': 'XMLHttpRequest'
  }
}
export function fetch(method, url, data) {
  axios.interceptors.response.use(
    response => {
      response.data = toCamelCase(response.data)
      return response
    },
    error => {
      error.response.data = toCamelCase(error.response.data)
      return Promise.reject(error)
    }
  )

  axios.interceptors.request.use(
    config => {
      config.params = toSnakeCase(config.params)
      config.data = toSnakeCase(config.data)
      return config
    },
    error => {
      return Promise.reject(error)
    })

  const options = {
    method,
    headers: headers(),
    data,
    url
  }
  return axios(options)
}