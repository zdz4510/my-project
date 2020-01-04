import request from "@/service/";
import qs from "qs";

/* 工作中心*/
/**
 * 查询列表
 *  url /mes/workCenter/findPage
 */
export const getWorkCenterList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/workCenter/findPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&workCenter=${data.workCenter}`
  );
};
/**
 * 保存
 *  url /mes/workCenter/save
 */
export const saveWorkCenter = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/workCenter/save?workCenter=${data.workCenter}&workCenterDes=${data.workCenterDes}&workCenterRelation=${data.workCenterRelation}&status=${data.status}&workCenterType=${data.workCenterType}`
  );
};

/**
 * 删除工作中心
 *  url /mes/workCenter/delete
 */
// export const deleteWorkCenter = data => {
//   return request.delete(`${window.VUE_APP_URL}/mes/workCenter/delete`, {
// 		params:data
// 	});
// };

export const deleteWorkCenter = data => {
  return request.post(`${window.VUE_APP_URL}/mes/workCenter/delete`, data);
};

/**
 * 查询所有
 * url /mes/workCenter/listAll
 */
export const listAllHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/workCenter/listAll?${params}`,
    data
  );
};

/**
 * 模糊搜索
 * url /mes/workCenter/findPage
 */
export const findPageHttp = () => {
  return request.post(`${window.VUE_APP_URL}/mes/workCenter/findPage`);
};
