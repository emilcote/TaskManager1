import FetchHelper from "./FetchHelper";

export default {
  show(cardId) {
    const url = window.Routes.api_v1_task_path(cardId, { format: "json" });
    return FetchHelper.get(url);
  },

  create(params) {
    const url = window.Routes.api_v1_tasks_path();
    return FetchHelper.post(url, params);
  },

  index(state, page) {
    const url = window.Routes.api_v1_tasks_path({
      q: { state_eq: state },
      page,
      per_page: 10,
      format: "json"
    });
    return FetchHelper.get(url);
  },

  update(cardId, params) {
    const url = window.Routes.api_v1_task_path(cardId, { format: "json" });
    return FetchHelper.put(url, params);
  },

  destroy(cardId) {
    const url = window.Routes.api_v1_task_path(cardId, { format: "json" });
    return FetchHelper.delete(url);
  }
};
