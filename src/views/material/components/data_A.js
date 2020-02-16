var data_A = {
    name: '流程A',
    lineList: [
        { from: "nodeA", to: "nodeB" },
         { form: "nodeB", to: "nodeC" },
          { form: "nodeC", to: "A" },
          {
        from: 'nodeA',
        to: 'nodeB'
    }, {
        from: 'nodeA',
        to: 'nodeC'
    },{
        from: 'nodeB',
        to: 'nodeD'
    }
      ],
      nodeList: [
        {
         id: "nodeA",
         type: "nodeA",
         name: "开始",
         ico: "el-icon-odometer",
         left: "191px",
         top: "41px",
         show: true
       },
       {
         id: "nodeB",
         name: "nodeB",
         type: "nodeB",
         description: "MKMKM",
         customizedData: [],
         isLastReportingStep: true,
         routerComponentType: "O",
         operation: "nodeB",
         reportingStep: "MKMKMKM",
         routerNextStepIds: [],
         stepId: "QQQQQQ",
         ico: "el-icon-user-solid",
         sequence: 3,
         left: "136px",
         top: "170px",
         show: true
       },
       {
         id: "nodeC",
         name: "nodeC",
         type: "nodeC",
         description: "描述",
         customizedData: [],
         isLastReportingStep: false,
         routerComponentType: "O",
         operation: "nodeC",
         reportingStep: "",
         routerNextStepIds: [],
         stepId: "QQQQK",
         ico: "el-icon-user-solid",
         sequence: 2,
         left: "142px",
         top: "242px",
         show: true
       },
      
        {
         id: "A",
         name: "返回置任一步骤",
         type: "A",
         ico: "el-icon-odometer",
         routerComponentType: "R",
         retrunType: "A",
         left: "113px",
         top: "345px",
         returnOperation: "GX010",
         returnStepId: null,
         description: "MMMMM",
         stepId: "HNHNHN",
         sequence: 1,
         show: true
       },
    ]
}

export function getDataA() {
    return data_A
}
