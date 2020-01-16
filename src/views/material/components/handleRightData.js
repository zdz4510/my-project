/**
 *  data,
 * entry 入口的值
 */

const findNodeBystepId = (stepId, routerSteps) => {
  const arr = routerSteps.filter(item => {
    return (item.stepId = stepId);
  });

  return arr[0];
};
export default ({ entryRouterStep, routerSteps }) => {
  console.log(entryRouterStep);
  console.log(routerSteps);

  let lines = [];
  let nodes = [];
  
  let rootId ;
  
  
  routerSteps.forEach(item => {
    const isO = item.routerComponent.routerComponentType == "O";
    // const stepId = item.stepId;
    const routerNextStepIds = item.routerNextStepIds;
    let from;
    if (isO) {
      from = item.routerComponent.routerOperationComponent.operation;
    } else {
      from = item.routerComponent.routerReturnComponent.retrunType;
    }
    let key = from;
    if(item.stepId==entryRouterStep){
      rootId = key;
    }
    if (routerNextStepIds && routerNextStepIds.lenght > 0) {
      routerNextStepIds.forEach(item => {
        const node = findNodeBystepId(item, routerSteps); // 找到了对用的节点了
        // 根据节点的类型找key
        let nodeType = node.routerComponent.routerComponentType == "O";
        let to;
        if (nodeType) {
          from = node.routerComponent.routerOperationComponent.operation;
        } else {
          from = node.routerComponent.routerReturnComponent.retrunType;
        }
        lines.push({ form: from, to: to });
      });
    }

    let newItem;
    if (isO) {
      newItem = {
        id: key,
        name: key,
        type: key,
        description: item.description, // 描述
        customizedData:
          item.routerComponent.routerOperationComponent.customizedData || [],
        isLastReportingStep:
          item.routerComponent.routerOperationComponent.isLastReportingStep,
        routerComponentType: item.routerComponent.routerComponentType, // 组件类型  O / R
        operation: item.routerComponent.routerOperationComponent.operation, //工序号
        reportingStep:
          item.routerComponent.routerOperationComponent.reportingStep, //报工步骤
        routerNextStepIds: [],
        stepId: item.stepId,
        ico: item.ico,
        sequence: item.sequence,
        left: item.left,
        top: item.top
      };
    } else {
      let name = "";
      if (key == "A") {
        name = "返回置任一步骤";
      } else if (key == "N") {
        name = "返回置上一步骤";
      } else if (key == "O") {
        name = "返回置原始步骤";
      } else if (key == "P") {
        name = "返回置下一步骤";
      }
      newItem = {
        id: key,
        name: name,
        type: key,
        ico: item.ico,
        routerComponentType: "R",
        retrunType: key,
        left: item.left,
        top: item.top,
        returnOperation:
          item.routerComponent.routerReturnComponent.returnOperation,
        returnStepId: item.routerComponent.routerReturnComponent.returnStepId,
        description: item.description, // 描述
        stepId: item.stepId,
        sequence: item.sequence
      };
    }
    nodes.push(newItem);
  });

  console.log(lines);
  console.log(nodes);
  nodes.push({
    id: "-1",
    type: "-1",
    name: "开始",
    ico: "el-icon-odometer",
    "left": "191px",
    "top": "41px"
  });
  lines.push({
    from: "-1",
    to: rootId
  });
  return { lines, nodes };
};
