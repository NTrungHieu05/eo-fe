import Axios from 'axios';
import { Cookies } from 'react-cookie';
import Config from '@root/config';
import { ENDPOINTS, ROUTES } from '@constants';
import { Message, reactLocalStorage } from '@utils';

const PUBLIC_URLS = [ENDPOINTS.LOGIN];

const axios = Axios.create({
  baseURL: Config.API_URL,
  timeout: 120000,
});

axios.interceptors.request.use(
  function (config: any) {
    //don't add auth header if url match ignore list
    if (
      PUBLIC_URLS.indexOf(config?.url) >= 0 ||
      (config?.url && config?.url.indexOf('public') >= 0)
    ) {
      return config;
    }
    config.headers['Content-Type'] = 'application/json';
    // config.headers['Access-Control-Allow-Origin'] = '*';
    // config.headers['Access-Control-Allow-Credentials'] = 'true';
    // config.headers['Access-Control-Allow-Methods'] = 'POST, PUT, PATCH, GET, DELETE, OPTIONS';
    // config.headers['Access-Control-Allow-Headers'] =
    //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';
    //if token is passed in server side
    if (config && config.token) {
      //modify header here to include token
      Object.assign(config.headers, {
        Authorization: `Bearer ${config.token}`,
      });
    } else {
      const cookies = new Cookies();
      const token = cookies.get(Config.AUTH_TOKEN_KEY);
      if (token) {
        Object.assign(config.headers, { Authorization: `Bearer ${token}` });
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status ?? '';
    if (status == 401) {
      const cookies = new Cookies();
      reactLocalStorage.clear();
      cookies.remove(Config.AUTH_TOKEN_KEY, { path: '/' });
      cookies.remove(Config.USER_KEY, { path: '/' });
      // Message.error(error.response.data.error);
      Message.error('Authorization failed');
      // setTimeout(() => {
      //   const from = window.location.href;
      //   window.location.href = `${ROUTES.SIGNIN}?r=${encodeURIComponent(from)}`;
      // }, 500);
    }
    return Promise.reject(error);
  }
);

const API = {
  get: (endpoint: string, params = {}, config?: any) =>
    axios.get(endpoint, { params: params, ...config }),
  post: (endpoint: string, data: any = {}, config?: any) =>
    axios.post(endpoint, data, { ...config }),
  put: (endpoint: string, data: any = {}, config?: any) => axios.put(endpoint, data, { ...config }),
  del: (endpoint: string, params = {}, config?: any) =>
    axios.delete(endpoint, { params: params, ...config }),
};

export default API;
