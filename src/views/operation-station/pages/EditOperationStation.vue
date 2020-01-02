<template>
  <div>
		<div class="operate mtb10">
			<el-button class="mr25 ml30 pad1025" size="small" type="primary" @click="goBack">返回</el-button>
			<el-button class="mr25 pad1025" size="small" type="primary" @click="handleSave('editForm')">保存</el-button>
		</div>
		<el-row :gutter="20" class="bgw">
			<el-col :span="6">
				<div>
					<el-select v-model="value" clearable placeholder="请选择" :disabled="selectIsDisabled" @clear="handleClearSelect" @change="handleChangeOption" @focus="handleSelectFocus" ref="select" >
						<el-option
							v-for="item in cloneList"
							:key="item.operation"
							:label="item.operation"
							:value="item.operation" >
						</el-option>
					</el-select>
					<el-table ref="editTable" :data="cloneList" border highlight-current-row style="width: 100%" @row-click="handleCurrentChange" >
						<el-table-column label="工序" prop="operation"> </el-table-column>
						<el-table-column label="产线" prop="workCenterRelation"> </el-table-column>
						<el-table-column label="站位" prop="station"> </el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div>
					<el-form :model="editForm" ref="editForm" :rules="rules" class="form-style">
						<el-form-item label="工序:" prop="operation" >
							<el-select v-model="editForm.operation" disabled>
								<el-option
									v-for="item in operation"
									:key="item.operation"
									:label="item.operation"
									:value="item.operation">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="" prop="operation" >
							<el-transfer
								ref="transfer"
								filterable
								v-model="allocate"
								:data="transferData"
								:titles="['未分配站位', '已分配站位']"
								:props="{
									key: 'resource',
									station: 'station',
									workCenterRelation: 'workCenterRelation',
									stationDes: 'stationDes',
								}"
							>
								<span slot-scope="{ option }"
									>{{ option.workCenterRelation }} - {{ option.station }} - {{ option.stationDes }}</span
								>
							</el-transfer>
						</el-form-item>
					</el-form>
					<!-- 确认模态框 -->
					<el-dialog title="保存" :visible.sync="saveDialog" width="30%">
						<span>是否保存数据？</span>
						<span slot="footer" class="dialog-footer">
							<el-button @click="handleCancle">取 消</el-button>
							<el-button type="primary" @click="handleSave('editForm')">
								确 定
							</el-button>
						</span>
					</el-dialog>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {addStation, getAllOperation, getOperationInfo} from '../../../api/operation.station.api.js'
