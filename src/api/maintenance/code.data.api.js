import request from "@/service/";
import qs from "qs";

/**
 * 通过通用编码查询通用代码数据信息
 *  url /mes/generalCodeDataService/findGeneralCode
 */
export const findGeneralCodeHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/generalCodeDataService/findGeneralCode?${params}`,
    data
  );
};

/**
 * 保存通用代码的编码规则
 *  url /mes/generalCodeDataService/saveGeneralCodeData
 */
export const saveGeneralCodeDataHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/generalCodeDataService/saveGeneralCodeData`,
    data
  );
};

/**
 * 删除通用代码对应的编码规则
 *  url /mes/generalCodeDataService/deleteGeneralCodeData
 */
export const deleteGeneralCodeDataHttp = data => {
  return request.delete(
    `${window.VUE_APP_URL}/mes/generalCodeDataService/deleteGeneralCodeData`,
    {
      params: data
    }
  );
};
