import AxiosPackage from 'axios';

export const Axios = AxiosPackage.create({
  baseURL: process.env.BASE_URL,
});
