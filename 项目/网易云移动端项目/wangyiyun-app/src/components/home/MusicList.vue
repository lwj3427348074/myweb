<!-- <template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" :show-indicators="false" class="mySwpie">
        <van-swipe-item v-for="m in musicList" :key="m.id">{{ m.name }}</van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { getMusicList } from '@/request/api/home'
export default {
  name: 'MusicList',
  setup() {
    const state = reactive({
      musicList: [],
    })

    onMounted(async () => {
      const res = await getMusicList()
      state.musicList = res.data.result
      // console.log(reactive(res.data.result))
      console.log(state.musicList)
    })

    return {
      ...toRefs(state),
    }
  },
}
</script> -->

<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">

      <van-swipe :loop="false" :width="130" :show-indicators="false" class="mySwpie">

        <van-swipe-item v-for="m in musicList" :key="m.id">
          <router-link :to="{
            path:'/itemMusic',
            query:{id:m.id}
          }">
            <img :src="m.picUrl" alt="">
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
              </svg>
              {{ changeCount(m.playCount) }}
            </span>
            <span class="name">
              {{ m.name }}
            </span>
          </router-link>

        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { getMusicList } from '@/request/api/home'
import changeCount from '@/hook/changeCount'
export default {
  name: 'MusicList',
  setup() {
    const musicList = reactive([]) // 将musicList初始化为响应式数组
    onMounted(async () => {
      let res = await getMusicList()
      musicList.splice(0, musicList.length, ...res.data.result) // 将获取到的数据赋值给musicList
      // console.log(reactive(res.data.result))
      // console.log(musicList)
    })

    return {
      musicList,
      changeCount,
    }
  },
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playCount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
        color: black;
      }
    }
  }
}
</style>