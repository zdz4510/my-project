import request from "@/service/";
import qs from "qs";
/**
 * /mes/label/listPage
 * 按标签ID模糊查询
 * @param {*} data
 * label
 * currentPage
 * pageSize
 */
export const getTagConfigList = data => {
  const params = qs.stringify(data);
  return request.post(`${window.VUE_APP_URL}/mes/label/listPage?${params}`);
};

/**
 * 添加标签信息
 */

export const addTagConfig = data => {
  return request.post(`${window.VUE_APP_URL}/mes/label/insert`, data);
};

/**
 * mes/label/deleteBatch
 *  批量删除标签信息
 */
export const deleteTagConfig = data => {
  return request.delete(`${window.VUE_APP_URL}/mes/label/insert`, data);
};

/**
 * mes/label/update
 *  修改标签信息
 */
export const updateTagConfig = data => {
  return request.post(`${window.VUE_APP_URL}/mes/label/update`, data);
};

/**
 * 根据标签ID查询已绑定关系的物料/物料组
 * mes/label/listPageLink
 */

export const getListPageLink = data => {
  return request.post(`${window.VUE_APP_URL}/mes/label/listPageLink`, data);
};


/**
 * 按物料/物料组模糊查询待绑定关系 
 * mes/label/listPageUnallocatedLink
 */

export const listPageUnallocatedLink = data => {
    const params = qs.stringify(data);
    return request.post(`${window.VUE_APP_URL}/mes/label/listPageUnallocatedLink?${params}`);
  };