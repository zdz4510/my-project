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
							:key="item.material"
							:label="item.material"
							:value="item.material" >
						</el-option>
					</el-select>
					<el-table ref="editTable" :data="cloneList" border highlight-current-row style="width: 100%" height="513" @row-click="handleCurrentChange" >
						<el-table-column label="物料号" prop="material"> </el-table-column>
						<el-table-column label="版本号" prop="materialRev"> </el-table-column>
					</el-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div>
					<el-form :inline="true" :model="editForm" ref="editForm" :rules="rules" class="form-style" label-position="right" :label-width="formLabelWidth">
						<el-row>
							<el-col :span="8">
								<el-form-item label="物料号:" prop="material" >
									<el-input v-model="editForm.material" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="版本号:" prop="materialRev" >
									<el-input v-model="editForm.materialRev" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="" prop="currentRev">
									<el-checkbox v-model="editForm.currentRev">当前版本</el-checkbox>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="物料描述:" prop="materialDes">
									<el-input class="dec" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="editForm.materialDes"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-tabs v-model="activeName" type="card">
									<el-tab-pane label="基础信息管理" name="first">
										<el-row>
											<el-col :span="8">
												<el-form-item label="单位1:" prop="unit1">
													<el-select v-model="editForm.unit1">
														<el-option
															v-for="item in units"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="单位2:" prop="unit2">
													<el-select v-model="editForm.unit2">
														<el-option
															v-for="item in units"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="单位3:" prop="unit3">
													<el-select v-model="editForm.unit3">
														<el-option
															v-for="item in units"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="投放数量1:" prop="qtyRequired1" required>
													<el-input v-model="editForm.qtyRequired1"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="投放数量2:" prop="qtyRequired2" required>
													<el-input v-model="editForm.qtyRequired2"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="投放数量3:" prop="qtyRequired3" required>
													<el-input v-model="editForm.qtyRequired3"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="材料分类:" prop="materialType" required>
													<el-select v-model="editForm.materialType">
														<el-option
															v-for="item in options"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="客户:" prop="client" v-if="editForm.materialType=='成品' || editForm.materialType=='半成品'">
													<el-input v-model="editForm.client"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="客户产品代码:" prop="clientMaterial" v-if="editForm.materialType=='成品' || editForm.materialType=='半成品'">
													<el-input v-model="editForm.clientMaterial"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="供应商:" prop="vebdor" v-if="editForm.materialType=='辅料' || editForm.materialType=='原材料'">
													<el-input v-model="editForm.vebdor"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="供应商物料号:" prop="vebdorMaterial" v-if="editForm.materialType=='辅料' || editForm.materialType=='原材料'">
													<el-input v-model="editForm.vebdorMaterial"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="物料状态:" prop="materialStatus" required>
													<el-select v-model="editForm.materialStatus">
														<el-option
															v-for="item in status"
															:key="item.value"
															:label="item.label"
															:value="item.value">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="创建人/修改人:" prop="modified_user_id">
													<el-input v-model="editForm.modified_user_id" disabled></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</el-tab-pane>
									<el-tab-pane label="基础属性配置" name="second">
										<el-row>
											<el-col :span="8">
												<el-form-item label="长度:" prop="length">
													<el-input v-model="editForm.length"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="长度误差:" prop="lengthErrorRange">
													<el-input v-model="editForm.lengthErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="长度单位:" prop="lengthUnit">
													<el-select v-model="editForm.lengthUnit">
														<el-option
															v-for="item in lengthUnit"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="宽度:" prop="width">
													<el-input v-model="editForm.width"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="宽度误差:" prop="widthErrorRange">
													<el-input v-model="editForm.widthErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="宽度单位:" prop="widthUnit">
													<el-select v-model="editForm.widthUnit" placeholder="请选择">
														<el-option
															v-for="item in lengthUnit"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="高度:" prop="thickness">
													<el-input v-model="editForm.thickness"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="高度误差:" prop="thicknessErrorRange">
													<el-input v-model="editForm.thicknessErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="高度单位:" prop="thicknessUnit">
													<el-select v-model="editForm.thicknessUnit" placeholder="请选择">
														<el-option
															v-for="item in lengthUnit"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="重量:" prop="weight">
													<el-input v-model="editForm.weight"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="重量误差:" prop="weightErrorRange">
													<el-input v-model="editForm.weightErrorRange"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="重量单位:" prop="weightUnit">
													<el-select v-model="editForm.weightUnit" placeholder="请选择">
														<el-option
															v-for="item in weightUnit"
															:key="item.label"
															:label="item.label"
															:value="item.label">
														</el-option>
													</el-select>
												</el-form-item>
											</el-col>
										</el-row>
									</el-tab-pane>
								</el-tabs>
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
import {modifyMaterial} from '../../../api/material.info.api.js'
export default {
  name:'edit-material',
  computed: {
    ...mapGetters(["matEditList"])
  },
  data() {
		var qtyRequired = (rule, value, callback) => {
			var reg = /^\d{1,5}(?:\.\d{1,3})?$/
			if (!reg.test(value)) {
				return callback(new Error('小数点前5位后3位数字;正数'));
			}
			callback()
		};
    return {
      //表单左边宽度
      formLabelWidth: "120px",
			activeName:'first',
      cloneModify: {}, //  克隆的表单的一份副本
      editForm: {
				material:'',
				materialRev:'',
				currentRev:'',
				materialDes:'',
				unit1:'',
				unit2:'',
				unit3:'',
				qtyRequired1:'',
				qtyRequired2:'',
				qtyRequired3:'',
				materialType:'',
				client:'',
				clientMaterial:'',
				vebdor:'',
				vebdorMaterial:'',
				materialStatus:'',
				modified_user_id:'',
				length:'',
				lengthErrorRange:'',
				lengthUnit:'',
				width:'',
				widthErrorRange:'',
				widthUnit:'',
				thickness:'',
				thicknessErrorRange:'',
				thicknessUnit:'',
				weight:'',
				weightErrorRange:'',
				weightUnit:'',
			},
			rules: {
				qtyRequired1: [
					{ validator: qtyRequired, trigger: 'blur' }
				],
				qtyRequired2: [
					{ validator: qtyRequired, trigger: 'blur' }
				],
				qtyRequired3: [
					{ validator: qtyRequired, trigger: 'blur' }
				]
			},
			units:[{
				label: 'CELL',
			},{
				label: 'DIE',
			},{
				label: 'GLASS',
			},{
				label: 'PCS',
			},{
				label: 'WAFER',
			}],
			status: [{
				value: 'true',
				label: '已启用'
			}, {
				value: 'false',
				label: '未启用'
			}],
			options: [{
				value: '1',
				label: '辅料'
			}, {
				value: '2',
				label: '原材料'
			}, {
				value: '3',
				label: '半成品'
			}, {
				value: '4',
				label: '成品'
			}],
			lengthUnit: [{
				value: '1',
				label: 'MM'
			},{
				value: '10',
				label: 'CM'
			}],
			weightUnit: [{
				value: '1',
				label: 'g'
			},{
				value: '1000',
				label: 'Kg'
			}],
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
      selectIsDisabled: false,
    };
  },

  methods: {
    ...mapMutations(["SETMATEDITLIST"]),
    //初始化的操作
    init() {
      if (this.matEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.matEditList)); //复制一份副本,保证副本和初始列表数据一致性
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
      const tempList = this.cloneList.filter(item => item["material"] == row);
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
			this.$router.push({path:'/material/material-info'})
		},
    /**
     *  通过mat
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["material"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if(this.cloneList.length<this.matEditList.length && this.value!=''){
          this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
          this.editForm = this.cloneList[0];
          return ;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.matEditList));  //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.mat;
        let item = this.findItemByKey(this.cloneList, code, "material");
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
					let params = this.editForm
					modifyMaterial([params]).then(data => {
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
							if (this.cloneList.length == this.matEditList.length) {
								//直接覆盖
								//重新更改初始的副本
								//设置左边的选中状态
								this.SETMATEDITLIST(JSON.parse(JSON.stringify(this.cloneList)));
								this.editForm = this.currentRow;
								this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
							}
					
							if (this.cloneList.length == 1) {
								let index = this.findIndexByItem(
									this.matEditList,
									this.editForm.material
								);
								if (index > -1) {
									this.matEditList.splice(index, 1, this.editForm); // 替换
									this.SETMATEDITLIST(JSON.parse(JSON.stringify(this.matEditList)));
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
    }
  },
  created() {
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
</style>