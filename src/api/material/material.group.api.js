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
 * 新增时拿到所有物料信息（去重）
 *  url /mes/matGroup/getAllDistinct
 */
export const getAllDistinctHttp = () => {
  // const params = qs.stringify(data);
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/getAllDistinct`);
};

/**
 * 不分页查询所有信息
 *  url /mes/matGroup/listALL
 */
export const listALLMaterialGroupHttp = () => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/listALL`);
};

/**
 * 保存
 *  url /mes/matGroup/save
 */
export const saveHttp = data => {
  console.log(data);
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/save`, data);
};

/**
 * 删除
 *  url /mes/matGroup/delete
 */
export const deleteHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/delete`, data);
};
