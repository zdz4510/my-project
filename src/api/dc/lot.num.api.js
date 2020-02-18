import request from "@/service/";
// import qs from "qs";

/**
 * 

 */

// lotOperationService/adjustLotQuantity
// Lot数量调整接口
export const adjustLotQuantityHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/lotOperationService/adjustLotQuantity`,{params:data}
  );
};
