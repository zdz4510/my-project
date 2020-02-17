<template>
  <div>
		<div class="operate mtb10">
			<dsn-button  size="small" type="primary" @click.native="goBack">返回</dsn-button>
			<dsn-button size="small" type="primary" @click.native="handleSave('editForm')">保存</dsn-button>
		</div>
		<el-row :gutter="20" class="bgw">
			<el-col :span="6">
				<div>
					<dsn-select v-model="value" clearable placeholder="请选择" :disabled="selectIsDisabled" @clear="handleClearSelect" @change="handleChangeOption" @focus="handleSelectFocus" ref="select" >
						<el-option
							v-for="item in cloneList"
							:key="item.ncCode"
							:label="item.ncCode"
							:value="item.ncCode" >
						</el-option>
					</dsn-select>
					<dsn-table ref="editTable" :data="cloneList" border highlight-current-row style="width: 100%" @row-click="handleCurrentChange" >
						<el-table-column label="不合格代码" prop="ncCode"> </el-table-column>
						<el-table-column label="描述" prop="ncCodeDes"> </el-table-column>
					</dsn-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div>
					<el-form :inline="true" :model="editForm" ref="editForm" :rules="rules" class="add-form" :label-width="formLabelWidth">
						<el-form-item label="不合格代码:" prop="ncCode">
							<dsn-input v-model="editForm.ncCode" disabled></dsn-input>
						</el-form-item>
						<el-tabs v-model="activeName" type="card">
							<el-tab-pane label="不合格代码维护" name="first">
								<el-row>
									<el-col :span="24">
										<el-form-item label="描述:" prop="ncCodeDes">
											<dsn-input v-model="editForm.ncCodeDes" ></dsn-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="状态:" prop="status" required>
											<dsn-select v-model="editForm.status" filterable placeholder="请选择">
												<el-option
													v-for="item in status"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</dsn-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="24">
										<el-form-item label="是否需要关闭:" prop="needClose" >
											<el-checkbox v-model="editForm.needClose"></el-checkbox>
										</el-form-item>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="不合格组" name="second">
								<el-row style="left:90px">
									<el-col :span="24">
										<el-row>
											<el-col :span="8">
												<dsn-table :data="allocated.filter(data => !ncGroup1 || data.ncGroup.toLowerCase().includes(ncGroup1.toLowerCase()))" @select="check1" @select-all="check1">
													<el-table-column label="已分配不合格组">
														<el-table-column label="">
															<template slot="header">
																<dsn-input v-model="ncGroup1" placeholder="输入不合格组搜索"/>
															</template>
															<el-table-column type="selection" width="50"></el-table-column>
															<el-table-column prop="ncGroup" label="不合格组"></el-table-column>
															<el-table-column prop="ncGroupDes" label="不合格组描述" width="300"></el-table-column>
															</el-table-column>
													</el-table-column>
												</dsn-table>
											</el-col>
											<el-col :span="2">
												<div class="direction mt70"><i class="el-icon-caret-right" @click="right"></i></div>
												<div class="direction"><i class="el-icon-caret-left" @click="left"></i></div>
											</el-col>
											<el-col :span="8">
												<dsn-table :data="undistributed.filter(data => !ncGroup2 || data.ncGroup.toLowerCase().includes(ncGroup2.toLowerCase()))" @select="check2" @select-all="check2">
													<el-table-column label="未分配不合格组">
														<el-table-column label="">
															<template slot="header">
																<dsn-input v-model="ncGroup2" placeholder="输入不合格组搜索"/>
															</template>
															<el-table-column type="selection" width="50"></el-table-column>
															<el-table-column prop="ncGroup" label="不合格组"></el-table-column>
															<el-table-column prop="ncGroupDes" label="不合格组描述" width="300"></el-table-column>
															</el-table-column>
													</el-table-column>
												</dsn-table>
											</el-col>
										</el-row>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="自定义数据" name="custom">数据字段，数据属性</el-tab-pane>
						</el-tabs>
						<div slot="footer" class="dialog-footer">
							<!-- <dsn-button @click.native="handleReset(workCenterForm)">重 置</dsn-button> -->
							<dsn-button >重 置</dsn-button>
							<dsn-button type="primary" @click.native="dialog = false">确 定</dsn-button>
						</div>
					</el-form>
					<!-- 确认模态框 -->
					<el-dialog title="保存" :visible.sync="saveDialog" width="30%">
						<span>是否保存数据？</span>
						<span slot="footer" class="dialog-footer">
							<dsn-button @click.native="handleCancle">取 消</dsn-button>
							<dsn-button type="primary" @click.native="handleSave('editForm')">
								确 定
							</dsn-button>
						</span>
					</el-dialog>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {saveNcCode} from '../../../api/nc.code.api'
