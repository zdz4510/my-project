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
