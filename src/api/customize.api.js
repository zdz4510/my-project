import request from "@/service/";
import qs from "qs";

/* 自定义字段维护*/

/**
 * 根据自定义字段定义维护表接口查询
 *  url /mes/customizedFieldDef/findCustomizedFieldDefList
 */
export const getCustomizeInfo = data => {
  console.log(data)
  return request.get(
    `${window.VUE_APP_URL}/mes/customizedFieldDef/findCustomizedFieldDefList?customizedItem=${data.FIELD_01}&tenantSiteCode=${data.tenantSiteCode}`
  );
};

/**
 * 保存自定义字段定义维护表信息
 *  url /mes/customizedFieldDef/saveCustomizedField
 */
export const saveData = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/customizedFieldDef/saveCustomizedField`,
    data
  );
};

/**
 * 根据通用代码名（字段）从字段表模糊查询字段信息
 *  url /mes/generalCodeService/findField
 */
export const getField = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/generalCodeService/findLimitGeneralField?${qs.stringify(data)}`
  );
};

/**
 * 根据代码类型，（代码）模糊查询通用代码
 *  url /mes/generalCodeService/findRecord
 */
export const getCode = () => {
  return request.get(
    `${window.VUE_APP_URL}/mes/generalCodeService/findLimitGeneralCode?fieldType=C`
  );
};

/**
 * 查询自定义项目名称
 *  url /mes/generalCodeDataService/findGeneralCode
 */
export const getNames = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/generalCodeDataService/findGeneralCode?generalCode=${data.generalCode}`
  );
};

/**
 * 通过通用编码查询通用代码数据信息,传入自定义项目可模糊查询
 *  url /generalCodeDataService/findGeneralCodeDataByCustomItem
 */
export const findGeneralCodeDataByCustomItemHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes//generalCodeDataService/findGeneralCodeDataByCustomItem?${params}`,
    data
  );
};
