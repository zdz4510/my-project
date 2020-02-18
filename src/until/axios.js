import axios from "axios";
//import qs from "qs";
import router from "@/router/";
import { getToken } from "./action";
axios.defaults.timeout = 60000;
axios.defaults.withCredentials=false;
axios.interceptors.request.use(
  config => {
    // config.data = qs.stringify(config.data);
    //config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    // config.headers.Ticket = sessionStorage.getItem('Ticket');
    // config.headers["X-Auth-Token"] = getToken();
     config.headers["mcs.sessionId"] = getToken();
    // console.log(config)
    // config.headers = {
    //     "Content-Type": "application/x-www-form-urlencoded"
    // };
    // console.log(config)
    // Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    // })
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

/**
 * http response 拦截器
 *
 */

axios.interceptors.response.use(
  response => {
    // console.log('end')
    //  Indicator.close();
    if (response.data.code == 401) {
      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }
      });
    } else if (response.data.errCode == 500) {
      console.log("code:500");
    }
    // console.log(response.data);
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          //500 服务器错误
          console.log("401服务器错误");
          // router.replace({
          //     path: '/error',
          //     query: { redirect: router.currentRoute.fullPath, title: "哎呀,服务器开小差了！(*^__^*) ", code: "404" }
          // })
          break;
        case 404:
          //500 服务器错误
          console.log("404服务器错误");
          // router.replace({
          //     path: '/error',
          //     query: { redirect: router.currentRoute.fullPath, title: "哎呀,服务器开小差了！(*^__^*) ", code: "404" }
          // })
          break;
        case 500:
          //500 服务器错误
          // router.replace({
          //     path: '/error',
          //     query: { title: "哎呀,服务器开小差了！(*^__^*) ", code: "500" }
          // })
          break;
        default:
        // router.replace({
        //     path: '/error',
        //     query: { title: "哎呀,服务器开小差了！(*^__^*) ", code: error.response.status }
        // })
      }
    }
    return Promise.reject(error);
  }
);
/**
 * 上面是axios的默认配置
 */
//Vue.prototype.$http = axios;

export default axios;
