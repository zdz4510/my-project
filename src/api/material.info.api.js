import request from  "@/service/"

/* 物料维护 */
/**
 * 查询物料号列表
 *  url /mes/material/findMaterial
 */
export const getMaterialList = data => {
	return request.post(`${window.VUE_APP_URL}/mes/material/findMaterial?currentPage=${data.currentPage}&deleteFlag=${data.deleteFlag}&pageSize=${data.pageSize}&pageSize=${data.pageSize}&tenantSiteCode=${data.tenantSiteCode}&mat=${data.mat}&matRev=${data.matRev}`);
};


/**
 * 新增物料号
 *  url /mes/material/insert
 */
export const insertMaterial = data => {
  return request.post(`${window.VUE_APP_URL}/mes/material/insert`, data);
};

/**
 * 修改物料号
 *  url /mes/material/update
 */
export const modifyMaterial = data => {
  return request.post(`${window.VUE_APP_URL}/mes/material/update`, data);
};

/**
 * 删除物料号
 *  url /mes/material/delete
 */
export const deleteMaterial = data => {
  return request.post(`${window.VUE_APP_URL}/mes/material/delete`, data);
};