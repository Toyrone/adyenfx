import axios from 'axios';
import NProgress from 'nprogress';

console.log(process.env.VUE_APP_API_URL);

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  timeout: 36000,
  headers: {},
  crossdomain: true,
});

instance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    if (error.code === 'ECONNABORTED') {
      // TODO: bubble error message
      return error;
    }
    if (error.response.status === 500) {
      // eslint-disable-next-line no-param-reassign
      error.response.data.message = 'Something went wrong, Please try again!';
    }
    return Promise.reject(error);
  },
);

export default instance;
