import axios from 'axios';
import { config } from '@helper/config';

const setBaseUrl = (): void => {
  axios.defaults.baseURL = config.apiUrl;
};

const setAuthHeader = (token?: string | null): void => {
  axios.defaults.baseURL = config.apiUrl;
  if (token) {
    type CustomAxiosHeadersType = {
      common: any;
    };
    (axios.defaults.headers as CustomAxiosHeadersType).common = {
      Authorization: `Bearer ${token}`,
    };
  }
};

export { setBaseUrl, setAuthHeader };
