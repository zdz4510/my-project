import request from  "@/service/"

/* 编码规则 */
/**
 * 查询
 *  url /mes/nextNumberService/findNextNumberConfiguration
 */
export const getNextNumberList = data => {
	return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/findNextNumberConfiguration?pageSize=${data.pageSize}&currentPage=${data.currentPage}`, data);
};

/**
 * 物料组搜索
 *  url /mes/nextNumberService/getMatGroupList
 */
export const searchMatGroup = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/getMatGroupList`, data);
};

/**
 * 物料搜索
 *  url /mes/nextNumberService/getMatList
 */
export const searchMat = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/getMatList`, data);
};


/**
 * 保存
 *  url /mes/nextNumberService/saveNextNumberConfiguration
 */
export const saveNextNumber = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/saveNextNumberConfiguration`, data);
};

/**
 * 删除
 *  url /mes/nextNumberService/deleteNextNumberConfiguration
 */
export const deleteNextNumber = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/deleteNextNumberConfiguration`, data);
};
