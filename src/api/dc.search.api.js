import request from  "@/service/"

/**
 * 分页查询数据收集结果数据报表
 *  url /mes/dcDataReport/findDcDataPage
 */
export const findDcDataPageHttp = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcDataReport/findDcDataPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`,data);
};

/**
 * 分页查询数据收集结果参数数据报表
 *  url /dcDataReport/findDcParamPage
 */
export const findDcParamPageHttp = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcDataReport/findDcParamPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`,data);
};

/**
 * 导出
 *  url /mes/dcDataReport/exportExcel
 */
export const exportExcelData = data => {
	return request.get(`${window.VUE_APP_URL}/mes/dcDataReport/exportExcel?collectionType=${data.collectionType}&dcGroup=${data.dcGroup}&resource=${data.resource}&tenantSiteCode=${data.tenantSiteCode}`);
};

/**
 * 删除
 *  url /mes/dcDataReport/deleteDcDataBatch
 */
export const deleteDcSearch = (data) => {
  return request.delete(`${window.VUE_APP_URL}/mes/dcDataReport/deleteDcDataBatch`, {
		data: data
	});
};
