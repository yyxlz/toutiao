<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }" class="headertext">首页</el-breadcrumb-item>
    <el-breadcrumb-item class="headertexts">
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread'
}

/// 公用级别组件
</script>

<style>
</style>