export default {
  name:'edit-operation-station',
  computed: {
    ...mapGetters(["stationEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "120px",
			activeName:'first',
			cloneModify: {}, //  克隆的表单的一份副本
			transferData:[],
			allocate:[],
      editForm: {
				operation:'',
				operationDes:'',
				status:'',
				certOperation:'',
				reportingStep:'',
				resourceGroup:'',
			},
			rules: {
				
			},
			status:[{
				label:'已启用',
				value:true
			},{
				label:'未启用',
				value:false
			}],
			operation:[],
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false,
    };
  },

  methods: {
    ...mapMutations(["SETSTATIONEDITLIST"]),
    //初始化的操作
    init() {
      if (this.stationEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.stationEditList)); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
        this.setCurrent(this.editForm); // 设置选中第一行
				this.currentRow = this.editForm; // 设置初始currentRow 为第一行
				let params = {
					operation:this.currentRow.operation
				}
				getOperationInfo(params).then(data=>{
				console.log(data.data.data,'data')
				let transData = [...data.data.data.allocated.filter(Boolean), ...data.data.data.undistributed.filter(Boolean)]
				// this.transferData = JSON.parse(JSON.stringify(transData));
				this.transferData = Object.assign([], transData)
				data.data.data.allocated.filter(Boolean).forEach(element => {
					this.allocate.push(element.resource || '');
				});
				console.log(this.transferData,'transferData')
			})
      }
    },
    //清除下拉列表时触发
    handleClearSelect() {
      this.init();
    },
    //选中下拉列表时触发
    handleChangeOption(row) {
      if(row==''){
        return ;
			}
			let params = {
					operation:row
				}
				getOperationInfo(params).then(data=>{
					console.log(data.data.data,'data')
					let transData = [...data.data.data.allocated.filter(Boolean), ...data.data.data.undistributed.filter(Boolean)]
					this.transferData = JSON.parse(JSON.stringify(transData)) ;
					data.data.data.allocated.filter(Boolean).forEach(element => {
						this.allocate.push(element.resource || '');
					});
				})
      //过滤数组
      const tempList = this.cloneList.filter(item => item["operation"] == row);
      console.log(tempList);
      this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      this.setCurrent(tempList[0]);
    },
    //下拉列表获取到焦点时触发
    handleSelectFocus() {
      // this.oldRow = oldRow;
      //  当前编辑的和之前的数据不一样就显示弹窗
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        console.log('数据不一样禁用下拉框还有弹出保存')
        this.saveDialog = true; // 保存弹出框出现
        this.selectIsDisabled = true; // 禁用下拉框
        this.$refs['select'].blur();
      } else {
         console.log('数据一样不禁用下拉框还有不弹出保存')
        this.saveDialog = false;
        
        this.selectIsDisabled = false;
      }
    },
    //设置某一行被选中
    setCurrent(row) {
      this.$refs.editTable.setCurrentRow(row);
    },

    findItemByKey(arr, keyV, kerStr) {
      let temp = arr.filter(item => item[kerStr] == keyV);
      if (temp.length > 0) {
        return temp[0];
      }
      return null;
    },
    // 点击某一行选中后操作的状态你
    handleCurrentChange(currentRow) {
			let params = {
					operation:currentRow.operation
				}
			getOperationInfo(params).then(data=>{
				console.log(data.data.data,'data')
				let transData = [...data.data.data.allocated.filter(Boolean), ...data.data.data.undistributed.filter(Boolean)]
				// this.transferData = JSON.parse(JSON.stringify(transData));
				this.transferData = Object.assign([], transData)
				data.data.data.allocated.filter(Boolean).forEach(element => {
					this.allocate.push(element.resource || '');
				});
				console.log(this.transferData,'transferData')
			})
      this.oldRow = this.currentRow;
      this.currentRow = currentRow;
      if (
        JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)
      ) {
        this.saveDialog = true; // 弹出保存的提示框
        return;
      }
      this.editForm = currentRow;
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
    },
    //选中某一行
    //返回操作
		goBack() {
			this.$router.push({path:'/operation-station/operation-station'})
		},
    /**
     *  通过operation
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["operation"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if(this.cloneList.length<this.stationEditList.length && this.value!=''){
          this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
          this.editForm = this.cloneList[0];
          return ;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.stationEditList));  //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.operation;
        let item = this.findItemByKey(this.cloneList, code, "operation");
        if (item) {
          this.setCurrent(item);
        }
        this.editForm = item;
      }
    },
    //保存操作
    handleSave(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// let params = this.editForm
					// let params = {
					// 	updateList:[this.editForm]
					// }
					// addStation(params).then(data => {
					// 	const res = data.data;
					// 	this.saveDialog = false; // 保存的提示框消失
					// 	this.selectIsDisabled = false;
					
					// 	// 直接成功
					// 	if (res.code === 200) {
					// 		this.saveDialog = false;
					// 		this.selectIsDisabled = false;
					// 		this.$message({
					// 			message: "修改成功",
					// 			type: "success"
					// 		});
					// 		// 直接覆盖
					// 		if (this.cloneList.length == this.stationEditList.length) {
					// 			//直接覆盖
					// 			//重新更改初始的副本
					// 			//设置左边的选中状态
					// 			this.SETSTATIONEDITLIST(JSON.parse(JSON.stringify(this.cloneList)));
					// 			this.editForm = this.currentRow;
					// 			this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
					// 		}
					
					// 		if (this.cloneList.length == 1) {
					// 			let index = this.findIndexByItem(
					// 				this.stationEditList,
					// 				this.editForm.operation
					// 			);
					// 			if (index > -1) {
					// 				this.stationEditList.splice(index, 1, this.editForm); // 替换
					// 				this.SETSTATIONEDITLIST(JSON.parse(JSON.stringify(this.stationEditList)));
					// 				this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
					// 			}
					// 		}
					// 	} else {
					// 		this.$message({
					// 			message: res.data,
					// 			type: "error"
					// 		});
					// 		this.saveDialog = false;
					// 		this.setCurrent(this.oldRow);
					// 	}
					// });
					let arr = []
					for(let i = 0; i < this.allocate.length; i++){
						for(let j = 0; j < this.transferData.length; j++){
							if(this.allocate[i] == this.transferData[j]['resource']){
								let obj = {}
								obj.operation = this.editForm.operation
								obj.workCenterRelation = this.transferData[j]['workCenterRelation']
								obj.station = this.transferData[j]['station']
								arr.push(obj)
							}
						}
					}
					console.log(arr,'arr')
					addStation(arr).then(data => {
						if(data.data.message == 'success'){
							this.$message({
								type: 'success',
								message: '保存成功!'
							});
						}
					})
				}	
			});
		},
  },
  created() {
		getAllOperation().then(data => {
			this.operation = data.data.data
		})
    this.$nextTick(() => {
      this.init();
    });
  }
};
</script>

<style scoped lang="scss">
	.operate {
		background: #FFFFFF;
		padding: 10px;
	}
	.editForm {
		background: #FFFFFF;
		padding: 10px;
		.dec {
			width: 756px !important;
		}
	}
	.el-textarea /deep/ .el-textarea__inner{
		width: 622px;
	}
	.el-table /deep/ .success-row {
		background: #f0f9eb ;
	}
	.bgw {
		background: #FFFFFF;
	}
	.el-transfer /deep/ .el-transfer-panel { width: 300px !important; height: 400px !important;;}
</style>