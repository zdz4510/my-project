import request from  "@/service/"

/**
 * 查询列表
 *  url /mes/dcDataReport/findDcDataPage
 */
export const getDataReportList = data => {
	return request.post(`${window.VUE_APP_URL}/mes/dcDataReport/findDcDataPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`,data);
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
