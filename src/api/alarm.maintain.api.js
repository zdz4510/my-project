import request from "@/service/";

/* 预警事件维护*/
/**
 * 根据事件编号、事件主题查询
 *  url /mes/alarmDef/listPage
 */
export const getAlarmDefList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/alarmDef/listPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`, data);
};
/**
 * 根据预警事件编号模糊查询
 *  url /mes/alarmDef/listAlarm
 */
export const getDataByAlarm = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/alarmDef/listAlarm`,{
      params:data
    });
};

/**
 * 添加预警事件信息
 *  url /mes/alarmDef/insert
 */
export const saveData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmDef/insert`,data);
};
/**
 * 修改预警事件信息
 *  url /mes/alarmDef/update
 */

export const updateData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmDef/update`, data);
};

/**
 * 批量删除预警事件信息
 * url /mes/alarmDef/deleteBatch
 */
export const deleteData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmDef/deleteBatch`,data);
};

/**
 * 查询预警事件关联通知人员信息(复制事件通知人员)
 * url /mes/alarmDefInform/list
 */
export const getWorkerInfo = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmDefInform/list`,data);
};

export const getUnallocated = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmDefInform/listUnallocated`,data);
};

/**
 * 批量保存预警事件通知人员信息
 * url /mes/alarmDefInform/saveBatch
 */
export const saveBatch = data => {
  return request.put(`${window.VUE_APP_URL}/mes/alarmDefInform/saveBatch`,data);
};

