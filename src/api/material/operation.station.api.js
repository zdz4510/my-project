import request from  "@/service/"

/**
 * 获取所有工序
 * url /mes/operation/getAll
 */
export const getAllOperation = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/getAll`, {
    params: data
  });
};

/**
 * 根据工厂、工序查询所有站位信息
 * url /mes/operation_station_assign/findPage
 */
export const getDataByStation = data => {
	return request.get(`${window.VUE_APP_URL}/mes/operation_station_assign/findPage`,{
		params:data
	});
};

/**
 * 批量保存（入参为json的list格式）
 * url /mes/operation_station_assign/save
 */
export const addStation = data => {
	return request.post(`${window.VUE_APP_URL}/mes/operation_station_assign/save`, data);
};



