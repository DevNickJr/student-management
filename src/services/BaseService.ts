import axios from "axios";
import appConfig from "@/configs/app.config";


const BaseService = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
})


BaseService.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("config", config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
BaseService.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default BaseService

      // 'Connection': 'Accept-Encoding',
      // 'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept-Language': 'en-US,en;q=0.9',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Max-Age': '86400',
      // 'Access-Control-Expose-Headers': 'X-Auth-Token',
      // 'Host': 'eduverse-api.azurewebsites.net',
      // 'Origin': 'https://eduverse-api.azurewebsites.net',
      // 'Referer': 'https://eduverse-api.azurewebsites.net/',
      // 'Content-Length': '0' 
      // 'Accept': 'application/json',
