import request from  "@/service/"
// import {VUE_APP_URL} from '@/config'

console.log(request)

/**
 * 查询
 *  url /mes/material/findMaterial
 */
export const getData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/material/findMaterial`, data);
};

/**
 * 新增
 *  url /mes/material/insert
 */
export const addData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/material/insert`, data);
};

/**
 * 修改
 *  url /mes/material/udpate
 */
export const updateData = data => {
  return request.put(`${window.VUE_APP_URL}/mes/material/udpate`, data);
};

/**
 * 删除
 *  url /mes/material/delete
 */
export const deleteData = data => {
  return request.delete(`${window.VUE_APP_URL}/mes/material/delete`, {
    params: data
  });
};

