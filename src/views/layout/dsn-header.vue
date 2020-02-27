<template>
  <div id="dsnHeader" :class="[isOpen ? '' : 'close', HeaderTheme]">
    <div class="center">
      <i class="el-icon-s-fold header-item" @click="handleCloseOrOpen"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in match" :key="index" v-show="item">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      
      <!-- 消息提示 -->
      <div class="right-item">
        <el-popover
          placement="bottom"
          width="300"
          trigger="click"
        >
          <el-badge class="header-item" slot="reference" :value="notifiCount" :max="99">
            <i class="el-icon-bell"></i>
          </el-badge>

          <!-- 弹框内容 -->
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClickMessage">
              <el-tab-pane :label="'通知（'+notificationList.length+'）'" name="first">
                <div class="message_wrap">
                  <notificatItem v-for="(item, index) in notificationList" :key="index" :avatar='item.avatar' :content='item.content' :date='item.date'></notificatItem>
                  <div class="text-center">
                    <el-button class="btn-clear" type="text">
                      <i class="el-icon-delete"></i> <span>清空通知</span>
                    </el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="'关注（'+attentionList.length+'）'" name="second">
                <div class="message_wrap">
                  <notificatItem v-for="(item, index) in attentionList" :key="index" :avatar='item.avatar' :content='item.content' :date='item.date'></notificatItem>
                  <div class="text-center">
                    <el-button class="btn-clear" type="text">
                      <i class="el-icon-delete"></i> <span>清空关注</span>
                    </el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="'待办（'+agendaList.length+'）'" name="third">
                <div class="message_wrap">
                  <notificatItem 
                    v-for="(item, index) in agendaList"
                    :key="index"
                    :visibleAvatar='false'>
                    <div slot="content" class="flex between">
                     {{item.content}} 
                      <!-- tag cate : 【default、blue、red】 -->
                      <el-tag size='mini' class="tag-default" v-if="item.state == '1'">未开始</el-tag>
                      <el-tag size='mini' class="tag-blue" v-else-if="item.state == '2'">进行中</el-tag>
                      <el-tag size='mini' class="tag-red" v-else-if="item.state == '3'">已超时</el-tag>
                    </div>
                    <div slot="date" class="date">
                      需要在 {{item.date}} 之前完成 
                    </div>
                  </notificatItem>
                  <div class="text-center">
                    <el-button class="btn-clear" type="text">
                      <i class="el-icon-delete"></i> <span>清空待办</span>
                    </el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-popover>
      </div>


      <!-- 个人中心 -->
      <div class="right-item">
        <el-dropdown class="header-item">
          <span class="el-dropdown-link">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <span class="user-name">
              张三
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <i class="el-icon-user"></i> 个人中心</el-dropdown-item>
            <el-dropdown-item> <i class="el-icon-setting"></i> 设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="loginOutDialogVisible = true"><i class="el-icon-refresh-right"></i>  退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 切换语言 -->
      <div class="right-item">
        <el-dropdown class="header-item">
          <span class="el-dropdown-link">
            <i class="el-icon-picture-outline-round"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>简体中文</el-dropdown-item>
            <el-dropdown-item divided>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 更多 -->
      <div class="right-item">
        <el-button class="header-item" @click="drawer = true" type="text"><i class="el-icon-more"></i></el-button>
      </div>

      <!-- 右侧抽屉 -->
      <el-drawer
        class="drawer-header"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
        :modal-append-to-body='true'
        :append-to-body='true'
        size='300px'>
        <el-divider>主题风格设置</el-divider>
        <el-button class="header-setting-theme" type="text" @click="themeLeftMenu('dark')" :class="Theme === 'dark' ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg" alt="">
        </el-button>
        <el-button class="header-setting-theme" type="text" @click="themeLeftMenu('light')" :class="Theme === 'light' ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-light.262af236.svg" alt="">
        </el-button>
        <br>
        <el-button class="header-setting-theme" type="text" @click="setHeaderTheme('light')" :class="HeaderTheme === 'light' ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg" alt="">
        </el-button>
        <el-button class="header-setting-theme" type="text" @click="setHeaderTheme('dark')" :class="HeaderTheme === 'dark' ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/header-theme-dark.1606ed02.svg" alt="">
        </el-button>
        <el-button class="header-setting-theme" type="text" @click="setHeaderTheme('blue')" :class="HeaderTheme === 'blue' ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/header-theme-primary.babcd2f1.svg" alt="">
        </el-button>
        <el-divider>导航设置</el-divider>
        <div class="header-setting-item">
          <div class="header-setting-item-desc">固定侧边栏</div>
          <el-switch v-model="headerValue1"></el-switch>
        </div>
        <div class="header-setting-item">
          <div class="header-setting-item-desc">固定侧边栏  
            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top">
            <el-button type="text"><i class="el-icon-question"></i></el-button>
          </el-tooltip>
          </div>
          <el-switch v-model="headerValue2"></el-switch>
        </div>
      </el-drawer>

      <!-- 退出登录确认框 -->
      <el-dialog
        :visible.sync="loginOutDialogVisible"
        :modal-append-to-body='true'
        :append-to-body='true'
        width="400px"
        :show-close='false'>
        <div class="dialog-head"> <i class="el-icon-question"></i> 退出登录确认</div>
        <p>您确定退出登录当前账户吗？打开的标签页和个人设置将会保存。</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="loginOutDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="loginOut()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import notificatItem from "./dsn-notificat-item";
