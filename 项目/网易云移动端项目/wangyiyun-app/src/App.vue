<template>

  <router-view />
  <footer-music v-show="$store.state.isFooterMusic"></footer-music>
</template>
<script>
import FooterMusic from './views/FooterMusic.vue'
export default {
  name: 'App',
  components: {
    FooterMusic,
  },
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
