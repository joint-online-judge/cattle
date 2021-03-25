import axios, { AxiosInstance, Method } from 'axios';

import { IS_PRODUCTION } from 'app/constants';
import { provider } from 'app/utils/provider';

const API_URL_DEV = 'https://umjicanvas.com/api/v1/';
const API_URL_PROD = 'https://sll.apple.com';

const baseURL = IS_PRODUCTION ? API_URL_PROD : API_URL_DEV;
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 3000;

class Proxy {
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.provider = provider;
  }

  private readonly endpoint: string;
  private readonly provider: AxiosInstance;

  request(requestType: Method, url, data = null) {
    return new Promise((resolve, reject) => {
      this.provider.request({
        method: requestType,
        url,
        data,
      }).then((response) => {
        resolve(response.data);
      }).catch(({ response }) => {
        if (response) {
          reject(response.data);
        } else {
          reject();
        }
      });
    });
  }

  create(data: any) {
    return this.request('post', `/${this.endpoint}`, data);
  }

  read(id: string) {
    return this.request('get', `/${this.endpoint}/${id}`);
  }

  list() {
    return this.request('get', `/${this.endpoint}`);
  }

  update(data: any, id: string) {
    return this.request('put', `/${this.endpoint}/${id}`, data);
  }

  delete(id: string) {
    return this.request('delete', `/${this.endpoint}/${id}`);
  }
}

export default Proxy;
