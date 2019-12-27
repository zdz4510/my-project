import request from "@/service/";
// import {VUE_APP_URL} from '@/config'

/**
 * 设备编码分页查询设备信息
 *  url /mes/resource/findResourceList
 */
export const findResourceGroupListHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/resource/findResourceList`, {
    params: data
  });
};

/**
 * 添加设备信息
 *  url /mes/resource/insertResource

 */
export const insertResourceHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/resource/insertResource
  `,
    data
  );
};

/**
 * 修改设备信息
 *  url /mes/resource/updateResource
 */
export const updateResourceHttp = data => {
  return request.put(`${window.VUE_APP_URL}/mes/resource/updateResource`, data);
};

/**
 * 批量删除设备信息
 *  url /mes/resource/deleteResourceBatch
 */
export const deleteResourceBatchHttp = data => {
  console.log(data); //[{ resource: "SB005", resourceStatus: 10 }]
  return request.post(
    `${window.VUE_APP_URL}/mes/resource/deleteResourceBatch`,
    data
  );
};

/**
 * 
根据设备编码查询设备保养配置
 *  url /mes/resourceMaintenance/findResourceMaintenanceList
 */
export const findResourceMaintenanceListHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/resourceMaintenance/findResourceMaintenanceList`,
    {
      params: data
    }
  );
};
/**
 * 获取所有待使用的设备
 *  url /mes/resource/getInactiveResource
 */
export const getInactiveResourceHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/resource/getInactiveResource`, {
    params: data
  });
};

/**
 * 根据预警事件编号模糊查询
 *  url /mes/alarmDef/listAlarm
 */
export const listAlarmHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/alarmDef/listAlarm`, {
    params: data
  });
};

/**
 * 添加和修改设备保养配置
 *  url /mes/resourceMaintenance/saveResourceMaintenance
 */
export const saveResourceMaintenanceHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/resourceMaintenance/saveResourceMaintenance`,
    data
  );
};

/**
 * 导出设备编码excel
 *  url /mes/resource/exportExcel

 */
export const exportExcelHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/resource/exportExcel
  `,
    data
  );
};
