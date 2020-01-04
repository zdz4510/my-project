import request from "@/service/";
import qs from 'qs'
/**
 * /mes/labelPrinting/getPrintDevicesAvailable
 * 验证标签打印记录是否存在,进行打印
 * @param {*} data
 * label
 * currentPage
 * pageSize
 */
export const validateLabelPrint = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrintingLog/validateLabelPrint`,data);
};

/**
 * /labelPrinting/generateImagePreview
    生成标签预览图片
 * @param {*} data 
 */
export const generateImagePreview = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/generateImagePreview`,data);
};


/**
 * /labelPrinting/getPrintDevicesAvailable
  获取可用的打印机列表
 * @param {*} data 
 */
export const getPrintDevicesAvailable = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/getPrintDevicesAvailable`,data);
};


/**
 * /labelPrinting/insertLabelPrintingLogBatch
  批量新增标签打印记录
 * @param {*} data 
 */
export const insertLabelPrintingLogBatch = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/insertLabelPrintingLogBatch`,data);
};

/**
 * /labelPrinting/printLabel
  打印标签(模板)
 * @param {*} data 
 */
export const printLabel = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/printLabel`,data);
};


/**
 *labelPrinting/searchByLotNo根据LOT/容器号检索
* @param {*} data 
 */
export const searchByLotNo = data => {
   let params =qs.stringify(data)
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/searchByLotNo?${params}`);
};

/**
 *labelPrinting/searchLabelIdListByMat  根据物料号筛选符合条件标签Id
* @param {*} data 
 */
export const searchLabelIdListByMat = data => {
  let params =qs.stringify(data)
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/searchLabelIdListByMat?${params}`);
};

