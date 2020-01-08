import request from "@/service/";

/* 自定义字段维护*/

/**
 * 根据自定义字段定义维护表接口查询
 *  url /mes/customizedFieldDef/findCustomizedFieldDefList
 */
export const getCustomizeInfo = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/customizedFieldDef/findCustomizedFieldDefList?customizedItem =${data.customizedItem }&tenantSiteCode=${data.tenantSiteCode}`);
};

/**
 * 保存自定义字段定义维护表信息
 *  url /mes/customizedFieldDef/saveCustomizedField
 */
export const saveData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/customizedFieldDef/saveCustomizedField`, data);
};

