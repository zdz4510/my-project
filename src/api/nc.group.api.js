import request from "@/service/";

/* 不合格代码组*/
/**
 * 查询列表
 *  url /mes/nc_group/findPage
 */
export const getNcGroupList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/nc_group/findPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&ncGroup=${data.ncGroup}`
  );
};
/**
 * 保存
 *  url /mes/nc_group/save
 */
export const saveNcGroup = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nc_group/save`, data);
};

/**
 * 删除
 *  url /mes/nc_group/delete
 */

export const deleteNcGroup = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nc_group/delete`, data);
};

/**
 * 获取所有工序
 * url /mes/operation/getAllOperation
 */
export const getAllOperation = () => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/getAllOperation`);
};
