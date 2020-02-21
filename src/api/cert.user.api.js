import request from "@/service/";
import qs from "qs";
/* 用户证明分配*/

/**
 * 查询数据
 *  url /mes/certUser/findPage
 */
export const getCertUserList = data => {
    return request.post(
        `${window.VUE_APP_URL}/mes/certUser/findPage?${qs.stringify(data)}`);
};
/**
 * 保存
 *  url /mes/certUser/save
 */

export const saveData = data => {
    return request.post(`${window.VUE_APP_URL}/mes/certUser/save`, data);
};

/**
 * 查询上岗证
 *  url /mes/certUser/findCert
 */

export const findCert = data => {
    return request.post(`${window.VUE_APP_URL}/mes/certUser/findCert`, data);
};

/**
 * 批量删除
 * url /mes/certUser/delete
 */
export const deleteData = data => {
<<<<<<< HEAD
    return request.post(`${window.VUE_APP_URL}/mes/certUser/delete`, data);
=======
  return request.post(`${window.VUE_APP_URL}/mes/certUser/delete`, data);
>>>>>>> huyoujuan
};

/**
 * 获取所有上岗证
 *  url /mes/certUser/getAllCert
 */

export const getAllCert = () => {
<<<<<<< HEAD
    return request.post(`${window.VUE_APP_URL}/mes/certUser/getAllCert`);
};
/**
 * /certUser/checkUser
新增时对输入用户进行判断

 */

export const checkUser = data => {
    return request.post(`${window.VUE_APP_URL}/mes/certUser/checkUser?user=${data.user}`, data);
};
=======
  return request.post(`${window.VUE_APP_URL}/mes/certUser/getAllCert`);
};
>>>>>>> huyoujuan
