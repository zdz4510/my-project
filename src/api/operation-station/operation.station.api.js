import request from  "@/service/"
// import {VUE_APP_URL} from '@/config'

console.log(request)

/**
 * 查询
 *  url /mes/operation_station_assign/findPage
 */
export const getData = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation_station_assign/findPage`, {
		params:data
	});
};

/**
 * 新增
 *  url /mes/operation_station_assign/save
 */
export const saveData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/operation_station_assign/save`, data);
};


