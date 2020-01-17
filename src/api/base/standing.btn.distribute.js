import request from "@/service/";
// import {VUE_APP_URL} from '@/config'

console.log(request);

/**
 * 分页查询站位按钮
 *  url /stationButton/findPage
 */
export const findPageHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/stationButton/findPage`, {
    params: data
  });
};
