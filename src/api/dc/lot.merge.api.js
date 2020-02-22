import request from "@/service/";
import qs from "qs";

/**
 * Lot状态获取接口
 *  url /mes/mergeLot/findLotAtOperation
 */
export const findLotAtOperationHttpMerge = data => {
  return request.get(`${window.VUE_APP_URL}/mes/mergeLot/findLotAtOperation`, {
    params: data
  });
};

/**
 * 1步骤Lot状态获取接口
 *  url /mes/mergeLot/findLotAtOperation
 */
export const findLotAtOperationHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/mergeLot/findLotAtOperation`, {
    params: data
  });
};

/**
 * 2步骤Lot添加接口
 *  url /mes/mergeLot/addLotAtOperation
 */
export const addLotAtOperationHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/mergeLot/addLotAtOperation?${params}`,
    data
  );
};

/**
 * 合并Lot接口
 *  url /mes/mergeLot/mergeLot
 */
export const mergeLotHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/mergeLot/mergeLot?lot=${data.lot}`,
    data.mergeList
  );
};
