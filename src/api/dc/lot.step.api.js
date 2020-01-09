import request from "@/service/";
// import qs from "qs";

/**
 * 分页查询lot步骤
 *  url /mes/lotStep/findLotStepPage
 */
export const findLotStepPageHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/lotStep/findLotStepPage`, {
    params: data
  });
};

/**
 * 根据lot步骤接口查询
 *  url /mes/lotStep/findLotStepList
 */
export const findLotStepListHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/lotStep/findLotStepList`, {
    params: data
  });
};

/**
 * 添加lot步骤信息
 *  url /mes/lotStep/addLotStep
 */
export const addLotStepHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/lotStep/addLotStep`, data);
};

/**
 * 修改lot步骤信息
 *  url /mes/lotStep/updateLotStep
 */
export const updateLotStepHttp = data => {
  return request.put(`${window.VUE_APP_URL}/mes/lotStep/updateLotStep`, data);
};

/**
 * 批量删除lot步骤信息
 *  url /mes/lotStep/deleteLotStepBatch
 */
export const deleteLotStepBatchHttp = data => {
  return request.delete(
    `${window.VUE_APP_URL}/mes/lotStep/deleteLotStepBatch`,
    {
      params: data
    }
  );
};
