<template>
  <div class="edit-next-number">
		<div class="operate">
			<dsn-button size="small" type="primary" @click.native="goBack">返回</dsn-button>
			<dsn-button size="small" type="primary" @click.native="handleSave('editForm')">保存</dsn-button>
		</div>
		<el-row :gutter="20">
			<el-col :span="6">
				<div class="editList">
					<dsn-select style="margin-bottom: 30px" v-model="value" clearable placeholder="请选择" :disabled="selectIsDisabled" @clear="handleClearSelect" @change="handleChangeOption" @focus="handleSelectFocus" ref="select" >
						<el-option
							v-for="item in cloneList"
							:key="item.sequence"
							:label="item.sequence"
							:value="item.sequence" >
						</el-option>
					</dsn-select>
					<dsn-table ref="editTable" :data="cloneList" row-key="sequence"  border highlight-current-row style="width: 100%" @row-click="handleCurrentChange" >
						<el-table-column label="序号" prop="sequence"> </el-table-column>
						<el-table-column label="类型" prop="sequenceType"> </el-table-column>
					</dsn-table>
				</div>
			</el-col>
			<el-col :span="18">
				<div class="workList" style="height: 602px">
					<el-form :model="editForm" :inline="true" ref="editForm" :label-width="formLabelWidth">
						<el-form-item label="规则类型:" prop="sequenceType" required>
							<dsn-select v-model="editForm.sequenceType" placeholder="请选择" @change=onChange>
								<el-option
									v-for="item in ruleTypes"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</dsn-select>
						</el-form-item>
						<el-row v-if="editForm.sequenceType == 'F'">
							<el-col :span="24">
								<el-form-item label="固定字符串:" prop="fixedString" required>
									<dsn-input v-model="editForm.fixedString"></dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'V'">
							<el-col :span="24">
								<el-form-item label="可替换参数:" prop="varType" required>
									<dsn-select v-model="editForm.varType" placeholder="请选择">
										<el-option
											v-for="item in replaceable"
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
								<el-form-item label="时间格式化:" prop="dateTimeFormat" v-if="editForm.sequenceType == 'D'" required>
									<el-date-picker
										v-model="editForm.dateTimeFormat"
										type="datetime"
										value-format="yyyy-MM-dd HH:mm:ss"
										placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="长度:" prop="length" required>
									<dsn-input v-model="editForm.length"></dsn-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="进制:" prop="numBase" required>
									<dsn-input-number v-model="editForm.numBase" :min="2" :max="36" label=""></dsn-input-number>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="增量:" prop="numIncr" required>
									<dsn-input v-model="editForm.numIncr"></dsn-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="初始值:" prop="initValue" required>
									<dsn-input v-model="editForm.initValue"></dsn-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="终值:" prop="finalValue" required>
									<dsn-input v-model="editForm.finalValue"></dsn-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="循环:" prop="reset" required>
									<dsn-select v-model="editForm.reset" placeholder="请选择">
										<el-option
											v-for="item in circle"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</dsn-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row v-if="editForm.sequenceType == 'S'">
							<el-col :span="12">
								<el-form-item label="顺序:" prop="order" >
									<el-radio-group v-model="editForm.order">
										<el-radio-button label="顺序"></el-radio-button>
										<el-radio-button label="反序"></el-radio-button>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
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
import {saveNextNumber} from '../../../api/next.number.api.js'
export default {
  name:'edit-next-number',
  computed: {
    ...mapGetters(["nextNumberEditList"])
  },
  data() {
    return {
      //表单左边宽度
      formLabelWidth: "120px",
      cloneModify: {}, //  克隆的表单的一份副本
      editForm: {
				
			},
			rules: {

			},
			circle: [{
					value: 'NEVER',
					label: '从不'
				},{
					value: 'DAY',
					label: '每天'
				},{
					value: 'WEEK',
					label: '每周'
				},{
					value: 'MONTH',
					label: '每月'
				},{
					value: 'YEAR',
					label: '每年'
				}],
				ruleTypes: [{
					value: 'F',
					label: '固定字符串'
				},{
					value: 'V',
					label: '可替换参数'
				},{
					value: 'D',
					label: '时间'
				},{
					value: 'S',
					label: '自增长序列'
				}],
				replaceable: [{
					value: 'MAT',
					label: '物料'
				},{
					value: 'MAT_REV',
					label: '物料版本'
				},{
					value: 'MAT_GROUP',
					label: '物料组'
				},{
					value: 'SHOP_ORDER',
					label: '工单'
				},{
					value: 'SITE',
					label: '工厂'
				},{
					value: 'OP_USER',
					label: '操作执行人员ID'
				}],
			
      saveDialog: false, //保存弹框的显示和隐藏
      currentRow: {},
      oldRow: {}, // 当前选中的行
      cloneList: [], // 复制所以可以编辑的数据副本
      value: "",
			selectIsDisabled: false,
			
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
		});
		console.log(this.nextNumberEditList,'store')
  },
  methods: {
    ...mapMutations(["SETNEXTNUMBEREDITLIST"]),
    //初始化的操作
    init() {
      if (this.nextNumberEditList.length > 0) {
        this.cloneList = JSON.parse(JSON.stringify(this.nextNumberEditList)); //复制一份副本,保证副本和初始列表数据一致性
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
      const tempList = this.cloneList.filter(item => item["sequence"] == row);
      console.log(tempList);
      // this.cloneList = tempList;
      this.editForm = tempList[0];
      this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
      this.setCurrent(tempList[0]);
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
    },
    //选中某一行
    //返回操作
		goBack() {
			this.$router.push({path:'/nextNumber/nextNumber'})
		},
    /**
     *  return >1 就找到了
     */
    findIndexByItem(arr, v) {
      return arr.findIndex(item => item["sequence"] == v);
    },
    // 取消操作  一般是在弹框出现的时候才有取消操作
    handleCancle() {
      this.saveDialog = false;
      this.selectIsDisabled = false;
      //数据还原
      if(this.cloneList.length<this.nextNumberEditList.length && this.value!=''){
          this.cloneList = JSON.parse(JSON.stringify([this.cloneModify]));
          this.editForm = this.cloneList[0];
          return ;
      }
      this.cloneList = JSON.parse(JSON.stringify(this.nextNumberEditList));  //取消直接复制一份副本
      if (this.currentRow) {
        let code = this.currentRow.sequence;
        let item = this.findItemByKey(this.cloneList, code, "sequence");
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
					params.createList = []
					params.deleteList = []
					params.updateList = [{
						nextNumberType:this.editForm.nextNumberType,
						definedBy:this.editForm.definedBy,
						material:this.editForm.material,
						materialRev:this.editForm.materialRev,
						commitType:this.editForm.commitType,
						sequences:[this.editForm]
					}]

					saveNextNumber(params).then(data => {
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
							if (this.cloneList.length == this.nextNumberEditList.length) {
								//直接覆盖
								//重新更改初始的副本
								//设置左边的选中状态
								this.SETNEXTNUMBEREDITLIST(JSON.parse(JSON.stringify(this.cloneList)));
								this.editForm = this.currentRow;
								this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
							}

							if (this.cloneList.length == 1) {
								let index = this.findIndexByItem(
									this.nextNumberEditList,
									this.editForm.sequence
								);
								if (index > -1) {
									this.nextNumberEditList.splice(index, 1, this.editForm); // 替换
									this.SETNEXTNUMBEREDITLIST(JSON.parse(JSON.stringify(this.nextNumberEditList)));
									this.cloneModify = JSON.parse(JSON.stringify(this.editForm));
								}
							}
						} else {
							this.$message({
								message: res.message,
								type: "error"
							});
							this.saveDialog = false;
							this.setCurrent(this.oldRow);
						}
					});
				}
			});
    },
    onChange(val){
			this.editForm = {}
			this.editForm.sequenceType = val
		}
  }
};
</script>

<style scoped lang="scss">
.edit-next-number{
	.operate {
    padding: 14px 14px 0;
    background: #fff;
    margin-bottom: 14px;
		border-radius: 4px;
  }
	.editList, .workList {
    background: #fff;
    min-height: 450px;
    padding: 10px;
		border-radius: 4px;
  }
}
</style>
