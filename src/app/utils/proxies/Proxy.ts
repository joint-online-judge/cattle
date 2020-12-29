import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

class Proxy {
  constructor(endpoint: string, config: AxiosRequestConfig) {
    this.endpoint = endpoint;
    this.config = config;
  }

  private readonly endpoint: string;
  private readonly config: any;

  get instance(): AxiosInstance {
    return axios.create({ ...this.config });
  }

  request(requestType: Method, url, data = null) {
    return new Promise((resolve, reject) => {
      this.instance.request({
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
    console.log(this.instance.defaults);
    return this.request('get', `/${this.endpoint}/${id}`);
  }

  update(data: any, id: string) {
    return this.request('put', `/${this.endpoint}/${id}`, data);
  }

  delete(id: string) {
    return this.request('delete', `/${this.endpoint}/${id}`);
  }

}

export default Proxy;
