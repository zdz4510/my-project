import request from "@/service/";

/* 预警分组维护*/
/**
 * 查询预警事件分组信息
 *  url /mes/alarmGroup/listPage
 */
export const getAlarmGroupList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/alarmGroup/listPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`, data);
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
 * 新增预警事件分组信息
 *  url /mes/alarmGroup/insert
 */
export const saveData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmGroup/insert`,data);
};
/**
 * 修改预警事件分组信息
 *  url /mes/alarmGroup/save
 */

export const updateData = data => {
  return request.put(`${window.VUE_APP_URL}/mes/alarmGroup/save`, data);
};

/**
 * 批量删除预警分组
 * url /mes/alarmGroup/deleteBatch
 */
export const deleteData = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmGroup/deleteBatch`,data);
};

/**
 * 查询预警事件分组配置信息
 * url /mes/alarmGroup/listSetupPage
 */
export const getWorkerInfo = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmGroup/listSetupPage`,data);
};

/**
 * 校验预警事件分组是否存在
 * url /mes/alarmGroup/checkExists
 */
export const checkExists = data => {
  return request.post(`${window.VUE_APP_URL}/mes/alarmGroup/checkExists`,data);
};

