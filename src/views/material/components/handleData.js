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
  if(node.length==0){
    return ;
  }
  //const line = data.lineList;  // 获取line
  const line = data.lineList;
  const fromAtoB = A => {
  return line.filter(item => {
    return item.from == A;
  });
};

  const findNodseByArr=(arr)=>{
    return  node.filter(item=>{
          return arr.indexOf(item.id)!=-1;
    })
  }
  // 开始节点
  const root = fromAtoB(-1);  //  获取
  
  const arr = node.filter(item=>{
    return root[0].to == item.id;
  });
 
  node = node.filter(item=>{
     return item.id!='-1'
  })
  let i=1;
  const routerSteps=  node.map(item => {
    let nodes = fromAtoB(item.id); //  查找当前节点下面的节点
     nodes= nodes.map(item=>{
         return item.to
     })

     nodes= findNodseByArr(nodes);
     nodes = nodes.map(item=>{
        return item.stepId
     })

    console.log(item.ico)
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
          routerReturnComponent: {
            retrunType: item.retrunType,
            returnOperation: item.returnOperation, // 返回工序
            returnStepId: item.returnStepId,  // 返回步骤
            },
      },   
     
      routerNextStepIds:nodes||[], // 下一个工序id
      stepId: item.stepId, 
      sequence:i++,
      left:item.left,
      top:item.top,
      ico:item.ico
       // 工序id
    };
    if(item.routerComponentType=='O'){
        delete newItem['routerComponent']['routerReturnComponent']
    } else{
      delete newItem['routerComponent']['routerOperationComponent']
    } 
    return  newItem;

  });

  return {
    routerSteps , entryRouterStep:arr[0].stepId
  }
}

export default handleData;