import request from "@/service/";
// import qs from "qs";

/**
 * Lot步骤状态明细
 *  url /mes/LotStepStatusService/findLotStepDetail
 */
export const findLotStepDetailHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/LotStepStatusService/findLotStepDetail`,
    data
  );
};

/**
 * Lot步骤查询接口
 *  url /mes/LotStepStatusService/findLotStepStatus
 */
export const findLotStepStatusHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/LotStepStatusService/findLotStepStatus`,
    data
  );
};

/**
 * Lot查询，支持模糊查询
 *  url /mes/LotStepStatusService/searchLotDetail
 */
export const searchLotDetailHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/LotStepStatusService/searchLotDetail`,
    data
  );
};
