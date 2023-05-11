<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="PlayList[PlayListIndex].al.picUrl" alt="">
      <div>
        <p>
          {{ PlayList[PlayListIndex].name  }}
        </p>
        <span>横滑切换上下首</span>
      </div>

    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play()">
        <use v-if="!isbtnShow" xlink:href="#icon-bofang2"></use>
        <use v-else xlink:href="#icon-weibiaoti--"></use>
      </svg>

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" @timeupdate="updateTime" :src="`https://music.163.com/song/media/outer/url?id=${$store.state.PlayList[$store.state.PlayListIndex].id}`"></audio>
    <!-- 右侧弹出 -->
    <van-popup v-model:show="detailShow" position="right" :style="{ width: '100%', height: '100%' }">

      <MusicDetail :play="play" :isbtnShow="isbtnShow" :musicList="PlayList[PlayListIndex]" :addDuration="addDuration" :changeAudio="changeAudio"> </MusicDetail>
    </van-popup>
  </div>
</template>

<script>
//vue2
import { mapMutations, mapState } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
  name: 'FooterMusic',
  components: {
    MusicDetail,
  },
  data() {
    return {
      isPlay: false,
      interVal: 0,
    }
  },
  computed: {
    ...mapState([
      'PlayList',
      'PlayListIndex',
      'isbtnShow',
      'detailShow',
      'currentTime',
    ]),
  },
  mounted() {
    // console.log(this.$refs.audio)
    this.$store.dispatch(
      'getLyric',
      this.$store.state.PlayList[this.$store.state.PlayListIndex].id
    )
    // this.updateTime()
  },
  updated() {
    this.$store.dispatch(
      'getLyric',
      this.$store.state.PlayList[this.$store.state.PlayListIndex].id
    )
    this.addDuration()
  },
  methods: {
    ...mapMutations([
      'changeIsbtnShow',
      'updateDetailShow',
      'updateCurrentTime',
      'updateDuraction',
    ]),
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.changeIsbtnShow(true)
      } else {
        this.$refs.audio.pause()
        this.changeIsbtnShow(false)
      }
    },
    updateTime() {
      // console.log(this.$refs.audio.currentTime)
      this.updateCurrentTime(this.$refs.audio.currentTime)
    },
    addDuration() {
      this.updateDuraction(this.$refs.audio.duration)
    },
    changeAudio(val) {
      // console.log([this.$refs.audio.currentTime])
      // this.$refs.audio.currentTime = val
    },
  },
  watch: {
    PlayListIndex() {
      //监听下标，如果下标发生了改变，就自动播放音乐
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        //本来是暂停状态，点击音乐之后开始播放并改变图标
        this.changeIsbtnShow(true)
      }
    },
    PlayList() {
      if (!this.isbtnShow) {
        this.$refs.audio.autoplay = true
        this.changeIsbtnShow(true)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerRight {
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>