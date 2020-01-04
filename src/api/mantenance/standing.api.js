import request from "@/service/";
import qs from "qs";

/**
 * 站位删除
 *  url /mes/station/deleteStationBatch
 */
export const deleteStationBatchHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/station/deleteStationBatch`,
    data
  );
};

/**
 * 站位分页模糊查询
 *  url /mes/station/findPage
 */
export const findPageHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/station/findPage?${params}`,
    params
  );
};

/**
 * 站位保存
 *  url /mes/station/save
 */
export const saveHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/station/save`, data);
};

/**
 * 导入站位维护
 *  url /mes/station/station/import
 */
export const importHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/station/station/import`, data);
};

/**
 * 导入模板下载
 *  url /mes/station/station/template
 */
export const findResourceGroupListHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/station/station/template`, {
    params: data
  });
};
