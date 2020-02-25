import request from "@/service/";
import qs from "qs";

export const getData = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/packagingConfiguration/findPackagingConfigurationList`,
    data
  );
};

export const getMaterialList = data => {
  const params = qs.stringify(data);
  return request.post(
    `${window.VUE_APP_URL}/mes/material/findMaterial?${params}`
  );
};

export const addPackagingConfiguration = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/packagingConfiguration/addPackagingConfiguration`,
    data
  );
};

export const deletePackagingConfigurationBatch = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/packagingConfiguration/deletePackagingConfigurationBatch`,
    data
  );
};

export const updatePackagingConfiguration = data => {
  return request.put(
    `${window.VUE_APP_URL}/mes/packagingConfiguration/updatePackagingConfiguration`,
    data
  );
};

//分页查询
export const getPagData = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/packagingConfiguration/findPackagingConfigurationPage?currentPage=${data.currentPage}&mat=${data.mat}&pageSize=${data.pageSize}`
  );
};
