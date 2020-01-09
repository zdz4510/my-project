import request from "@/service/";

/**
 * /mes/shopOrder/findReleaseInfo
工单下达：查询获取下达信息
 */
export const findShopOrderListRequest = data => {
    return request.get(
        `${window.VUE_APP_URL}/mes/shopOrder/findReleaseInfo?shopOrder=${data.shopOrder}`);
};