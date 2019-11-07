<template>
  <div class="article-h">
    <el-card>
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用封装组件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 具名插槽  插入多次内容时-->
    <el-card style="margin-top:30px">
      <div slot="header" class="headertou">
        <span style="font-size:18px">根据筛选条件共查询到 {{total}} 条结果:</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error">
                <img src="../../assets/error.gif" width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="toEdit(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
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
      reqParams: {
        status: null,
        channel_id: null,
        per_page: 10,
        page: 1,
        begin_pubdate: null,
        end_pubdate: null
      },
      // channelOptions: [],
      dateArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   //  赋值
    //   this.channelOptions = data.channels
    // },

    //  获取文章列表
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      //  文章列表赋值
      this.articles = data.results
      /// 总条数赋值
      this.total = data.total_count
    },
    pager (newPage) {
      // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getArticles()
    },
    changeDate (dateArr) {
      // dateArr 是数组 [date,date]  起始时间  结束时间
      // 我们需要： dateArr 是数组 [string,string]  string === '2019-10-02'
      // value-form="yyyy-MM-dd" 格式转换成功
      // 注意：清空日期之后，dateArr是null  对应的 begin end 值也该为null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选
    search () {
      // 获取筛选数据（准备日期数据）
      // 处理频道空字符串问题
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 把页码换成1
      this.reqParams.page = 1

      this.getArticles()
    },

    /// 编辑功能
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    /// 删除功能
    // 转换bigint

    async delArticle (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除成功')
      // 更新列表
      this.getArticles()
    }
  }
}
//  做频道选项渲染
</script>

<style scoped lang='less'>
.headertext {
  font-size: 18px;
  font-weight: bolder;
  vertical-align: middle;
}
.headertexts {
  font-size: 16px;
  vertical-align: middle;
}
.el-radio-group {
  vertical-align: middle;
}
.el-pagination {
  text-align: center;
  margin-top: 15px;
}
</style>
