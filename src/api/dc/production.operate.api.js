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

/**
 * 分页查询所有工序
 *  url /mes/operation/findPage
 */
export const findPageHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/operation/findPage`, {
    params: data
  });
};

/**
 * 设备编码分页查询设备信息
 *  url /mes/resource/findResourceList
 */
export const findResourceListHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/resource/findResourceList`, {
    params: data
  });
};