import {mapState} from 'vuex'
import { clearToken }   from '@/until/action';
export default {
  name: "dsnHeader",
  components: {
   notificatItem
  },
  data() {
    return {
      match: [], // 当前路由
      loginOutDialogVisible: false,
      isOpen: true,
      drawer: false, // 右侧更多
      Theme: 'dark', // 左侧皮肤
      HeaderTheme: 'light', // 头部皮肤
      headerValue1: true,
      headerValue2: true,
      activeName: 'second', // 消息tab
      message: [
        {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
      ]
    };
  },
  watch:{
    $route(){
      this.match = []  
      this.$route.matched.forEach(element => {
        this.match.push(element.meta.title)
        
      });
    }
  },
  computed:{
    ...mapState({
      // 待办通知
      agendaList:state=>{
         const arr =state['headerMessage']['agendaList'];
         if(arr.length){
              return  arr;
         }
         return []
      },
      // 关注通知
      attentionList:state=>{
         const arr =state['headerMessage']['attentionList'];
         if(arr.length){
              return  arr;
         }
         return []
      },
      // 消息通知
      notificationList:state=>{
         const arr =state['headerMessage']['notificationList'];
         if(arr.length){
              return  arr;
         }
         return []
      }
    }),
    notifiCount() {
      return this.agendaList.length + this.attentionList.length + this.notificationList.length || 0
    }
  },
  created() {
    this.$nextTick(() => {
      console.log(mapState([]))
     
    })
  },
  methods: {
    handleCloseOrOpen() {
      this.isOpen = !this.isOpen;
      this.$emit("handleCloseOrOpen");
    },
    handleClickMessage(tab, event) {
      console.log(tab, event)
    },
    handleClose () {
      console.log('close')
      this.drawer = false
    },
    // 设置左侧主题
    themeLeftMenu(theme) {
      this.Theme = theme
      this.$emit('themeLeftMenu', theme)
    },
    // 设置头部主题
    setHeaderTheme(id) {
      this.HeaderTheme = id
    },
    // 退出登录
    loginOut() {
      console.log('loginOUt')
      this.loginOutDialogVisible =false;
       clearToken();
      this.$router.push({
        name:'login'
      })
    }
  }
};
</script>
<style lang="scss" scoped>
@import './Theme.scss';
.date {
  font-size: 12px;
  color: #808695;
}
/deep/ .el-popper{
  padding: 0;
  .el-tabs__header {
    margin-bottom: 0
  }
}
/deep/ .el-tabs__header {
  margin-bottom: 0
}
/deep/ .message_wrap {
  .message_list {
    max-height: 400px;
    overflow: auto;
  }
  .message_item {
    display: flex;
    padding: 12px 24px;
    border-bottom: 1px solid #e8eaec;
    cursor: pointer;
    -webkit-transition: background-color .2s ease-in-out;
    transition: background-color .2s ease-in-out;
    text-align: left;
    &:hover {
      background-color: #f0faff;
    }
    .message_item-right {
      margin-left: 15px;
      h4 {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #515a6e;
      }
      span {
        font-size: 12px;
        color: #808695;
      }
    }
  }
}
.drawer-header {  
  /deep/ .el-drawer__header {
    margin-bottom: 0;
  }
  /deep/ .el-drawer__body {
    padding: 0 20px 20px;
  }
  /deep/ .header-setting-item{
    display: flex;
    align-items: center;
    padding: 12px 0;
    .header-setting-item-desc {
      flex: 1 1;
      font-size: 14px;
    }
  }
  .el-icon-question {
    font-size: 15px;
  }
  .header-setting-theme {
    margin-right: 10px;
    &::after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: transparent;
      margin: 10px auto 0 auto;
    }
    &.active::after{
      background: #19be6b;
    }
  }
}
/deep/ .el-dialog {
  border-radius: 6px;
  background-clip: padding-box;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  .el-dialog__header {
    padding: 0;
  }
  .dialog-head {
    i {
      font-size: 22px;
      color: #f90;
      margin-right: 10px;
    }
    color: #17233d;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
  }
}

</style>
<style lang="scss">
#dsnHeader {
  position: fixed;
  height: 64px;
  left: 0;
  top: 0;
  width: 100%;
  padding-left: 256px;
  z-index: 998;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  &.close {
    padding-left: 61px;
  }
  .center {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    .el-icon-s-fold {
      margin-right:15px;
      height: 64px;;
      line-height: 64px;
      font-weight: normal;
      font-size: 18px;
      color: #515a6e;
      cursor: pointer;
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
   
    & i {
      font-size: 18px;
      color: #515a6e;
      font-weight: normal;
    }
    .el-badge {
      .el-badge__content{
        top: 16px;
        left:0;
        right: auto
      }
    }
    .el-dropdown-link {
      display: inline-flex;
      align-items: center;
    }
    .right-item {
      height: 100%;
      line-height: 64px;
      .user-name {
        margin-left: 12px;
        font-size: 12px;
      }
      .el-avatar--small {
        width: 24px;
        height: 24px;
      }
    }
  }
  
}

</style>
