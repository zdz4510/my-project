import request from "@/service/";

/* 自定义字段维护*/

/**
 * 根据自定义字段定义维护表接口查询
 *  url /mes/customizedFieldDef/findCustomizedFieldDefList
 */
export const getCustomizeInfo = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/customizedFieldDef/findCustomizedFieldDefList?customizedItem=${data.customizedItem}&tenantSiteCode=${data.tenantSiteCode}`);
};

/**
 * 保存自定义字段定义维护表信息
 *  url /mes/customizedFieldDef/saveCustomizedField
 */
export const saveData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/customizedFieldDef/saveCustomizedField`, data);
};

/**
 * 根据通用代码名（字段）从字段表模糊查询字段信息
 *  url /mes/generalCodeService/findField
 */
export const getField = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/generalCodeService/findField?generalCode=${data.generalCode}&fieldName=${data.fieldName}`);
};

/**
 * 根据代码类型，（代码）模糊查询通用代码
 *  url /mes/generalCodeService/findRecord
 */
export const getCode = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/generalCodeService/findRecord?generalCodeGroup=${data.generalCodeGroup}&generalCode=${data.generalCode}`);
};
