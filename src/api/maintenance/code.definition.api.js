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

/**
 * 根据通用代码名（字段）从字段表模糊查询字段信息
 *  url /mes/generalCodeService/findField
 */
export const findFieldHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/generalCodeService/findField`, {
    params: data
  });
};

/**
 * 删除通用代码信息
 *  url /mes/generalCodeService/deleteGeneralCode
 */
export const deleteGeneralCodeHttp = data => {
  return request.delete(
    `${window.VUE_APP_URL}/mes/generalCodeService/deleteGeneralCode`,
    {
      params: data
    }
  );
};

/**
 * 新增或保存通用代码信息
 *  url /mes/generalCodeService/saveGeneralCode
 */
export const saveGeneralCodeHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/generalCodeService/saveGeneralCode`,
    data
  );
};
