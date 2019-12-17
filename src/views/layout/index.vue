<template>
    <div id="layout">
        <DsnHeader /> 
        <DsnLeftMenu />
        <div class="content">
            <div class="routerHistory">

            </div>
           <div class="pageContent">
                <router-view></router-view>
           </div>
        </div>
        <DsnFooter />
    </div>
</template>

<script>
import  DsnFooter from './dsn-footer'
import  DsnHeader from './dsn-header'
import  DsnLeftMenu from './dsn-left-menu'
export default {
    name:'Layout',
    components:{
        DsnFooter,
        DsnHeader,
        DsnLeftMenu
    }
    

}
</script>

<style lang="scss" scoped>
  #layout{
      height: 100%;
      overflow: hidden;
       .content{
           padding: 60px 0 10px 300px;
           background: yellowgreen;
           display: flex;
           flex-direction: column;
           height: 100%;
           overflow: hidden;
           .routerHistory{
               height: 40px;
               width: 100%;
               background: black;
           }

           .pageContent{
               flex: 1; 
               overflow: hidden;
               overflow-y: scroll;
               background: white;
           }

    }
  } 
</style>