import AxiosPackage from 'axios';

export const Axios = AxiosPackage.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
