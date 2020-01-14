import request from "@/service/";
// import qs from "qs";

/**
 * Lot状态获取接口
 *  url /mes/mergeLot/findLotAtOperation
 */
export const findLotAtOperationHttpMerge = data => {
  return request.get(`${window.VUE_APP_URL}/mes/mergeLot/findLotAtOperation`, {
    params: data
  });
};
