import { Api } from '@/client';
import { AxiosResponse, AxiosError } from 'axios';
import { notification } from 'antd';

export const Horse = new Api();

Horse.instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      if (error.response?.status >= 500) {
        notification.error({
          message: 'Oops...',
          description: 'There seems to be something wrong with the server. Please contact the maintainers.',
        });
      }
    } else if (error.request) {
      notification.error({
        message: 'Oops...',
        description: 'Network error',
      });
    } else {
      notification.error({
        message: 'Oops...',
        description: 'Error occurred when sending request',
      });
    }

    return Promise.reject(error);
  },
);

export * from '@/client';
