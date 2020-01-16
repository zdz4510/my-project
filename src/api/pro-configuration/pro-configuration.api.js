import request from "@/service/";

/**
 * /mes/listPodConfigName
查询生产面板名称下拉列表
*/
export const listPodConfigNameRequest = data => {
    return request.get(`${window.VUE_APP_URL}/mes/listPodConfigName`, data);
};

/**
 * /mes/podConfig/{podConfigName}
通过名称查询一条生产界面信息
*/
export const podConfigRequest = data => {
    return request.get(`${window.VUE_APP_URL}/mes/podConfig/${data}`, data);
};
/**
 * /mes/podConfig/{podConfigName}
逻辑删除生产面板
*/
export const deleteRequest = data => {
    return request.delete(`${window.VUE_APP_URL}/mes/podConfig/${data}`, data);
};

/**
 * 
/mes/podConfig
新增或修改生产面板
*/
export const addOrModiaRequest = data => {
    return request.post(`${window.VUE_APP_URL}/mes/podConfig`, data);
};