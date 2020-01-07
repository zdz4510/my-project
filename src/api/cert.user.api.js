import request from "@/service/";

/* 用户证明分配*/

/**
 * 查询数据
 *  url /mes/certUser/findPage
 */
export const getCertUserList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/certUser/findPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&user=${data.user}`);
};


/**
 * 保存
 *  url /mes/certUser/save
 */

export const saveData = data => {
  return request.put(`${window.VUE_APP_URL}/mes/certUser/save`, data);
};

/**
 * 查询上岗证
 *  url /mes/certUser/findCert
 */

export const findCert = data => {
  return request.put(`${window.VUE_APP_URL}/mes/certUser/findCert`, data);
};

/**
 * 批量删除
 * url /mes/certUser/delete
 */
export const deleteData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/certUser/delete`,data);
};
