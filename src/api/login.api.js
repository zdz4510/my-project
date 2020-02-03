import request from "@/service/";
import qs from 'querystring'
// login
export const login = data => {
    return request.post(`${window.VUE_APP_URL}/sso/cus/login`, data);
};

// type SYSTEM 可以查询
export const getResourceList  = data => {
    return request.post(`${window.VUE_APP_URL}/mcs/resource/list?pageSize=0&currentPage=1`,data);
  };


  export const getUser  = data => {
      let params = qs.stringify(data);
    return request.post(`${window.VUE_APP_URL}/sso/cus/userInfo?${params}`,);
  };

