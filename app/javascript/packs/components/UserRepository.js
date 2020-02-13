import FetchHelper from "./FetchHelper";

export default {
  index(params) {
    const url = window.Routes.api_v1_users_path({
      q: { first_name_or_last_name_cont: params }
    });
    return FetchHelper.get(url);
  }
};
