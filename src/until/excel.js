/**
 *
 * @param {* Array} tHeader  //表格头部名称
 * @param {* Array} filterVal  //表格字段
 * @param {* Array} selectionList  //复选框选择的数据
 * @param {* String} fileName  //导出的文件名
 */
export const exportExcel = (tHeader, filterVal, selectionList, fileName) => {
  if (!(tHeader instanceof Array)) {
    return "表格头部名称格式不正确，应是一个字符串数组";
  }
  if (!(filterVal instanceof Array)) {
    return "表格字段格式不正确，应是一个字符串数组";
  }
  if (!(selectionList instanceof Array)) {
    return "表格内容数据格式不正确，应是一个对象数组";
  }
  if (typeof fileName !== "string") {
    return "导出的文件名格式不正确，应是一个字符串";
  }
  require.ensure([], () => {
    const { export_json_to_excel } = require("@/excel/Export2Excel");
    const data = selectionList.map(v => filterVal.map(j => v[j]));
    export_json_to_excel(tHeader, data, fileName);
  });
};
