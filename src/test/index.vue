<template>
  <div class="page">
    <!-- 头 -->
    <p>header</p>
    <!-- 内容 -->
    <slot name="content" :pn="pagename"></slot>
    <!-- 尾 -->
    <p>
      <slot>后备的尾</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagename: '数据'
    }
  }
}
</script>

<style>
</style>
