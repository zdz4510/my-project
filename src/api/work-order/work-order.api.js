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