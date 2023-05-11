<template>
  <template v-if="playList.creator">
    <ItemMusicTop :playList="playList"></ItemMusicTop>

  </template>
  <template v-if="songs && playList.subscribedCount">
    <ItemMusicList :songs="songs" :subscribedCount="playList.subscribedCount"></ItemMusicList>
  </template>

</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { getMusicDetail, getItemList } from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'

export default {
  name: 'ItemMusic',
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
  setup() {
    const state = reactive({
      playList: {
        // creator: {},
      },
      songs: [],
    })
    onMounted(async () => {
      let id = useRoute().query.id

      //获取歌单详情页
      let res = await getMusicDetail(id)
      state.playList = res.data.playlist

      //获取歌单歌曲列表
      let result = await getItemList(id)
      // console.log(result.data.songs)
      state.songs = result.data.songs
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>

<style>
</style>