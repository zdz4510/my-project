import request from "@/service/";
import qs from 'querystring'
// login
export const login = data => {
    return request.post(`${window.VUE_APP_URL}/sso/cus/login`, data);
};

// type SYSTEM 可以查询
export const getSystemList  = data => {
    return request.get(`${window.VUE_APP_URL}/mcs/open/resource/getSystemList`,data);
  };


  export const getUser  = data => {
      let params = qs.stringify(data);
    return request.post(`${window.VUE_APP_URL}/sso/cus/userInfo?${params}`,);
  };

