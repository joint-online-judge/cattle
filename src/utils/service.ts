import { Api } from '@/client';
import { AxiosResponse, AxiosError } from 'axios';
import { notification } from 'antd';

export const Horse = new Api();

Horse.instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    notification.error({
      message: 'Oops...',
      description: 'There seems to be something wrong with the server. Please contact the maintainers.',
    });
    return Promise.reject(error);
  },
);

export * from '@/client';
