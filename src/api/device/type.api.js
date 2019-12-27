import request from "@/service/";
// import {VUE_APP_URL} from '@/config'

/**
 * 根据联合主键、设备类型、设备名称分页查询设备类型信息
 *  url /resource_group/findResourceGroupList
 */
export const findResourceGroupListHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/resource_group/findResourceGroupList`,
    {
      params: data
    }
  );
};

/**
 * 新增和修改信息展示
 *  url /resource_group/getInformation
 */
export const getInformationHttp = data => {
  return request.get(
    `${window.VUE_APP_URL}/mes/resource_group/getInformation`,
    {
      params: data
    }
  );
};

/**
 * 修改设备类型信息
 *  url /mes/resource_group/updateResourceGroup
 */
export const updateResourceGroupHttp = data => {
  return request.put(
    `${window.VUE_APP_URL}/mes/resource_group/updateResourceGroup`,
    data
  );
};

/**
 * 添加设备类型信息
 *  url /mes/resource_group/insertResourceGroup

 */
export const insertResourceGroupHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/resource_group/insertResourceGroup
  `,
    data
  );
};

/**
 * 批量删除设备类型，根据设备类型删除
 *  url /mes/resource_group/deleteResourceGroup
 */
export const deleteResourceGroupHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}/mes/resource_group/deleteResourceGroup`,
    data
  );
};
