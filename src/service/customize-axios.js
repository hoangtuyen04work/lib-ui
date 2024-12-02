import axios from "axios";

import { store } from '../redux/store'

const api = axios.create({
  baseURL: "http://localhost:8888/lib",
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = store?.getState()?.user?.user?.token;
   if (token && !config.url.includes('/login') && !config.url.includes('/signup')) {
       config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  console.log("succesful")
  return  response;
}, function (error) {
  console.log(error);
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default api;
