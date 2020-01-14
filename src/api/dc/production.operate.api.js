import request from "@/service/";
// import qs from "qs";

/**
 * 查询Web操作界面的Lot列表
 *  url /mes/podConfig/listPodLot
 */
export const listPodLotHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/podConfig/listPodLot`, {
    params: data
  });
};
