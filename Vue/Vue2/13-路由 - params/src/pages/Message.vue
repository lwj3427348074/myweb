<template>
  <div>
    <ul>
      <li
        v-for="m in messageList"
        :key="m.id"
      >
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{ m.title }}</router-link> -->
        <router-link :to="{
          // 用params只能用name
          name:'detail',
          params:{
            id:m.id,
            title:m.title
          }
        }">
          {{ m.title }}</router-link>
        &nbsp;&nbsp;
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>

</template>

<script>
import { nanoid } from 'nanoid'
import axios from 'axios'

export default {
  name: 'Message',
  computed: {
    // Message() {
    //   axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
    //     (response) => {
    //       console.log(response.data)
    //       return response.data
    //     },
    //     (error) => {
    //       return nanoid()
    //     }
    //   )
    // },
  },
  data() {
    return {
      messageList: [
        { id: nanoid(), title: '消息001' },
        { id: nanoid(), title: '消息002' },
        { id: nanoid(), title: '消息003' },
      ],
    }
  },
  mounted() {
    // axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
    //   (response) => {
    //     console.log('请求成功', response.data)
    //   },
    //   (error) => {
    //     console.log('请求失败', error)
    //   }
    // )
  },
}
</script>

<style>
</style>