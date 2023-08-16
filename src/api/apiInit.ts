import axios from 'axios';

export const initInterceptors = (getToken: () => Promise<string>) => {  
  axios.interceptors.request.use(
    async (config) => {
      console.log("dos");
      // const token = await getToken();
      console.log("tres");
      // if (token) config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );
};
