// axios.js (or wherever you configure Axios in your Next.js app)
import axios from 'axios';

const createLoader = () => {
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.style.position = 'fixed';
  loader.style.top = '0';
  loader.style.left = '0';
  loader.style.width = '100%';
  loader.style.height = '100%';
  loader.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  loader.style.display = 'none';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  loader.appendChild(spinner);
  document.body.appendChild(loader);
};

const axiosInstance = axios.create({

   baseURL: 'http://69.48.163.45:3000', // Production
  //  baseURL: 'http://localhost:3000', // LocalHost
  //baseURL: 'https://v462m979-3000.inc1.devtunnels.ms/', // Dev tunnel

});

axiosInstance.interceptors.request.use(
  (config) => {
    // Show loader here
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Hide loader here
    return response;
  },
  (error) => {
    // Hide loader here
    // Handle response error
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
