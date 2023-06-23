<template>
  <div class="first-list">
    <recycle-scroller
      class="list-wrap"
      :items="tableData"
      :item-size="itemHeight"
      :min-height="listHeight"
      @scroll="scrollListener"
      v-slot="{ item }"
    >
      <div class="list">
        <el-table
          ref="scrollTable"
          :data="[item]"
          stripe
          style="width: 500px"
        >
          <el-table-column
            prop="date"
            label="数据"
            width="500"
          ></el-table-column>
        </el-table>
      </div>
    </recycle-scroller>
  </div>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller'
import axios from 'axios'
import { Loading } from 'element-ui'

export default {
  name: 'firstList',
  components: {
    RecycleScroller,
  },
  data() {
    return {
      tableData: [], // 列表数据
      itemHeight: 47, // 每个项的高度
      num: 10, // 展示的数据数量
      start: 0, // 起始索引
      end: 9, // 结束索引
    }
  },
  computed: {
    // 计算列表的可视高度
    listHeight() {
      const length = this.tableData.length
      const maxVisibleItems = Math.min(length, this.num)
      return maxVisibleItems * this.itemHeight
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getRowKey(row) {
      return row.id // 假设列表项的唯一标识符为 id
    },
    scrollListener(event) {
      // 获取滚动高度
      const scrollTop = event.target.scrollTop
      // 计算开始的数组索引
      this.start = Math.floor(scrollTop / this.itemHeight)
      // 计算结束的数组索引
      this.end = this.start + this.num
    },
    getData() {
      let loadingInstance = Loading.service({ fullscreen: true })

      axios.get('/api/list').then((res) => {
        this.tableData = res.data.data.map((item) => ({ date: item }))
        console.log(this.tableData)
        loadingInstance.close()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.first-list {
  width: 100%;

  .list-wrap {
    height: 100px;
    overflow-y: scroll;

    .list {
      width: 500px;
      text-align: center;
    }
  }
}
</style>
