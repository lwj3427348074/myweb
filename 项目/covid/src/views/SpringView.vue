<template>
  <div class="spring-view-content">
    <div class="from">
      <h3 class="title">{{ fromInfo.city_name }}</h3>
      <p>{{ fromInfo.high_in_desc }}</p>
      <p>{{ fromInfo.low_in_desc }}</p>
      <p>{{ fromInfo.out_desc }}</p>
    </div>
    <hr>
    <div class="to">
      <h3 class="title">{{ toInfo.city_name }}</h3>
      <p>{{ toInfo.high_in_desc }}</p>
      <p>{{ toInfo.low_in_desc }}</p>
      <p>{{ toInfo.out_desc }}</p>
    </div>
  </div>
</template>

<script>
import api from '@/api/springTravelAPI.js'

export default {
  data() {
    return {
      fromInfo: {},
      toInfo: {},
    }
  },
  props: {
    citys: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  mounted() {
    console.log(this.citys)
    api
      .springTravelQuery({
        key: 'f262e27601fc38e25474621bdf9e577f',
        from: this.citys[0].value,
        to: this.citys[1].value,
      })
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          this.fromInfo = res.data.result.from_info
          this.toInfo = res.data.result.to_info
        }
      })
  },
}
</script>

<style lang="less" scoped>
.title {
  font-size: 0.16rem;
  margin: 0 0 0.08rem 0.16rem;
}
</style>