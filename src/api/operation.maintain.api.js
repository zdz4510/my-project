import request from  "@/service/"
/**
 * 获取所有工序
 * url /mes/operation/getAllOperation
 */
export const getAllOperation = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/getAllOperation`, {
    params: data
  });
};

// /mes/resource_group/listAllResourceGroup
/**
 * 获取所有设备类型
 * url /mes/resource_group/listAllResourceGroup
 */
export const getAllResourceGroup = data => {
  return request.get(`${window.VUE_APP_URL}/mes/resource_group/listAllResourceGroup`, {
    params: data
  });
};

/**
 * 分页查询工序
 * url /mes/operation/findPage
 */
export const getOperationList = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/findPage`, {
    params: data
  });
};

/**
 * 工序名称查询
 * url /mes/operation/findOperation
 */
export const getOperationByName = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/findOperation`, {
    params: data
  });
};


/**
 * 对工序进行添加或者更新，存在tenantSiteCode，operation对应的记录则为更新记录否则为添加新记录
 * url /mes/operation/saveOperation
 */
export const saveOperation = data => {
	return request.post(`${window.VUE_APP_URL}/mes/operation/saveOperation`, data);
};

/**
 * 根据operation工序字段对工序进行删除
 *  url /mes/operation/deleteOperation
 */
export const deleteOperation = data => {
  return request.delete(`${window.VUE_APP_URL}/mes/operation/deleteOperation?${data}`,);
};

/**
 * 获取所有上岗证
 * url /mes/cert/listAllCert
 */
export const getAllCert = data => {
  return request.get(`${window.VUE_APP_URL}/mes/cert/listAllCert`, {
    params: data
  });
};
/**
 * 分页查询所有工序
 * url /operation/findPage
 */
export const findPageHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/findPage`, {
    params: data
  });
};