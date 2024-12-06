import axios from "axios";
import { store } from "../redux/store";
import { updateToken } from "../redux/slices/userSlice";

const api = axios.create({
  baseURL: "http://localhost:8888/lib",
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.user.userInfo?.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            return axios(config);
          })
          .catch((err) => Promise.reject(err));
      }

      config._retry = true;
      isRefreshing = true;

      const state = store.getState();
      const refreshToken = state.user.userInfo?.refreshToken;

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8888/lib/auth/refreshToken",
            { refreshToken }
          );
          const newAccessToken = refreshResponse.data.accessToken;

          // Update Redux state with new access token
          store.dispatch(
            updateToken({
              accessToken: newAccessToken,
            })
          );

          // Retry original request
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          return axios(config);
        } catch (err) {
          processQueue(err, null);
          // Optional: logout user if refresh fails
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Optional: Handle missing refresh token (e.g., logout)
      }
    }
    return Promise.reject(error);
  }
);

export default api;
