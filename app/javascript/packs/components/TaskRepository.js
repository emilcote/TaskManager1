import { fetch } from './Fetch';

export default {

  create (task) {
    return fetch('POST', window.Routes.api_v1_tasks_path(),task)
  },

  show (cardId) {
    return fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'}))
  },
  
  update (cardId, task) {
    return fetch('PUT', window.Routes.api_v1_task_path(cardId, {format: 'json'}),task)
  },

  destroy (cardId) {
    return fetch('DELETE', window.Routes.api_v1_task_path(cardId, { format: 'json' }))
  }
}