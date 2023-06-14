<template>
  <div class="china-map-content">
    <p class="title"> <i></i> 疫情地图</p>
    <Tabs :currentIndex="currentIndex" @onIndex="getIndex">
      <Tab index="1" label="国内疫情">
        <div id="chinaMap"></div>
      </Tab>
      <Tab index="2" label="海外疫情">
        <div id="worldMap"></div>
      </Tab>
    </Tabs>

  </div>
</template>

<script>
import axios from 'axios'
import xinlang from '@/api/xinlangAPI.js'
import tianxin from '@/api/covidInfoAPI.js'

export default {
  name: 'ChinaMap',
  data() {
    return {
      currentIndex: '1',
    }
  },
  mounted() {
    //合并网络请求
    axios
      .all([
        xinlang.getNcovCity(),
        tianxin.getNcovAboard({
          key: '62e34ad34025d5d5127135efa58d4ca8',
        }),
      ])
      .then(
        axios.spread((ncovCity, nocvAborad) => {
          // 两个请求都执行完成
          var allCitys = []
          // {name:'内蒙古',value:10,itemStyle:{normal:{areaColor:'#f00'}}}
          for (let i = 0; i < ncovCity.data.data.list.length; i++) {
            let temp = {
              name: ncovCity.data.data.list[i].name,
              value: ncovCity.data.data.list[i].value,
            }
            allCitys.push(temp)
          }
          console.log(ncovCity.data.data.list)

          var worlds = []
          for (let i = 0; i < nocvAborad.data.newslist.length; i++) {
            let temp = {
              name: nocvAborad.data.newslist[i].provinceName,
              value: nocvAborad.data.newslist[i].currentConfirmedCount,
            }
            worlds.push(temp)
          }
          console.log(nocvAborad.data.newslist)
          // console.log(worlds)
          this.$charts.chinaMap('chinaMap', allCitys)
          this.$charts.worldMap('worldMap', worlds)
        })
      )
  },
  methods: {
    getIndex(index) {
      this.currentIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
#chinaMap {
  width: 375px;
  height: 400px;
}

#worldMap {
  width: 375px;
  height: 400px;
}

.title {
  border-top: 0.005rem solid #ebebeb;
  border-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  height: 0.44rem;
  padding: 0 0.16rem;
  font-weight: 500;
  font-size: 0.17rem;
  line-height: 0.44rem;
  background: #fff;
}

.title::before {
  content: '';
  width: 5px;
  height: 20px;
  background: #4169e2;
  margin-right: 10px;
}
</style>
