import request from "@/service/";

/* 删除/恢复*/

/**
 * 删除查询
 *  url /mes/scrapAndDelete/findPage
 */
export const getDeleteList = data => {
    return request.post(
        `${window.VUE_APP_URL}/mes/scrapAndDelete/findPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&code=${data.code}&codeType=${data.codeType}`);
};


/**
 * 删除标记
 *  url /mes/scrapAndDelete/delete
 */

export const deleteMark = data => {
    return request.post(`${window.VUE_APP_URL}/mes/scrapAndDelete/delete?codeType=${data.codeType}`, data.list);
};

/**
 * 恢复查询
 *  url /mes/scrapAndDelete/findUnDeletePage
 */

export const getRecoverList = data => {
    return request.post(`${window.VUE_APP_URL}/mes/scrapAndDelete/findUnDeletePage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&code=${data.code}&codeType=${data.codeType}`);
};

/**
 * 恢复标记
 * url /mes/scrapAndDelete/unDelete
 */
export const recoverMark = data => {
    return request.post(`${window.VUE_APP_URL}/mes/scrapAndDelete/unDelete?codeType=${data.codeType}`, data.list);
};

/**
 * 记录
 *  url /mes/scrapAndDelete/findDeleteLogPage
 */
export const getLogList = data => {
    return request.post(
        `${window.VUE_APP_URL}/mes/scrapAndDelete/findDeleteLogPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&code=${data.code}&codeType=${data.codeType}`);
};