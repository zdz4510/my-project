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

/**
 * Lot状态完成接口
 *  url /LotStepStatusService/setLotsStatusDone
 */
export const setLotsStatusDoneHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/LotStepStatusService/setLotsStatusDone?comment=${data.comment}`,
    data.lots
  );
};

/**
 * 步骤操作接口
 *  url /LotStepStatusService/saveLotStepStatus
 */
export const saveLotStepStatusHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/LotStepStatusService/saveLotStepStatus`,
    data
  );
};

/**
 * Lot步骤更改规则获取
 *  url /LotStepStatusService/getLotStepChangRule
 */
export const getLotStepChangRuleHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/LotStepStatusService/getLotStepChangRule`,
    { params: data }
  );
};
