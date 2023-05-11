<template>

  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>

</template>

<script>
import { onMounted, reactive } from 'vue'
import { getBanner } from '@/request/api/home'

export default {
  name: 'TopSwiper',
  setup() {
    onMounted(async () => {
      let res = await getBanner()
      res.data.banners.forEach((item) => {
        images.push(item.pic)
      })
    })
    const images = reactive([])

    return {
      images,
    }
  },
}
</script>

<style lang="less" scoped>
.van-swipe {
  width: 100%;
  height: 3rem;
  margin-top: 0.2rem;
  .van-swipe-item {
    padding: 0 0.2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
  }
  /deep/.van-swipe__indicator--active {
    background-color: rgb(219, 130, 130);
  }
}
</style>