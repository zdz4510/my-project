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

/**
 * 模糊查询所有LOT
 *  url /mes/lot/listLot
 */
export const listLotHttp = data => {
  // const params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}/mes/lot/listLot`, {
    params: data
  });
};

/**
 * 拆分Lot接口
 *  url /splitLot/splitLot
 */
export const splitLotHttp = data => {
  // const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/splitLot/splitLot?lot=${data.lot}`,
    data.splitList
  );
};
