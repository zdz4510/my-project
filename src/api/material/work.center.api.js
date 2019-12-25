import request from  "@/service/"

/* 工作中心*/
/**
 * 查询列表
 *  url /mes/workCenter/findPage
 */
export const getWorkCenterList = data => {
	return request.post(`${window.VUE_APP_URL}/mes/workCenter/findPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&workCenter=${data.workCenter}`);
};
/**
 * 保存
 *  url /mes/workCenter/save
 */
export const saveWorkCenter = data => {
	return request.post(`${window.VUE_APP_URL}/mes/workCenter/save?workCenter=${data.workCenter}&workCenterDes=${data.workCenterDes}&workCenterRelation=${data.workCenterRelation}`);
};

/**
 * 删除个人中心
 *  url /mes/workCenter/delete
 */
// export const deleteWorkCenter = data => {
//   return request.delete(`${window.VUE_APP_URL}/mes/workCenter/delete`, {
// 		params:data
// 	});
// };

export const deleteWorkCenter = data => {
  return request.delete(`${window.VUE_APP_URL}/mes/workCenter/delete`, {
		params:data
	});
};