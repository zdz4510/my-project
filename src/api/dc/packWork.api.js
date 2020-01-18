import request from "@/service/";

export const findContainerList = data => {
    return request.post(`${window.VUE_APP_URL}/mes/container/findContainerList`, data);
};


// 完成装入
export const saveContainerInfo = data => {
    return request.post(`${window.VUE_APP_URL}/mes/container/saveContainerInfo`, data);
};

//重置按钮 
export const resetContainerRelationship = data => {
    return request.get(`${window.VUE_APP_URL}/mes/containerRelationship/resetContainerRelationship?mainNumber=${data}`);
};

