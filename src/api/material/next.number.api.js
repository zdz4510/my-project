import request from  "@/service/"

/* 编码规则 */
/**
 * 获取客户输入的整个nextNumber进行保存
 *  url /mes/nextNumberService/saveNextNumberConfiguration
 */
export const saveNextNumber = data => {
	return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/saveNextNumberConfiguration`, data);
};

/**
 * 通过编号类型、定义目标 去表NEXT_NUMBER中搜索数据，将得到的行数据返回
 *  url /mes/nextNumberService/findNextNumberConfiguration
 */
export const getNextNumber = data => {
  return request.post(`${window.VUE_APP_URL}/mes/nextNumberService/findNextNumberConfiguration`, data);
};


/**
 * 根据所给的编号类型、定义目标 去表NEXT_NUMBER删除对应的多行记录
 *  url /mes/nextNumberService/deleteNextNumberConfiguration
 */
export const deleteMaterial = data => {
  return request.delete(`${window.VUE_APP_URL}/mes/nextNumberService/deleteNextNumberConfiguration`, data);
};