import _ from 'lodash'
export default {
  name:'edit-nc-Code',
  computed: {
    ...mapGetters(["ncCodeEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "120px",
			activeName:'first',
      cloneModify: {}, //  克隆的表单的一份副本
      editForm: {
				ncCode:'',
				ncCodeDes:'',
				status:'',
				ncCodeGroupList:[],
			},
			rules: {
				
			},
			status:[{
				value:true,
				label:'已启用'
			},{
				value:false,
				label:'未启用'
			}],
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
			selectIsDisabled: false,
			undistributed:[],
			allocated:[],
			selectedList:[],
			selectedList2:[],
			ncGroup1:'',
			ncGroup2:'',
			
			cloneUnallocateData:[],
			cloneAllocateData:[],
    };
  },
	created() {
    this.$nextTick(() => {
      this.init();
		});
  },
  methods: {
    ...mapMutations(["SETNCCODEEDITLIST"]),
    //初始化的操作
    init() {
		console.log("12121",this.ncCodeEditList)
      if (this.ncCodeEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.ncCodeEditList)); //复制一份副本,保证副本和初始列表数据一致性
	
		this.editForm = this.cloneList[0]; // 默认选中第一行
		
		this.cloneModify = JSON.parse(JSON.stringify(this.editForm)); // modify 的副本
		
		this.setCurrent(this.editForm); // 设置选中第一行
		
				this.currentRow = this.editForm; // 设置初始currentRow 为第一行
				
				this.allocated = this.editForm.ncCodeGroupList.allocated;
				
				this.undistributed = this.editForm.ncCodeGroupList.undistributed;
				
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
      const tempList = this.cloneList.filter(item => item["ncCode"] == row);
      console.log(tempList);
      this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
			this.setCurrent(tempList[0]);
			this.allocated = this.editForm.ncCodeGroupList.allocated
			this.undistributed = this.editForm.ncCodeGroupList.undistributed
    },
    //下拉列表获取到焦点时触发
    handleSelectFocus() {
      // this.oldRow = oldRow;
      //  当前编辑的和之前的数据不一样就显示弹窗
      if (JSON.stringify(this.editForm) !== JSON.stringify(this.cloneModify)) {
        // console.log('数据不一样禁用下拉框还有弹出保存')
        this.saveDialog = true; // 保存弹出框出现
        this.selectIsDisabled = true; // 禁用下拉框
        this.$refs['select'].blur();
      } else {
        //  console.log('数据一样不禁用下拉框还有不弹出保存')
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
			this.allocated = this.editForm.ncCodeGroupList.allocated
			this.undistributed = this.editForm.ncCodeGroupList.undistributed
    },
    //选中某一行
    //返回操作
		goBack() {
			this.$router.push({path:'/nc/ncCode'})
		},
    /**
     *  通过ncCode
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["ncCode"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if(this.cloneList.length<this.ncCodeEditList.length && this.value!=''){
          this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
          this.editForm = this.cloneList[0];
          return ;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.ncCodeEditList));  //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.ncCode;
        let item = this.findItemByKey(this.cloneList, code, "ncCode");
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
					let params = {}
					let arr = []
					this.allocated.map(item=>{
						arr.push(item.ncGroup)
					})
					console.log("88888888",arr)
					this.editForm.ncCodeGroupList = arr
					params.updateList = [this.editForm]
					saveNcCode(params).then(data => {
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
							if (this.cloneList.length == this.ncCodeEditList.length) {
								//直接覆盖
								//重新更改初始的副本
								//设置左边的选中状态
								this.SETNCCODEEDITLIST(JSON.parse(JSON.stringify(this.cloneList)));
								this.editForm = this.currentRow;
								this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
							}
					
							if (this.cloneList.length == 1) {
								let index = this.findIndexByItem(
									this.ncCodeEditList,
									this.editForm.ncCode
								);
								if (index > -1) {
									this.ncCodeEditList.splice(index, 1, this.editForm); // 替换
									this.SETNCCODEEDITLIST(JSON.parse(JSON.stringify(this.ncCodeEditList)));
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
			this.undistributed = _.concat(this.undistributed,this.selectedList)
			this.undistributed = _.uniq(this.undistributed)
			this.allocated = _.difference(this.allocated,this.selectedList)
			console.log(this.undistributed,'un')
			this.cloneAllocateData = _.cloneDeep(this.allocated)
		},
		left(){
			this.allocated = _.concat(this.allocated,this.selectedList2)
			this.allocated = _.uniq(this.allocated)
			this.undistributed = _.difference(this.undistributed,this.selectedList2)
			console.log(this.undistributed,'all')
			this.cloneAllocateData = _.cloneDeep(this.allocated)
		},
  },
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