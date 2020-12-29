import Proxy from 'app/utils/proxies/Proxy';
import axios from 'axios';
// prepare api
import { isProduction } from '../../../main';

const api_url_dev = 'https://umjicanvas.com/api/v1/';
const api_url_prod = 'https://sll.apple.com';

const baseURL = isProduction ? api_url_prod : api_url_dev;
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 1000;

export default {
  Proxy,
};
