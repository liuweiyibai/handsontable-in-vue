import axios from 'axios';
import {Loading, Message} from 'element-ui';
const instance = axios.create({baseURL: "http://10.1.4.180:5080/DataAnalyzePlatformBA", timeout: 5000});
let loadinginstace = {};
instance
  .interceptors
  .request
  .use((config) => {
    loadinginstace = Loading.service({fullscreen: true});
    if (config.method === 'post') {}
    return config;
  }, (error) => {
    loadinginstace.close();
    Message.error({message: '加载超时'})
    return Promise.reject(error);
  });
instance
  .interceptors
  .response
  .use((data) => {
    loadinginstace.close();
    return data
  }, error => {
    loadinginstace.close();
    Message.error({message: '加载失败'})
    return Promise.reject(error)
  })

export default instance;