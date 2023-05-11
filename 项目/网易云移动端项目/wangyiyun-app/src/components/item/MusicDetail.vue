<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="detailTopLeft">

      <svg class="icon bofang" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color:#fff">{{ musicList.name }}</Vue3Marquee>
        <span v-for="m in musicList.ar" :key="m.id">
          {{ m.name }}
        </span>
        <svg class="icon bofang" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>

    <div class="detailRight">
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-fenxiang-copy"></use>
      </svg>
    </div>
  </div>

  <!-- =================================== -->
  <div class="detailContent" v-if="!isLyricShow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:isbtnShow}">
    <img src="@/assets/cd.png" alt="" class="img_cd">
    <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:isbtnShow,img_ar_pauesd:!isbtnShow}" @click="isLyricShow = true">
  </div>

  <div class="musicLysic" v-if="isLyricShow" ref="musicLysic" @touchmove="handleTouchMove">
    <!-- currentTime:播放器播放时间  l.time：歌词的当前时间-->
    <p v-for="l,index in lyr" :key="index" :class="{active:currentTime*1000>=l.time && currentTime*1000 <l.pre}">
      {{ l.lrc }}</p>
  </div>

  <!-- =================================== -->
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi1-copy"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <!-- <input type="range" class="range" min="0" max="duraction" v-model="currentTime" step="0.05"> -->
      <!-- <input type="range" class="range" min="0" :max="duraction" v-model="sliderTime" step="0.05" @change="setCurrentTime"> -->

      <input type="range" class="range" min="0" :max="duraction" v-model="currentTime" step="0.05" @change="setCurrentTime">
    </div>

    <div class="footer">
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" @click="play">
        <use v-if="!isbtnShow" xlink:href="#icon-bofang"></use>
        <use v-else xlink:href="#icon-zanting"></use>

      </svg>
      <svg class="icon bofang" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'MusicDetail',
  props: ['musicList', 'play', 'isbtnShow', 'addDuration', 'changeAudio'],
  components: {
    Vue3Marquee,
  },
  data() {
    return {
      isLyricShow: false,
      // isTouching: false,
      sliderTime: 0, //存储滑块的值
      // currentTime: 0, // 存储当前时间
    }
  },
  // #region
  // computed: {
  //   ...mapState(['lyric', 'currentTime']),
  //   lyr() {
  //     let arr = []
  //     if (this.lyric) {
  //       arr = this.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
  //         let min = item.slice(1, 3)
  //         let sec = item.slice(4, 6)
  //         let mill = item.slice(7, 10)
  //         let lrc = item.slice(11, item.length)
  //         let time =
  //           parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
  //         if (isNaN(Number(mill))) {
  //           mill = item.slice(7, 9)
  //           lrc = item.slice(10, item.length)
  //           time =
  //             parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
  //         }
  //         // console.log(min, sec, Number(mill), lrc)
  //         return { min, sec, mill, lrc, time }
  //       })
  //       arr.forEach((item, index) => {
  //         if (index === arr.length - 1) {
  //           item.pre = 0
  //         } else {
  //           item.pre = arr[index + 1].time
  //         }
  //       })
  //     }
  //     console.log(arr)
  //     return arr
  //   },
  // },
  // #endregion
  computed: {
    ...mapState([
      'lyric',
      'currentTime',
      'PlayListIndex',
      'PlayList',
      'duraction',
    ]),
    lyr() {
      let arr = []
      if (this.lyric) {
        arr = this.lyric
          .split(/[(\r\n)\r\n]+/)
          .map((item) => {
            const match = item.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/)
            if (match) {
              const min = parseInt(match[1])
              const sec = parseInt(match[2])
              const mill = parseInt(match[3])
              const lrc = match[4]
              const time = min * 60 * 1000 + sec * 1000 + mill
              return { min, sec, mill, lrc, time }
            } else {
              return null
            }
          })
          .filter((item) => item !== null)
        arr.forEach((item, index) => {
          if (index === arr.length - 1) {
            item.pre = Infinity
          } else {
            item.pre = arr[index + 1].time
          }
        })
      }
      console.log(arr)
      return arr
    },
  },
  // 在这个修改后的代码中，我对 lyr() 计算属性进行了如下修改：
  // 在使用正则表达式进行匹配时，使用了 match() 方法代替了 slice() 方法。这个方法可以将匹配结果存储在一个数组中，方便我们进行后续的处理。
  // 在计算时间戳 time 时，使用了 parseInt() 方法将字符串转化为数字类型。这可以避免在后续计算中出现类型错误的问题。
  // 在遍历 arr 数组时，对于最后一句歌词，将 pre 属性设置为 Infinity，而不是 0 或 NaN。这样可以确保最后一句歌词的结束时间戳大于任何一个时间戳，从而避免后续计算中出现错误。
  // 在遍历 arr 数组时，使用了 filter() 方法过滤掉了其中的 null 元素。这可以避免在后续计算中出现错误。
  // 具体来说，新代码使用正则表达式/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/来匹配歌词中的时间戳。这个正则表达式匹配方括号中的两个数字表示分钟数，两个数字表示秒数，两到三个数字表示毫秒数，以及方括号后面的任意文本。如果匹配成功，代码会将分钟数、秒数、毫秒数、歌词文本和时间戳存储在一个对象中，并将该对象添加到数组中。如果匹配不成功，代码将返回null，并在过滤掉所有null值之后返回一个只包含有效歌词对象的数组。

  watch: {
    currentTime(newval) {
      if (this.isLyricShow) {
        //在歌词界面
        let p = this.$refs.musicLysic.querySelector('p.active')
        // console.log([p])
        if (p) {
          if (p.offsetTop > 250) {
            this.$refs.musicLysic.scrollTop = p.offsetTop - 250
          }
        }
        // console.log([this.$refs.musicLysic])
      }
      if (newval === this.duraction) {
        if (this.PlayListIndex === this.PlayList.length - 1) {
          this.updatedPlayListIndex(0)
          this.play()
        } else {
          this.updatedPlayListIndex(this.PlayListIndex + 1)
        }
      }
    },
  },
  methods: {
    ...mapMutations([
      'updateDetailShow',
      'updatedPlayListIndex',
      'updateCurrentTime',
    ]),
    backHome() {
      // if (this.isLyricShow) {
      this.isLyricShow = false
      // } else {
      this.updateDetailShow(false)
      // }
    },
    goPlay(num) {
      let index = this.PlayListIndex + num
      if (index < 0) {
        index = this.PlayList.length - 1
      } else if (index == this.PlayList.length) {
        index = 0
      }
      this.updatedPlayListIndex(index)
    },
    setCurrentTime() {
      // console.log('sliderTime:', this.sliderTime)
      // console.log('currentTime:', this.currentTime)
      // this.updateCurrentTime(this.sliderTime)
      // this.changeAudio(this.currentTime)
      // this.sliderTime = this.currentTime
    },
    handleTouchMove() {
      // Handle touch move event
      // this.$nextTick(() => {
      //   this.isTouching = true
      // })
      return
    },
  },
  mounted() {
    // console.log(this.musicList)
    // console.log(this.lyric)
    // console.log(this.lyr)
    this.addDuration()
  },
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  filter: blur(70px);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      position: relative;
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        position: absolute;
        bottom: 0.01rem;
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}

.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musicLysic {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(190, 181, 181);
    margin-bottom: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>