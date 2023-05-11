<template>
  <div class="home">
    <TopNav></TopNav>
    <TopSwiper></TopSwiper>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue'
import TopSwiperVue from '@/components/home/TopSwiper.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'

export default {
  name: 'HomeView',
  components: {
    TopNav,
    TopSwiperVue,
    IconList,
    MusicList,
  },
}
</script>

<style scoped>
</style>
