import Proxy from 'app/utils/proxies/Proxy';
import axios from 'axios';
// prepare api
import { isProduction } from '../../../main';

const API_URL_DEV = 'https://umjicanvas.com/api/v1/';
const API_URL_PROD = 'https://sll.apple.com';

const baseURL = isProduction ? API_URL_PROD : API_URL_DEV;
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 1000;

export default {
  Proxy,
};
