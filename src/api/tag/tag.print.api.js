import request from "@/service/";
import qs from "qs";
/**
 * /mes/labelPrinting/getPrintDevicesAvailable
 * 获取可用的打印机列表
 * @param {*} data
 * label
 * currentPage
 * pageSize
 */
export const getPrintDevicesAvailable = data => {
  const params = qs.stringify(data);
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/getPrintDevicesAvailable?${params}`);
};

/**
 * /mes/labelPrinting/insertLabelPrintingLogBatch
 * 批量新增标签打印记录
 * labelPrintingLogInfoList
 */

export const insertLabelPrintingLogBatch = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/insertLabelPrintingLogBatch`, data);
};

/**
 * /mes/labelPrinting/printLabel
    打印标签(模板)
 * 
 */
export const printLabel = data => {
  return request.delete(`${window.VUE_APP_URL} /mes/labelPrinting/printLabel`, data);
};

/**
 * /mes/labelPrinting/searchByLotNo 
 *  根据LOT/容器号检索
 */
export const searchByLotNo = data => {
  return request.post(`${window.VUE_APP_URL}/mes/labelPrinting/searchByLotNo`, data);
};



