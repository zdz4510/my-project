import request from "@/service/";
// import qs from "qs";

/**
 *  /mes/shopOrder/findShopOrderList
查询所有
 */
export const findShopOrderListRequest = data => {
    return request.get(
        `${window.VUE_APP_URL}/mes/shopOrder/findShopOrderList`, data);
};

/**
 * 
/mes/shopOrder/findShopOrder
查询
*/
export const findShopOrderRequest = data => {
    return request.get(
        `${window.VUE_APP_URL}/mes/shopOrder/findShopOrder?shopOrder=${data.shopOrder}`, data);
};

/**
 * /mes/shopOrder/saveShopOrder
工单维护：添加工单表信息
*/
export const saveShopOrderRequest = data => {
    return request.post(
        `${window.VUE_APP_URL}/mes/shopOrder/saveShopOrder`, data);
};

/**
 * /mes/shopOrder/updateShopOrder
工单维护：修改工单表信息
*/
export const updateShopOrderRequest = data => {
    return request.put(
        `${window.VUE_APP_URL}/mes/shopOrder/updateShopOrder`, data);
};

/**
 * 
/mes/customizedFieldDef/findCustomizedFieldDefList
根据自定义字段定义维护表接口查询
*/
export const findFieldRequest = data => {
    return request.get(
        `${window.VUE_APP_URL}/mes/customizedFieldDef/findCustomizedFieldDefList?customizedItem=${data.customizedItem}`, data);
};


/**
 * 
/mes/shopOrder/deleteShopOrderBatch
工单维护：批量删除工单表信息
*/
export const deleteRequest = data => {
    return request.delete(
        `${window.VUE_APP_URL}/mes/shopOrder/deleteShopOrderBatch?shopOrder=${data.shopOrder}`, data);
};