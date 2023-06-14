<template>
  <div class="home-content">
    <Header></Header>
    <CovidInfo :covid-info="covidInfo"></CovidInfo>
    <CaseNumData :case-num-data="caseNumData"></CaseNumData>
    <ChinaMap></ChinaMap>
    <MySwiper></MySwiper>
    <SpringTravel></SpringTravel>
  </div>
</template>

<script>
import api from '@/api/covidInfoAPI.js'

import Header from '@/components/Header.vue'
import CovidInfo from '@/components/CovidInfo.vue'
import CaseNumData from '@/components/CaseNumData.vue'
import ChinaMap from '@/components/ChinaMap.vue'
import MySwiper from '@/components/MySwiper.vue'
import SpringTravel from '@/components/SpringTravel.vue'

export default {
  name: 'Home',
  components: {
    Header,
    CovidInfo,
    CaseNumData,
    ChinaMap,
    MySwiper,
    SpringTravel,
  },
  data() {
    return {
      // 疫情信息:CovidInfo
      covidInfo: {
        riskarea: '',
      },
      caseNumData: {
        modifyTime: '',

        currentConfirmedIncr: '',
        currentConfirmedCount: '',

        confirmedIncr: '',
        confirmedCount: '',

        suspectedIncr: '',
        suspectedCount: '',

        curedIncr: '',
        curedCount: '',

        deadIncr: '',
        deadCount: '',

        seriousIncr: '',
        seriousCount: '',
      },
    }
  },
  created() {
    api
      .getNcov({
        key: 'b5919dd6f573907e378d0a6be7a78ff3',
      })
      .then((res) => {
        // console.log(res.data)
        if (res.status === 200) {
          // 疫情信息数据
          this.covidInfo.riskarea = res.data.newslist[0].riskarea

          // 疫情病例数据
          this.caseNumData.modifyTime = res.data.newslist[0].desc.modifyTime

          this.caseNumData.currentConfirmedIncr =
            res.data.newslist[0].desc.currentConfirmedIncr
          this.caseNumData.currentConfirmedCount =
            res.data.newslist[0].desc.currentConfirmedCount

          this.caseNumData.confirmedIncr =
            res.data.newslist[0].desc.confirmedIncr
          this.caseNumData.confirmedCount =
            res.data.newslist[0].desc.confirmedCount

          this.caseNumData.suspectedIncr =
            res.data.newslist[0].desc.suspectedIncr
          this.caseNumData.suspectedCount =
            res.data.newslist[0].desc.suspectedCount

          this.caseNumData.curedIncr = res.data.newslist[0].desc.curedIncr
          this.caseNumData.curedCount = res.data.newslist[0].desc.curedCount

          this.caseNumData.deadIncr = res.data.newslist[0].desc.deadIncr
          this.caseNumData.deadCount = res.data.newslist[0].desc.deadCount

          this.caseNumData.seriousIncr = res.data.newslist[0].desc.seriousIncr
          this.caseNumData.seriousCount = res.data.newslist[0].desc.seriousCount
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style lang="less" scoped>
</style>