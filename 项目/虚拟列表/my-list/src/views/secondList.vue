<template>
  <div class="second-list">
    <div
      ref="listWrap"
      style="height:100px;overflow-y: scroll;"
      @scroll="scrollListener"
    >
      <div ref="list">
        <el-table
          ref="scrollTable"
          :data="showList"
          stripe
          style="width: 500px"
        >
          <el-table-column
            prop="date"
            label="数据"
            width="500"
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="数据"
            width="500"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div></div>
    <div
      ref="bottomScroll"
      class="bottom-scroll"
    >
      <div
        class="bottom-scroll-content"
        :style="{ width: bottomScrollWidth }"
      >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'

export default {
  name: 'secondList',
  data() {
    return {
      tableData: [], // 列表数据
      itemHeight: 47, // 每个项的高度
      num: 10, // 展示的数据数量
      start: 0, // 起始索引
      end: 9, // 结束索引,
      bottomScrollWidth: '100%', // 底部滚动条的宽度
    }
  },
  computed: {
    // 获取展示的列表
    showList() {
      return this.tableData.slice(this.start, this.end)
    },
    // 获取列表长度
    length() {
      return this.tableData.length || 0
    },
  },
  watch: {
    length(val) {
      // 如果列表长度超过10行数据，则设置高度为最大的47 * 10 = 470像素
      if (val >= 10) {
        this.$refs.listWrap.style.height = this.itemHeight * this.num + 'px'
      } else {
        // 如果不足10行数据，高度加57是因为表头的高度，具体情况可以根据实际情况调整
        this.$refs.listWrap.style.height = this.itemHeight * val + 57 + 'px'
      }
    },

    bottomScrollWidth: {
      // 两个滚动条同时滚动
      handler() {
        // 监听滚动条
        this.$nextTick(() => {
          this.tableDom = this.$refs.scrollTable.bodyWrapper
          this.tableDom.addEventListener('scroll', () => {
            // 与表格滚动条同步
            const scrollLeft = this.tableDom.scrollLeft
            this.$refs.bottomScroll.scrollTo(scrollLeft, 0)
          })
          const bottomScroll = this.$refs.bottomScroll
          bottomScroll.addEventListener('scroll', () => {
            // 与表格滚动条同步
            const scrollLeft = this.$refs.bottomScroll.scrollLeft
            this.$refs.scrollTable.bodyWrapper.scrollTo(scrollLeft, 0)
          })
        })
      },
      deep: true,
    },
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$refs.listWrap.style.height = '100px' // 设置可视区域的高度
  },
  methods: {
    scrollListener() {
      // 获取滚动高度
      const scrollTop = this.$refs.listWrap.scrollTop
      // 计算开始的数组索引
      this.start = Math.floor(scrollTop / this.itemHeight)
      // 计算结束的数组索引
      this.end = this.start + this.num
      this.$refs.list.style.transform = `translateY(${
        this.start * this.itemHeight
      }px)` // 对列表项进行Y轴偏移
    },
    getData() {
      let loadingInstance = Loading.service({ fullscreen: true })

      axios.get('/api/list').then((res) => {
        this.tableData = res.data.data
        this.tableData = this.tableData.map((item) => {
          let Arr = {}
          Arr.date = item
          return Arr
        })
        console.log(this.tableData)
        loadingInstance.close()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.second-list {
  width: 100%;

  .el-table {
    margin: 0 auto;

    /deep/ .cell {
      text-align: center;
    }
  }

  .bottom-scroll {
    width: 100%;
    overflow-x: auto;
  }
  .bottom-scroll-content {
    /* 高度不设置的话滚动条出不来 */
    height: 1px;
  }
  // 让该页面的横向滚动条隐藏
  /deep/.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden !important;
  }
}
</style>

