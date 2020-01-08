import request from "@/service/";
import qs from "qs";

/**
 * 查询
 *  url /mes/matGroup/findPage
 */
export const findPageHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/matGroup/findPage?${params}`,
    data
  );
};

/**
 * 不分页查询所有信息
 *  url /mes/matGroup/listALL
 */
export const listALLHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/listALL`, data);
};

/**
 * 保存
 *  url /mes/matGroup/save
 */
export const saveHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/save`, data);
};

/**
 * 删除
 *  url /mes/matGroup/delete
 */
export const deleteHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/delete`, data);
};
