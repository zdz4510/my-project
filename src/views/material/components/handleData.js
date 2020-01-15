// var data = {
//   description: "",
//   nodeList: [
//     {
//       id: "-1",
//       name: "开始",
//       componentCode: "-1",
//       type: "-1",
//       craftNum: "-1",
//       left: "974px",
//       top: "26px",
//       ico: "el-icon-odometer",
//       show: true
//     },
//     {
//       id: "GX001",
//       name: "GX001",
//       type: "GX001",
//       left: "972px",
//       top: "194px",
//       ico: "el-icon-user-solid",
//       show: true
//     },
//     {
//       id: "GX002",
//       name: "GX002",
//       type: "GX002",
//       left: "688px",
//       top: "327px",
//       ico: "el-icon-user-solid",
//       show: true
//     },
//     {
//       id: "GX008",
//       name: "GX008",
//       type: "GX008",
//       left: "1022px",
//       top: "328px",
//       ico: "el-icon-user-solid",
//       show: true
//     },
//     {
//       id: "O",
//       name: "返回置原始步骤",
//       type: "O",
//       left: "880px",
//       top: "487px",
//       ico: "el-icon-odometer",
//       show: true
//     }
//   ],
//   lineList: [
//     {
//       from: "-1",
//       to: "GX001"
//     },
//     {
//       from: "GX001",
//       to: "GX002"
//     },
//     {
//       from: "GX001",
//       to: "GX008"
//     },
//     {
//       from: "GX002",
//       to: "O"
//     },
//     {
//       from: "GX008",
//       to: "O"
//     }
//   ]
// };


// const root = fromAtoB(-1); // 头部的节点
// console.log(root)
// node.map(item=>{
//   return item ;
// })



/**
 * 
 * @param {*} data
 *  return 返回  routerSteps 和root
 */
const handleData =(data)=>{
  let node = data.nodeList;  // 获取node
  //const line = data.lineList;  // 获取line
  const line = data.lineList;
  const fromAtoB = A => {
  return line.filter(item => {
    return item.from == A;
  });
};
  const root = fromAtoB(-1);  //  获取root
  node = node.filter(item=>{
     return item.name!='开始'
  })
  const routerSteps=  node.map(item => {
    let nodes = fromAtoB(item.id); //  查找当前节点下面的节点
     nodes= nodes.map(item=>{
         return item.to
     })
     let newItem = {
      description: item.description,  // 描述  
      routerComponent: {
          routerComponentType: item.routerComponentType,  // 组件类型
          routerOperationComponent:{
              customizedData:item.customizedData,
               isLastReportingStep: item.isLastReportingStep, //最后报工步骤
               operation: item.operation,   //工序号
               reportingStep: item.reportingStep, //报工步骤
          },
      },   
      routerReturnComponent: {
      retrunType: item.retrunType,
      returnOperation: item.returnOperation, // 返回工序
      returnStepId: item.returnOperation,  // 返回步骤
      },
      routerNextStepIds:nodes||[], // 下一个工序id
      stepId: item.stepId, 
      sequence:'3',
      left:item.left,
      top:item.top 
       // 工序id
    };
    if(item.routerComponentType=='O'){
        delete newItem['routerReturnComponent']
    } else{
      delete newItem['routerComponent']
    } 
    return  newItem;

  });

  return {
    routerSteps , root
  }
}

export default handleData;