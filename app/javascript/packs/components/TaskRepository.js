import { fetch } from './Fetch';

export default {
  create (task) {
    return fetch('POST', window.Routes.api_v1_tasks_path(),task)
}
}