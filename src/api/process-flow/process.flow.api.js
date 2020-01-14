import request from "@/service/";
import qs from 'qs'
/**   start */

/**
 *
 *
 * sps/craftProcess/export
 * 导出工序顺序表
 * styleCode
 */
export const exportCraftProcess = data => {
  window.open(
    `${window.VUE_APP_URL}sps/craftProcess/export?styleCode=${data.styleCode}`
  );
};

//

/** end */

/**
 * 精确查询
 * 根据款式代码查询
 * /sps/style/{styleCode}
 * 查询页面右侧部件工艺流
 */
export const getCraftProcess = data => {
  return request.get(`${window.VUE_APP_URL}sps/craftProcess/getCraftProcess`, {
    params: data
  });
};



/**
 * 精确查询
 * 根据款式代码查询
 * sps/craftProcess/getCraftTree
 *查询页面左侧部件工艺树
 */
export const getCraftTree = data => {
  return request.get(`${window.VUE_APP_URL}sps/craftProcess/getCraftTree`, {
    params: data
  });
};

/***
 * 保存功一流
 * 
 */

export const saveProcess= data => {
  return request.post(`${window.VUE_APP_URL}sps/craftProcess/saveProcess`,  data);
};


/**
 *  拉取工艺清单
 * /sps/craftProcess/updateCraftListByStyle
 */

export const updateCraftListByStyle= data => {
  return request.get(`${window.VUE_APP_URL}sps/craftProcess/updateCraftListByStyle`,  data);
};


/**
 *  拉取工艺清单
 * sps/craftProcess/updateIsChecked
 * isChecked
 * styleCode
 */

export const updateIsChecked= data => {
  const params = qs.stringify(data);
  return request.post(`${window.VUE_APP_URL}sps/craftProcess/updateIsChecked?${params}`);
};
 



export const getCraftProcessTable = data =>{
  return request.get(`${window.VUE_APP_URL}sps/craftProcess/getCraftProcessTable`,  {
    params:data
  });
}

/**
 * 模糊搜索
 * sps/craftProcess/getStyleListByStyleCode
 */


export const getStyleListByStyleCode = data =>{
  return request.get(`${window.VUE_APP_URL}sps/craftProcess/getStyleListByStyleCode`,  {
    params:data
  });
}

//

/** end */
