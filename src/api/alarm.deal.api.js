import request from "@/service/";

/* 预警处理*/

/**
 * 查询预警事件处理信息
 *  url /mes/alarmProcessing/listPage
 */
export const getAlarmGroupList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/alarmProcessing/listPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`, data);
};


/**
 * 批量修改确认状态标记
 *  url /mes/alarmProcessing/saveAckFlagBatch
 */

export const updateAckData = data => {
  return request.put(`${window.VUE_APP_URL}/mes/alarmProcessing/saveAckFlagBatch`, data);
};

/**
 * 批量修改初始化状态标记
 *  url /mes/alarmProcessing/saveClearFlagBatch
 */

export const updateInitData = data => {
  return request.put(`${window.VUE_APP_URL}/mes/alarmProcessing/saveClearFlagBatch`, data);
};

/**
 * 批量删除处理事件
 * url /mes/alarmProcessing/deleteBatch
 */
export const deleteData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmProcessing/deleteBatch`,data);
};

/**
 * 根据条件查询预警事件涉及SN序列/lot序列
 *  url /mes/alarmMatList/listPage
 */
export const getSequenceList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/alarmMatList/listPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`, data);
};