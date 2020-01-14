import request from "@/service/";


export const getData = data => {
    return request.post(`${window.VUE_APP_URL}/mes/packagingConfiguration/findPackagingConfigurationList`, data);
};