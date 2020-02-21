import request from  "@/service/"

/**
 * 按条件查找数据收集组
 *  url /mes/dcData/findDcGroup
 */
export const getCollectionData = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcData/findDcGroup`,data);
};

/**
 * 按条件查找数据收集组
 *  url /mes/dcData/findDcGroupData
 */
export const findDcGroupDataHttp = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcData/findDcGroupData`,data);
};

/**
 * 校验数据收集的参数
 * url /mes/dcData/checkParam
 */
export const checkParamData = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcData/checkParam`,data);
};

/**
 * 保存数据收集结果
 * url /mes/dcData/saveDataCollectResult
 */
export const saveCollectionData = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcData/saveDataCollectResult`,data);
};

/**
 * 查询启用的参数列表
 */
export const getParamsList = data => {
	return request.get(`${window.VUE_APP_URL}/mes/dcParameterMeasure/findActiveDcParameterMeasureList`,{
		params:data
	});
};

/**
 * 查询物料号列表
 *  url /mes/material/findMaterial
 */
export const getMaterialList = data => {
	return request.post(`${window.VUE_APP_URL}/mes/material/findMaterial?currentPage=${data.currentPage}&deleteFlag=${data.deleteFlag}&pageSize=${data.pageSize}&tenantSiteCode=${data.tenantSiteCode}&mat=${data.mat}&matRev=${data.matRev}`);
};