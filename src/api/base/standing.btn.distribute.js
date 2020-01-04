import request from "@/service/";
import qs from 'qs'
// import {VUE_APP_URL} from '@/config'


/**
 * 分页查询站位按钮
 *  url /stationButton/findPage
 */
export const findPageHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/stationButton/findPage`, {
    params: data
  });
};

/**
 * 查询已分配按钮String数组列表
 * @param {*} data 
 */
export const listAssignedButton = data => {
  return request.get(`${window.VUE_APP_URL}/mes/stationButton/listAssignedButton`, {
    params: data
  });
};

/**
 * 查询未分配按钮String数组列表
 * @param {*} data 
 */
export const listUnassingButton = data => {
  return request.get(`${window.VUE_APP_URL}/mes/stationButton/listUnassingButton`, {
    params: data
  });
}; 


/**
 * save保存站位按钮
 * @param {*} data 
 */
export const saveButton = data => {
  const params = qs.stringify({
    station:data.station,
    workCenter:data.workCenter
  })
  return request.post(`${window.VUE_APP_URL}/mes/stationButton/save?${params}`,data.list);
}; 


