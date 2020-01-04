import request from "@/service/";
// import qs from "qs";

/**
 * 根据上岗证分页查询
 *  url /mes/cert/listCert
 */
export const listCertHttp = data => {
  //   const params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}/mes/cert/listCert`, {
    params: data
  });
};

/**
 * 获取所有上岗证
 *  url /mes/cert/listAllCert
 */
export const listAllCertHttp = data => {
  //   const params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}/mes/cert/listAllCert`, {
    params: data
  });
};

/**
 * 根据上岗证编号删除上岗证信息
 *  url /mes/cert/delete
 */
export const deleteHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/cert/delete`, data);
};

/**
 * 获取未分配工序的上岗证
 *  url /mes/cert/listUnassignedCert
 */
export const listUnassignedCertHttp = data => {
  //   const params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}/mes/cert/listUnassignedCert`, {
    params: data
  });
};

/**
 * 保存上岗证信息
 *  url /mes/cert/save
 */
export const saveHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/cert/save`, data);
};
