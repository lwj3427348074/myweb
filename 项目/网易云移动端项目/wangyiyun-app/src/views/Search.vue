<template>
  <div class="searchTop">
    <svg class="icon bofang" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="林俊杰" v-model.trim="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span class="spanKey" v-for="k in keyWorldList" :key="k" @click="searchHistory(k)">
      {{ k }}
    </span>
    <svg class="icon bofang" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>

  <div class="itemList">
    <div class="item" v-for="(s, i) in searchList" :key="s.id">
      <div class="itemLeft" @click="updateIndex(s)">
        <span class="leftSpan">{{ i + 1 }}</span>
        <div>
          <p>{{ s.name }}</p>
          <span v-for="ars in s.artists" :key="ars.id">
            {{ars.name}}
          </span>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon bofang" aria-hidden="true" v-if='s.mvid !=0'>
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from '@/request/api/home'

export default {
  name: 'Search',
  data() {
    return {
      keyWorldList: [],
      searchKey: '',
      searchList: [],
    }
  },
  methods: {
    async enterKey() {
      if (this.searchKey) {
        this.keyWorldList.unshift(this.searchKey)
        //去重
        this.keyWorldList = [...new Set(this.keyWorldList)]
        if (this.keyWorldList.length > 10) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1)
        }
        localStorage.setItem('keyWorldList', JSON.stringify(this.keyWorldList))
        let res = await getSearchMusic(this.searchKey)
        console.log(res.data.result.songs)
        this.searchList = res.data.result.songs
        // if (!this.searchList) {
        //   console.log('对不起，没有搜索结果')
        // }
        this.searchKey = ''
      }
    },
    delHistory() {
      if (confirm('是')) {
        localStorage.removeItem('keyWorldList')
        this.keyWorldList = []
      }
    },
    async searchHistory(k) {
      let res = await getSearchMusic(k)
      console.log(res.data.result.songs)
      this.searchList = res.data.result.songs
    },
    updateIndex(s) {
      s.al = s.album
      s.al.picUrl = s.album.artist.img1v1Url
      this.$store.commit('pushPlayList', s)
      this.$store.commit(
        'updatedPlayListIndex',
        this.$store.state.PlayList.length - 1
      )
    },
  },
  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList')) || []
  },
}
</script>


<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(185, 169, 169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
  width: 100%;
  padding: 0.2rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // margin-top: 0.2rem;
  // overflow: scroll;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
      .leftSpan {
        display: inline-block;
        width: 0.2rem;
        text-align: center;
      }
      div {
        p {
          width: 4.54rem;
          height: 0.4rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
        margin-left: 0.3rem;
      }
    }
    .itemRight {
      width: 20%;
      height: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      position: relative;
      .icon {
        fill: #999;
      }
      .bofang {
        position: absolute;
        left: 0;
      }
      .liebiao {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>