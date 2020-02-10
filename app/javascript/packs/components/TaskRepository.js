import { fetch } from './Fetch';
import {toCamelCase, toSnakeCase} from './Helper'

export default {
  create(task) {
    return fetch('POST', window.Routes.api_v1_tasks_path(), task).then(response => {
      if (response.statusText == 'Created') {
        console.log('CREATE OK')
      } else {
        console.log('CREATE failed! ' + response.status + ' - ' + response.statusText)
      }
      errors => console.log(`CREATE failed! errors: ${errors}`)
    })
  },
  index(state, page) {
    return fetch('GET', window.Routes.api_v1_tasks_path({q: {state_eq: state}, page, per_page: 10, format: 'json'}))
  },
  show(cardId) {
    return fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'}))
  },
  update(cardId, task) {
    return fetch('PUT', window.Routes.api_v1_task_path(cardId, {format: 'json'}), task).then(response => {
      if (response.statusText == 'OK') {
        console.log('UPDATE OK')
      } else {
        console.log('UPDATE failed! ' + response.status + ' - ' + response.statusText)
      }
    })
  },
  destroy(cardId) {
    return fetch('DELETE', window.Routes.api_v1_task_path(cardId, {format: 'json'})).then(response => {
      if (response.statusText == 'OK') {
        console.log('DELETE OK')
      } else {
        console.log('DELETE failed! ' + response.status + ' - ' + response.statusText)
      }
    })
  }
}