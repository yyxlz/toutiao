<template>
  <el-container class="home-container">
    <el-aside :width="isOpen?'200px':'64px'">
      <span class="img" :class="{smallLogo:!isOpen}"></span>
      <el-col :span="12">
        <el-menu
          :default-active="$route.path"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="border-right:none"
          :collapse="!isOpen"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <i class="el-icon-s-fold" @click="toggleMenu"></i>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link">
            <span class="userName">{{ name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '../../utils/index'
import eventBus from '../../eventBus'
export default {
  data () {
    return {
      isOpen: true,
      name: '',
      poto: ''
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/setting')
    },
    loginout () {
      local.deluser()
      this.$router.push('/login')
    }
  },
  created () {
    const user = local.getuser() || {}
    this.poto = user.poto
    this.name = user.name
    eventBus.$on('updateName', name => {
      this.name = name
    })
    // eventBus.$on('updatePhoto', photo => {
    //   this.photo = photo
    // })
  }
}
</script>

<style scoped lang='less'>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.el-aside {
  background-color: #002033;
}
.el-header {
  width: 100%;
  border-bottom: 1px solid #ddd;
  line-height: 60px;
}
.el-icon-s-fold {
  font-size: 30px;

  vertical-align: middle;
}
.text {
  font-size: 16px;
  margin-left: 5px;
  vertical-align: middle;
}
.el-dropdown {
  float: right;
}
.el-dropdown-link {
  font-weight: bolder;
}
.img {
  display: block;
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px
    auto;
}
.el-col {
  width: 100%;
}
.smallLogo {
  background-image: url(../../assets/logo_admin_01.png);
  background-size: 36px auto;
}
.userName {
  margin-left: 5px;
  font-weight: bold;
  vertical-align: middle;
}
</style>
