import request from "@/service/";


export const getData = data => {
    return request.get(`${window.VUE_APP_URL}/mes/packagingConfiguration/findPackagingConfigurationList`, data);
};


export const getMaterialList = data => {
    return request.post(`${window.VUE_APP_URL}/mes/material/findMaterial?currentPage=${data.currentPage}&deleteFlag=${data.deleteFlag}&pageSize=${data.pageSize}&tenantSiteCode=${data.tenantSiteCode}&mat=${data.mat}&matRev=${data.matRev}`);
};

export const addPackagingConfiguration = data => {
    return request.post(`${window.VUE_APP_URL}/mes/packagingConfiguration/addPackagingConfiguration`, data);
};

export const deletePackagingConfigurationBatch = data => {
    return request.post(
        `${window.VUE_APP_URL}/mes/packagingConfiguration/deletePackagingConfigurationBatch`, data
    );
};

export const updatePackagingConfiguration = data => {
    return request.put(
        `${window.VUE_APP_URL}/mes/packagingConfiguration/updatePackagingConfiguration`, data);
};

//分页查询
export const getPagData = data => {
    return request.get(`${window.VUE_APP_URL}/mes/packagingConfiguration/findPackagingConfigurationPage?currentPage=${data.currentPage}&mat=${data.mat}&pageSize=${data.pageSize}`);
};

