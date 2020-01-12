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
							:key="item.alarmGroup"
							:label="item.alarmGroup"
							:value="item.alarmGroup" >
						</el-option>
					</el-select>
					<el-table ref="editTable" :data="cloneList" border highlight-current-row style="width: 100%" height="513" @row-click="handleCurrentChange" >
						<el-table-column label="事件分组名称" prop="alarmGroup"> </el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div>
					<el-form :inline="true" :model="editForm" ref="editForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
						<el-row>
							<el-col :span="8">
								<el-form-item label="事件分组名称:" prop="alarmGroup" required>
									<el-input v-model="editForm.alarmGroup" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="分组描述:" prop="groupDes" required>
									<el-input v-model="editForm.groupDes"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-row>
									<el-col :span="8">
										<el-table :data="allocateData.filter(data => !alarm1 || data.alarm.toLowerCase().includes(alarm1.toLowerCase()))" @select="check1" @select-all="check1">
											<el-table-column label="事件编号:">
												<el-table-column type="selection" width="100"></el-table-column>
												<el-table-column prop="alarm" label="事件编号"></el-table-column>
											</el-table-column>
											<el-table-column label="">
												<template slot="header">
													<el-input v-model="alarm1" placeholder="输入事件编号搜索"/></template>
												<el-table-column label="事件等级">
													<template slot-scope="scope">{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
												</el-table-column>
												<el-table-column prop="theme" label="事件主题"></el-table-column>
											</el-table-column>
										</el-table>
									</el-col>
									<el-col :span="2">
										<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
										<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
									</el-col>
									<el-col :span="8">
										<el-table :data="unallocateData.filter(data => !alarm2 || data.alarm.toLowerCase().includes(alarm2.toLowerCase()))" @select="check2" @select-all="check2">
											<el-table-column label="事件编号:">
												<el-table-column type="selection" width="100"></el-table-column>
												<el-table-column prop="alarm" label="事件编号"></el-table-column>
											</el-table-column>
											<el-table-column label="">
												<template slot="header">
													<el-input v-model="alarm2" placeholder="输入事件编号搜索" />
												</template>
												<el-table-column label="事件等级">
													<template slot-scope="scope">{{ scope.row.alarmLevelFlag == 10 ? '提示' : (scope.row.alarmLevelFlag == 20 ? '警告' : '错误') }}</template>
												</el-table-column>
												<el-table-column prop="theme" label="事件主题"></el-table-column>
											</el-table-column>
										</el-table>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
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
import {getWorkerInfo, updateData, getDataByAlarm} from '../../../api/alarm.group.api'
import _ from 'lodash';
export default {
  name:'edit-alarm-group',
  computed: {
    ...mapGetters(["alarmGroupEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth:'150px',
			alarm1:'',
			alarm2:'',
			cloneModify: {}, //  克隆的表单的一份副本
			rules: {
        groupDes: [
          { required:true,message:'请填写事件分组描述', trigger: 'blur' }
        ],
      },
      editForm: {
				alarmGroup:'',
				groupDes:'',
				alarmList:[],
				tenantSiteCode: "test",
			},
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
			selectIsDisabled: false,
			selectedList:[],
			selectedList2:[],
			allocateData:[],
			unallocateData:[],
			alarmLevel: [{
				value: 10,
				label: '提示'
			}, {
				value: 20,
				label: '警告'
			}, {
				value: 30,
				label: '错误'
			}],
			cloneUnallocateData:[],
			cloneAllocateData:[],
    };
  },
	created() {
    this.$nextTick(() => {
      this.init();
		});
		this.alarmGroup = this.alarmGroupEditList[0].alarmGroup
		let p = {
			alarmGroup: this.alarmGroup
		}
		getWorkerInfo(p).then(data=>{
			this.allocateData = data.data.data.data
			this.cloneAllocateData = data.data.data
		})
		let params = ''
		getDataByAlarm(params).then(data=>{
			console.log(data)
			this.unallocateData = data.data.data
		})

  },
  methods: {
    ...mapMutations(["SETALARMGROUPEDITLIST"]),
    //初始化的操作
    init() {
      if (this.alarmGroupEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.alarmGroupEditList)); //复制一份副本,保证副本和初始列表数据一致性
        this.editForm = this.cloneList[0]; // 默认选中第一行
        this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
        this.setCurrent(this.editForm); // 设置选中第一行
        this.currentRow = this.editForm; // 设置初始currentRow 为第一行
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
      //过滤数组
      const tempList = this.cloneList.filter(item => item["alarmGroup"] == row);
      console.log(tempList);
      this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
			this.setCurrent(tempList[0]);
			let params = this.editForm.alarmGroup
			getDataByAlarm(params).then(data=>{
				console.log(data)
				this.unallocateData = data.data.data
			})
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
			let params = this.editForm.alarmGroup
			getDataByAlarm(params).then(data=>{
				console.log(data)
				this.unallocateData = data.data.data
			})
    },
    //选中某一行
    //返回操作
		goBack() {
			this.$router.push({path:'/alarm/alarmGroup'})
		},
    /**
     *  通过mat
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["alarmGroup"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if(this.cloneList.length<this.alarmGroupEditList.length && this.value!=''){
          this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
          this.editForm = this.cloneList[0];
          return ;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.alarmGroupEditList));  //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.alarmGroup;
        let item = this.findItemByKey(this.cloneList, code, "alarmGroup");
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
					let arr = []
						this.allocateData.map(item=>{
							arr.push(item.alarm)
						})
						this.editForm.alarmList = arr
						let params = this.editForm

					updateData(params).then(data => {
						const res = data.data;
						this.saveDialog = false; // 保存的提示框消失
						this.selectIsDisabled = false;

						// 直接成功
						if (res.code === 200) {
							this.saveDialog = false;
							this.selectIsDisabled = false;
							this.$message({
								message: "修改成功",
								type: "success"
							});
							// 直接覆盖
							if (this.cloneList.length == this.alarmGroupEditList.length) {
								//直接覆盖
								//重新更改初始的副本
								//设置左边的选中状态
								this.SETALARMGROUPEDITLIST(JSON.parse(JSON.stringify(this.cloneList)));
								this.editForm = this.currentRow;
								this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
							}

							if (this.cloneList.length == 1) {
								let index = this.findIndexByItem(
									this.alarmGroupEditList,
									this.editForm.alarmGroup
								);
								if (index > -1) {
									this.alarmGroupEditList.splice(index, 1, this.editForm); // 替换
									this.SETALARMGROUPEDITLIST(JSON.parse(JSON.stringify(this.alarmGroupEditList)));
									this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
								}
							}
						} else {
							this.$message({
								message: res.data,
								type: "error"
							});
							this.saveDialog = false;
							this.setCurrent(this.oldRow);
						}
					});
				}
			});
		},
		check1(val){
			this.selectedList = val
		},
		check2(val){
			this.selectedList2 = val
		},
		right(){
			this.unallocateData = _.concat(this.unallocateData,this.selectedList)
			this.unallocateData = _.uniq(this.unallocateData)
			this.allocateData = _.difference(this.allocateData,this.selectedList)
			console.log(this.unallocateData,'un')
			this.cloneAllocateData = _.cloneDeep(this.allocateData)
		},
		left(){
			this.allocateData = _.concat(this.allocateData,this.selectedList2)
			this.allocateData = _.uniq(this.allocateData)
			this.unallocateData = _.difference(this.unallocateData,this.selectedList2)
			console.log(this.unallocateData,'all')
			this.cloneAllocateData = _.cloneDeep(this.allocateData)
		},
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
	.input-form {
		margin-left: 20px;
	}
	.el-select /deep/ .el-input {
    width: 200px;
  }
	.direction {
		color: #409eff;
		font-size: 40px;
		cursor: pointer;
		text-align: center;
	}
	.mt70 {
		margin-top: 70px;
	}
</style>
