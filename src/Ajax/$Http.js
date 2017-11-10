import axios from 'axios';
import {
  Loading,
  Message
} from 'element-ui';

const instance = axios.create({
  baseURL: "http://10.1.4.180:4080/DataAnalyzePlatformBA",
  // timeout: 50000,
  // 数据响应前处理函数
  transformResponse: [function (data) {
    return data;
  }]
});
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN";

instance.withCredentials = true;
// loading对象实例
let loadinginstace = {};
// 设置拦截器1. 请求头拦截器
instance
  .interceptors
  .request
  .use((config) => {
    loadinginstace = Loading.service({
      fullscreen: true
    });
    if (config.method === 'post') {}
    return config;
  }, (error) => {
    loadinginstace.close();
    window.location.reload();
    Message.error({
      message: '加载超时！'
    })
    return Promise.reject(error);
  });


// 拦截器2：响应拦截器
instance
  .interceptors
  .response
  .use((data) => {
    loadinginstace.close();
    return JSON.parse(data.data);;
  }, error => {
    loadinginstace.close();
    Message.error({
      message: '加载失败'
    });
    return Promise.reject(error);
  });

export default instance;
