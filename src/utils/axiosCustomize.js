import axios from "axios";
import { store } from "../redux/store";
import { login, logout } from "../redux/action/auth";
import { getNewToken } from "../service/authService";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
});

const NO_RETRY_HEADER = "x-no-retry";

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = store?.getState()?.auth?.accessToken;
    config.headers["Authorization"] = "Bearer " + access_token; //add token to request header
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data ? response.data : response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        if (
          error.config.url !== "/auth/login" &&
          !error.config.headers[NO_RETRY_HEADER]
        ) {
          error.config.headers[NO_RETRY_HEADER] = "true";

          const refreshToken = store?.getState()?.auth?.refreshToken;
          let res = await getNewToken({ refreshToken });
          if (res.status === 200) {
            const { username, ...rest } = res.data.userCredentials;
            const { accessToken, refreshToken } = res.data;

            error.config.headers["Authorization"] = `Bearer ${accessToken}`;

            store.dispatch(
              login({
                name: username,
                ...rest,
                accessToken,
                refreshToken,
              })
            );
            return instance.request(error.config);
          }
        }
        return error.response?.data ? error.response.data : error;
      }

      case 400: {
        if (error.config.url === "/auth/refresh") {
          store.dispatch(logout());
        }
        return error.response?.data ? error.response.data : error;
      }

      // generic api error (server related) unexpected
      default: {
        return error.response?.data ? error.response.data : error;
      }
    }
  }
);

export default instance;
