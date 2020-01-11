import request from "@/service/";
// import qs from "qs";

/**
 * Lot状态获取接口
 *  url /mes/splitLot/findLotAtOperation
 */
export const findLotAtOperationHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/splitLot/findLotAtOperation`, {
    params: data
  });
};
