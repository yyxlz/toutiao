<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fanslist" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo">
                <p>{{item.name}}</p>
                <el-button type="primary" size="small" plain>+关注</el-button>
              </el-avatar>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pic"></el-tab-pane>
      </el-tabs>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list',
      fanslist: [],
      total: 0,
      reqParams: {
        page: 1,
        per_page: 20
      }
    }
  },
  created () {
    this.getFansList()
  },
  methods: {
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fanslist = data.results
      console.log(data)
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 150px;
  height: 190px;
  padding-top: 20px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
