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
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>

</template>

<script>
import { nanoid } from 'nanoid'

export default {
  name: 'Message',
  computed: {},
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
    console.log(this.$router)
  },
  methods: {
    pushShow(m) {
      this.$router.push({
        name: 'detail',
        params: {
          id: m.id,
          title: m.title,
        },
      })
    },
    replaceShow(m) {
      this.$router.replace({
        name: 'detail',
        params: {
          id: m.id,
          title: m.title,
        },
      })
    },
  },
}
</script>

<style>
</style>