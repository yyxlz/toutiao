<template>
  <div class="container">
    <el-card>
      <img src="../assets/logo_index.png" alt />
      <el-form :model="loginform">
        <!-- el-form-item 表单容器  label="活动名称" 指定说明文字 -->
        <el-form-item>
          <!-- 表单元素 -->
          <el-input v-model="loginform.mobile " placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 表单元素 -->
          <el-input
            v-model="loginform.code"
            style="width:210px;margin-right:8px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      alert('还没有做')
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: pink;
  background-image: url("../assets/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.el-card {
  width: 380px;
  height: 320px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-card img {
  display: block;
  width: 150px;
  margin: 0 auto;
}
.el-input {
  margin-top: 10px;
}
</style>
