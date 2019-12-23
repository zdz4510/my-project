<template>
  <div>
    home page
  </div>
</template>
<script>
	import { getSalaryLevelPage	} from "../../api/home.api.js";
	export default {
		data() {
			return {
				
			}
		},
		created() {
			const data = {
				currentPage: 1,
				pageSize: 10,
				salaryLevelName: '中文'
			};
			getSalaryLevelPage(data).then(data => {
				// this.tableData = data.data.data;
				// this.formInline.user = "";
				console.log(data);
			});
		}
	}
	
</script>
<style>
	
</style>