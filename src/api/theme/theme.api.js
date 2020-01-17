import request from "@/service/";
import qs from "qs";

/**
 * 查询
 *  url /mes/matGroup/findPage
 */
export const findPageHttp = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/matGroup/findPage?${params}`,
    data
  );
};

/**
 * 新增时拿到所有物料信息（去重）
 *  url /mes/matGroup/getAllDistinct
 */
export const getAllDistinctHttp = () => {
  // const params = qs.stringify(data);
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/getAllDistinct`);
};

/**
 * 不分页查询所有信息
 *  url /mes/matGroup/listALL
 */
export const listALLHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/listALL`, data);
};

/**
 * 保存
 *  url /mes/matGroup/save
 */
export const saveHttp = data => {
  console.log(data);
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/save`, data);
};

/**
 * 删除
 *  url /mes/matGroup/delete
 */
export const deleteHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/matGroup/delete`, data);
};

// mes/topic/addTopic
// 添加主题维护信息
export const addTopicHttp = data => {
  return request.post(`${window.VUE_APP_URL}/mes/topic/addTopic`, data);
};

//   mes/topic/findTopicPage
//   分页查询主题维护表
export const findTopicPageHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/topic/findTopicPage`, {
      params:data
  });
};

// /topic/findStationList
// 查询当前主题的分配关系
export const findStationListHttp = data => {
  return request.get(`${window.VUE_APP_URL}/mes/topic/findStationList`, {
      params:data
  });
};

// topic/updateTopic
// 修改主题维护信息
export const updateTopicHttp = data => {
  return request.put(`${window.VUE_APP_URL}/mes/topic/updateTopic`, data);
};