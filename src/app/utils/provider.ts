import axios, { Method } from 'axios';

axios.defaults.baseURL = '/api';
axios.defaults.timeout = 3000;

export const provider = axios.create();
export type ProviderMethod = Method;
