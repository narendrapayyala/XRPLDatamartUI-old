import axios from "axios";
// import { Auth } from 'aws-amplify';
// import { logoutUser } from 'app/auth/store/userSlice';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 1000,
});

axiosConfig.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    // if (response.status === 401) {

    // }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
