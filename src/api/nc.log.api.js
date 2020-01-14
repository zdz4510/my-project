import request from "@/service/";

/**
 * 查询lot
 *  url /mes/lot/listLot
 */
export const getLotList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/lot/listLot?lot=${data.lot}`
  );
};
/**
 * 查询工序
 *  url /mes/operation/getAllOperation
 */
export const getAllOperation = () => {
  return request.get(
    `${window.VUE_APP_URL}/mes/operation/getAllOperation`
  );
};
/**
 * 查询设备
 *  url /mes/resource/listAllResource
 */
export const getAllResource = () => {
  return request.get(
    `${window.VUE_APP_URL}/mes/resource/listAllResource`
  );
};
/**
 * 根据lot,工序，设备查询不合格记录
 *  url /mes/nc_data/findPage
 */
export const getDataList = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/nc_data/findPage?lot=${data.lot}&operation=${data.operation}&resource=${data.resource}`
  );
};
/**
 * 根据工序获取不合格代码组
 *  url /mes/nc_group/listByOperation
 */
export const getNcGroup = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/nc_group/listByOperation?operation=${data.operation}`
  );
};
/**
 * 根据不合格代码组查询不合格代码
 *  url /mes/nc_code/listByNcGroup
 */
export const getNcCode = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/nc_code/listByNcGroup?ncGroup=${data.ncGroup}`
  );
};
/**
 * 保存不合格记录
 *  url /mes/nc_data/saveNcData
 */
export const saveData = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/nc_data/saveNcData`, data
  );
};
/**
 * 关闭不合格记录
 *  url /mes/nc_data/closeNcData
 */
export const closeData = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/nc_data/closeNcData`, data
  );
};

