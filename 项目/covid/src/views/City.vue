<template>
  <div class="city-content">
    {{ city }}
    <div id="city"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'City',
  props: {
    city: {
      type: String,
      default: '',
    },
  },
  mounted() {
    var citys = []
    axios.get('/xinlang/news/wap/fymap2020_data.d.json').then((res) => {
      // console.log(res.data.data.list)
      if (res.status === 200) {
        for (var i = 0; i < res.data.data.list.length; i++) {
          if (res.data.data.list[i].name === this.city) {
            for (var j = 0; j < res.data.data.list[i].city.length; j++) {
              var temp = {
                name: res.data.data.list[i].city[j].name + '市',
                value: res.data.data.list[i].city[j].conNum,
              }
              citys.push(temp)
            }
          }
        }
      }
      this.$charts.provinceMap('city', this.city, citys)
    })
  },
}
</script>

<style lang="less" scoped>
#city {
  widows: 10rem;
  height: 10.666667rem;
}
</style>