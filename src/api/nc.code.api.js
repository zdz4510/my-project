import request from "@/service/";

/* 不合格代码组*/
/**
 * 查询列表
 *  url /mes/nc_code/listNcCode
 */
export const getNcCodeList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/nc_code/listNcCode?currentPage=${data.currentPage}&pageSize=${data.pageSize}&ncCode=${data.ncCode}`
  );
};
/**
 * 保存
 *  url /mes/nc_code/save
 */
export const saveNcCode = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nc_code/save`, data);
};

/**
 * 删除
 *  url /mes/nc_code/deleteNcCode
 */

export const deleteNcCode = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nc_code/deleteNcCode`, data);
};

/**
 * 获取所有已启用不合格代码组
 * url /mes/nc_group/getEnableNcGroup
 */
export const getEnableNcGroup = () => {
  return request.get(`${window.VUE_APP_URL}/mes/nc_group/getEnableNcGroup`);
};
