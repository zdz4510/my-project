import request from "@/service/";

/**
 * 根据代码类型，（代码）模糊查询通用代码
 *  url /mes/generalCodeService/findRecord
 */
export const findRecordHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/generalCodeService/findRecord`,
    {
      params: data
    }
  );
};

/**
 * 通过通用编码查询通用代码信息
 *  url /mes/generalCodeService/findGeneralCode
 */
export const findGeneralCodeHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/generalCodeService/findGeneralCode`,
    {
      params: data
    }
  );
};
