import request from "@/service/";
import qs from "qs";

/**
 *  获取物料清单
 *  url /mes/bom/listBom
 */
export const queryMaterialList = data => {
  return request.get(`${window.VUE_APP_URL}/mes/bom/listBom?${qs.stringify(data)}`);
};

/**
 *  删除物料清单数据
 *  url /mes/bom/delete
 */
export const deleteMaterial = data => {
  return request.post(`${window.VUE_APP_URL}/mes/bom/delete`, data);
};


/**
 *  查询所有物料
 *  url /mes/material/listAll
 */
export const queryMaterialAll = () => {
  return request.post(`${window.VUE_APP_URL}/mes/material/listAll`);
};

/**
 *  新增、修改、删除
 *  url /mes/bom/saveBom
 */
export const saveBom = (params) => {
  return request.post(`${window.VUE_APP_URL}/mes/bom/saveBom`, params);
};
