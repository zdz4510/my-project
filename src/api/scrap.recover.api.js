import request from "@/service/";

/* 删除/恢复*/

/**
 * 删除查询
 *  url /mes/scrapAndDelete/findPage
 */
export const getScrapList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/scrapAndDelete/findPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&code=${data.code}&codeType=${data.codeType}`);
};


/**
 * 报废标记
 *  url /mes/scrapAndDelete/scrap
 */

export const scrapMark = data => {
  return request.post(`${window.VUE_APP_URL}/mes/scrapAndDelete/scrap?codeType=${data.codeType}`, data.list);
};

/**
 * 恢复查询
 *  url /mes/scrapAndDelete/findUnScrapPage
 */

export const getRecoverList = data => {
  return request.post(`${window.VUE_APP_URL}/mes/scrapAndDelete/findUnScrapPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&code=${data.code}&codeType=${data.codeType}`);
};

/**
 * 恢复标记
 * url /mes/scrapAndDelete/unScrap
 */
export const recoverMark = data => {
  return request.post(`${window.VUE_APP_URL}/mes/scrapAndDelete/unScrap?codeType=${data.codeType}`, data.list);
};

/**
 * 记录
 *  url /mes/scrapAndDelete/findScrapLogPage
 */
export const getLogList = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/scrapAndDelete/findScrapLogPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}&codeType=${data.codeType}`);
};