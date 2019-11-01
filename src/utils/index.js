///  功能 封装一个 函数 用来保存信息
//  (设置)  获取  清除
//  定义一个 key  key
const KEY = 'hm-toutiao-pc-85-user-key'
const local = {
  setuser (user) {
    // res  中接收的是对象  要转换成  json 字符串
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
    // 保存 值 完成
  },
  //  获取值
  getuser () {
    var jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  //  清除
  deluser () {
    window.sessionStorage.removeItem(KEY)
  }
}

export default local

/// /   设置完成
