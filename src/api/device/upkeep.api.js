import request from "@/service/";
// // import {VUE_APP_URL} from '@/config'

/**
 * 根据设备编码，保养状态查询设备保养配置
 *  url /mes/resourceMaintenanceLog/listResourceMaintenanceLog
 */
export const listResourceMaintenanceLogHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/resourceMaintenanceLog/listResourceMaintenanceLog`,
    {
      params: data
    }
  );
};

/**
 * 导出设备保养作业Excel
 *  url /mes/resourceMaintenanceLog/exportExcel
 */
export const exportExcelHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/resourceMaintenanceLog/exportExcel`,
    {
      params: data
    }
  );
};

/**
 * 批量确认保养
 *  url /mes/resourceMaintenanceLog/listConfirmService
 */
export const deleteResourceGroupHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/resourceMaintenanceLog/listConfirmService?maintenanceDescription=${data.maintenanceDescription}`,
    data.data
  );
};
