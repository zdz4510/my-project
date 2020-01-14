var data = {
  description: "",
  nodeList: [
    {
      id: "-1",
      name: "开始",
      componentCode: "-1",
      type: "-1",
      craftNum: "-1",
      left: "974px",
      top: "26px",
      ico: "el-icon-odometer",
      show: true
    },
    {
      id: "GX001",
      name: "GX001",
      type: "GX001",
      left: "972px",
      top: "194px",
      ico: "el-icon-user-solid",
      show: true
    },
    {
      id: "GX002",
      name: "GX002",
      type: "GX002",
      left: "688px",
      top: "327px",
      ico: "el-icon-user-solid",
      show: true
    },
    {
      id: "GX008",
      name: "GX008",
      type: "GX008",
      left: "1022px",
      top: "328px",
      ico: "el-icon-user-solid",
      show: true
    },
    {
      id: "O",
      name: "返回置原始步骤",
      type: "O",
      left: "880px",
      top: "487px",
      ico: "el-icon-odometer",
      show: true
    }
  ],
  lineList: [
    {
      from: "-1",
      to: "GX001"
    },
    {
      from: "GX001",
      to: "GX002"
    },
    {
      from: "GX001",
      to: "GX008"
    },
    {
      from: "GX002",
      to: "O"
    },
    {
      from: "GX008",
      to: "O"
    }
  ]
};

console.log("tag", data);

const node = data.nodeList;
const line = data.lineList;

// const findNode = (id)=>{
//     return node.find(item=>{
//         item.id =id;
//     })
// }

const fromAtoB = A => {
  return line.filter(item => {
    return item.from == A;
  });
};

const root = fromAtoB(-1); // 头部的节点
console.log("root", root);
const newNode = node.map(item => {
  let nodes = fromAtoB(item.id);
   nodes.map(item=>{
       return item.to
   })
  return {
    description: item.description,  // 描述  
    routerComponent: {
        routerComponentType: "O",  // 组件类型
        routerOperationComponent:{
            customizedData:[
                {
                 fieldName:'',
                 fieldValue:'',
                }
             ],
             isLastReportingStep: false, //最后报工步骤
             operation: "w2134",   //工序号
             reportingStep: "e3e3", //报工步骤
        },
       
      
    },   
  
    routerReturnComponent: {
    retrunType: "A",
    returnOperation: "wqsed32", // 返回工序
    returnStepId: "QAZ",  // 返回步骤
    },
    routerNextStepIds:nodes||[], // 下一个工序id
    stepId: "ASD",   // 工序id
    
  };
});

console.log("tag", newNode);

// "routerSteps": [
//     {
//       "description": "步骤34",
//       "routerComponent": {
//         "routerComponentType": "O",
//         "routerOperationComponent": {
//           "customizedData": [
//             {
//               "fieldName": "field01",
//               "fieldValue": "example"
//             }
//           ],
//           "isLastReportingStep": false,
//           "operation": "w2134",
//           "reportingStep": "e3e3",
//           "tenantSiteCode": "test"
//         },
//         "routerReturnComponent": {
//           "retrunType": "A",
//           "returnOperation": "wqsed32",
//           "returnStepId": "QAZ",
//           "tenantSiteCode": "test"
//         }
//       },
//       "routerNextStepIds": [
//         "string"
//       ],
//       "sequence": 3,
//       "stepId": "ASD"
//     }
//   ],
