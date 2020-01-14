/**
 *  data,
 * entry 入口的值
 */
export default (data, entry) => {
  console.log(entry);
  let lines = [];
  let nodes = [];
  data.forEach(item => {
    const routerNextStepIds = item.routerNextStepIds;
    const isO = item.hasOnwProprity("routerComponent");
    const key = isO
      ? item.routerOperationComponent.operation
      : item.routerReturnComponent.returnOperation;
    if (routerNextStepIds.lenght > 0) {
      routerNextStepIds.forEach(element => {
        lines.push({
          from: key,
          to: element
        });
      });
    }

    let newItem;
    if (isO) {
      newItem = {
        id: key,
        name: key,
        type: key,
        description: item.description, // 描述
        customizedData:item.routerComponent.routerOperationComponent.customizedData,
        isLastReportingStep:item.routerComponent.routerOperationComponent.isLastReportingStep,
        routerComponentType:item.routerComponent.routerComponentType, // 组件类型  O / R
        operation:item.routerComponent.routerOperationComponent.operation, //工序号
        reportingStep:item.routerComponent.routerOperationComponent.reportingStep,  //报工步骤
        routerNextStepIds:[],
        stepId:item.stepId,
        ico: "el-icon-user-solid",
        sequence:item.sequence,
        returnOperation:'',
        returnStepId:'',
        operationDes:'',
      };
    } else {
        let name='';
        if(key=='A'){
            name ='返回置任一步骤'
        }else if(key=='N'){
            name ='返回置上一步骤'
        } else if(key=='O'){
            name ='返回置原始步骤'
        } else if(key=='P'){
            name='返回置下一步骤'
        }
      newItem = {
        id: key,
        name: name,
        type: key,
        ico: "el-icon-odometer",
        routerComponentType:'R',
        retrunType:key,

      };
    }
    nodes.push(newItem);
  });

  return { lines, nodes };
};
