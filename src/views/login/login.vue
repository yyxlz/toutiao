<template>
  <div class="container h1">
    <el-card class="el-card-login">
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form :model="loginform" :rules="LoginRules" status-icon ref="logintest">
        <!-- el-form-item 表单容器  label="活动名称" 指定说明文字 -->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input v-model="loginform.mobile " placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 表单元素 -->
          <el-input
            v-model="loginform.code"
            style="width:210px;margin-right:8px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginform.agae">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%;">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '../../utils/index'
export default {
  data () {
    /// 自定义效验在return前面定义
    const checkMobile = (rule, value, callback) => {
      // 去判断value是否符合手机号格式
      // 格式：1开头  第二位 3-9 之间  9位数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      loginform: {
        mobile: '16611111111',
        code: '246810',
        agae: ''
      },
      LoginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
          // { type: 'number', message: '验证码为数字值' }
          // { min: 1, max: 7, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录 功能
    onSubmit () {
      this.$refs['logintest'].validate(async valid => {
        if (valid) {
          // $refs 获取 操作的 dom实例   validate 验证表单
          // post   参数(url , 参数对象获取的值 )
          // 改造
          // this.$http
          //   .post('authorizations', this.loginform)
          //   .then(res => {
          //     this.$router.push('/')
          //     ///  登录成功后设置  token
          //     // 登陆成功  保存 数据
          //     //  数据 在 res中
          //     local.setuser(res.data.data)
          //   })
          //   .catch(() => {
          //     this.$notify({
          //       title: '警告',
          //       message: '手机号或验证码错误',
          //       type: 'warning'
          //     })
          //   })
          // 改造 await async
          try {
            const {
              data: { data }
            } = await this.$http.post('authorizations', this.loginform)
            // 保存用户的值
            local.setuser(data)

            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}

/// 开始登陆功能
</script>

<style  scoped lang='less'>
.h1 {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  background-image: url("../../assets/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.el-card-login {
  width: 380px;
  height: 320px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1), 0 0 6px rgba(0, 0, 0, 0.04);
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
