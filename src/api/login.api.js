import request from "@/service/";

// login
export const login = data => {
    return request.post(`${window.VUE_APP_URL}sso/cus/login`, data);
};
