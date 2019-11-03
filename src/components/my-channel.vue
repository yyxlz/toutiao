<template>
  <el-select :value="value" placeholder="请选择" class="pindao" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道选项数据
    async getChannelOptions () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值 channelOptions
      this.channelOptions = data.channels
    },
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style>
</style>
