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
 * 根据联合编码、工序查询
 * url /mes/operation/findPage
 */
export const getDataByOperation = data => {
	return request.post(`${window.VUE_APP_URL}/mes/operation/findPage?operation=${data.operation}&tenantSiteCode=${data.tenantSiteCode}`);
};

/**
 * 对工序进行添加或者更新，存在tenantSiteCode，operation对应的记录则为更新记录否则为添加新记录
 * url /mes/operation/save
 */
export const addOperation = data => {
	return request.post(`${window.VUE_APP_URL}/mes/operation/save`, data);
};

/**
 * tenantSiteCode、operation工序字段对工序进行删除
 *  url /mes/operation/delete
 */
export const deleteOperatin = data => {
  return request.delete(`${window.VUE_APP_URL}/mes/operation/delete`, {
    params: data
  });
};


