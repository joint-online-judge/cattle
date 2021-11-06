import { AxiosResponse, AxiosError } from 'axios';
import { notification } from 'antd';
import { throttle } from 'lodash';
import { Api } from '@/client';

export const Horse = new Api({
  timeout: 10000,
});

const throttleWarn = throttle(() => {
  notification.warn({
    message: 'Permission Denied',
    description: "You don't have the permssion of certain resources.",
  });
}, 4500); // default duration of notification

const throttleServerError = throttle(() => {
  notification.error({
    message: 'Oops...',
    description:
      'There seems to be something wrong with the server. Please contact the maintainers.',
  });
}, 4500);

const throttleTimeoutError = throttle(() => {
  notification.error({
    message: 'Request Timeout',
    description: 'The server may be down or busy now.',
  });
}, 4500);

const throttleNetworkError = throttle(() => {
  notification.error({
    message: 'Network Error',
    description:
      'Error occurred when sending requests. Please check your network connection.',
  });
}, 4500);

const throttleRequestError = throttle(() => {
  notification.error({
    message: 'Oops...',
    description: 'Network error',
  });
}, 4500);

Horse.instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 403) {
        throttleWarn(); // No Permission
      } else if (error.response?.status >= 500) {
        throttleServerError(); // Internal Server Error
      }
    } else if (error.request) {
      if (error?.code === 'ECONNABORTED') {
        throttleTimeoutError();
      } else {
        throttleNetworkError(); // Network Error
      }
    } else {
      throttleRequestError(); // Sending Error: caused by code
    }
    return Promise.reject(error);
  },
);

export * from '@/client';
