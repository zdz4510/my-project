<template>
  <div>
    <el-select
			:size="size"
			:multiple="multiple"
			:placeholder="placeholder"
			:v-model="v-model"
			:value-key="value-key"
			:disabled="disabled"
			:clearable="clearable"
			:collapse-tags="collapse-tags"
			:multiple-limit="multiple-limit"
			:name="name"
			:autocomplete="autocomplete"
			:filterable="filterable"
			:allow-create="allow-create"
			:filter-method="filter-method"
			:remote="remote"
			:remote-method="remote-method"
			:loading="loading"
			:loading-text="loading-text"
			:no-match-text="no-match-text"
			:no-data-text="no-data-text"
			:reserve-keyword="reserve-keyword"
			@change="change"
			@visible-change="visableChange"
			@remove-tag="removeTag"
			@clear="clear"
			@blur="blur"
			@focus="focus"
		>
      <slot></slot>
    </el-select>
  </div>
</template>
<script>
export default {
	name: "dsnSelect",
	props: {
		'v-model': {
			type: [Boolean, String, Number]
		},
		multiple: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false
		},
		'value-key': {
			type: String,
			default: 'value'
		},
		clearable: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'small'
		},
		'collapse-tags': {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '请选择'
		},
		'multiple-limit': {
			type: Number,
			default: 0
		},
		name: {
			type: String
		},
		autocomplete: {
			type: String,
			default: 'off'
		},
		filterable: {
			type: Boolean,
			default: false
		},
		'allow-create': {
			type: Boolean,
			default: false
		},
		'filter-method': {
			type: Function
		},
		remote: {
			type: Boolean,
			default: false
		},
		'remote-method': {
			type: Function
		},
		loading: {
			type: Boolean,
			default: false
		},
		'loading-text': {
			type: String,
			default: '加载中'
		},
		'no-match-text': {
			type: String,
			default: '无匹配数据'
		},
		'no-data-text': {
			type: String,
			default: '无数据'
		},
		'popper-class': {
			type: String
		},
		'reserve-keyword': {
			type: Boolean,
			default: false
		}
	},
  data() {
    return {};
  },
  methods: {
		change() {
			this.$emit("change", this.value);
		},
		visableChange(flag) {
			console.log('visable', flag)
			this.$emit('visible-change', flag)
		},
		removeTag(removeTag) {
			this.$emit('remove-tag', removeTag)
		},
		clear() {
			this.$emit('clear')
		},
		blur($event) {
			this.$emit('blur', $event)
		},
		focus($event) {
			this.$emit('focus', $event)
		}
	}
};
</script>
<style lang="scss" >
</style>
