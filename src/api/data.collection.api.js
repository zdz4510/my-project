import request from "@/service/";

/**
 * 查询列表
 *  url /mes/dcGroup/findDcGrouptPage
 */
export const getDataCollectionList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/dcGroup/findDcGrouptPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`,
    data
  );
};

/**
 * 查询预警事件编号
 * url /mes/alarmDef/listAlarm
 */
export const getAlarmList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/alarmDef/listAlarm?alarm=${data.alarm}`
  );
};

/**
 * 查询参数配置
 * url /mes/dcParameterMeasure/findDcParameterMeasureList
 */
export const getMeasureList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/dcParameterMeasure/findDcParameterMeasureList?dcGroup=${data.dcGroup}&tenantSiteCode=${data.tenantSiteCode}`,
    data
  );
};

/**
 * 查询数据收集配置
 * url /mes/dcSetup/findDcSetupList
 */
export const getSetupList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/dcSetup/findDcSetupList?dcGroup=${data.dcGroup}&tenantSiteCode=${data.tenantSiteCode}`,
    data
  );
};

/**
 * 保存
 *  url /mes/dcGroup/addDcGroupBatch
 */
export const saveDataCollection = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/dcGroup/addDcGroupBatch`,
    data
  );
};

/**
 * 删除
 *  url /mes/dcGroup/deleteDcGroupBatch
 */
export const deleteDataCollection = data => {
  return request.delete(
    `${window.VUE_APP_URL}/mes/dcGroup/deleteDcGroupBatch`,
    {
      data: data
    }
  );
};
