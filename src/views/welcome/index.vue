<template>
    <div>
        欢迎页面
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name:'welcome',
    data(){
        return {

        }
    },
    created(){
        const systemId = this.$route.query.systemId;
        this.getUserInfo(systemId)
    },
    methods:{
      ...mapActions([
          'getUserInfo'
      ])
    }
}
</script>