import request from "@/service/";
/**
 *  
 *  获取所有工序
 *  url /mes/operation/getAllOperation
 */
export const getAllOperation = () => {
    return request.get(
      `${window.VUE_APP_URL}/mes/operation/getAllOperation`,
    );
  };


  /**
 *  
 *  创建工艺路线
 *  url /mes/router/createRouter
 */
export const createRouter = data => {
    return request.post(
      `${window.VUE_APP_URL}/mes/router/createRouter`,
      data
    );
  };

  /**
   *  查询单条工艺路线
   *  /mes/router/getRouter
   * @param {*} data 
   */
  export const getRouter = data => {
    return request.get(
      `${window.VUE_APP_URL}/mes/router/getRouter`,{
          params:data
      }
    );
  };

  /**
   * /mes/router/listRouterPage  查询工艺路线列表: 分页和不分页
   */
  export const listRouterPage = data => {
    return request.get(
      `${window.VUE_APP_URL}/mes/router/listRouterPage`,{
        params:data
      },
    );
  };

/**
 *  /mes/router/updateRouter 更新工艺路线
 */

export const updateRouter = data => {
    return request.post(
      `${window.VUE_APP_URL}/mes/router/updateRouter`,data
    );
  };





  