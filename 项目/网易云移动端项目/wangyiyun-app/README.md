# wangyiyun-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 脚手架配置：

router，vuex，less，取消ESlint，vue3，inpackage

## 配置rem自适应

在public/js/rem.js文件中,并在index里引入

## Home页面

### TopNav组件

引入字体图标

### TopSwiper组件

引入vant里的轮播图

#### scoped样式冲突问题

### IconList组件

### MusicList组件

在 `onMounted()` 函数中，`musicList` 被赋值为 `reactive(res.data.result)`，这将 `musicList` 转换为一个响应式对象。但是，这样做实际上只是将 `musicList` 的值更改为响应式对象，而不是将组件中的 `musicList` 变量绑定到响应式对象上。因此，即使 `musicList` 现在是响应式对象，但在组件中对其进行更改时，视图仍不会自动更新。



为了解决这个问题，可以将 `musicList` 定义为响应式对象并使用 `reactive()` 函数。然后，在 `onMounted()` 函数中，可以直接对 `musicList` 的值进行更改，而不是将其重新赋值。这样，组件中的 `musicList` 变量将绑定到响应式对象上，视图将自动更新。例如，可以使用以下代码：



```
javascriptCopy codeimport { onMounted, reactive } from 'vue'
import { getMusicList } from '@/request/api/home'

export default {
  name: 'MusicList',
  setup() {
    const musicList = reactive([])

    onMounted(async () => {
      const res = await getMusicList()
      musicList.splice(0, musicList.length, ...res.data.result)
    })

    return {
      musicList,
    }
  },
}
```



在这个例子中，`musicList` 被定义为响应式对象，并且在 `onMounted()` 函数中直接对其进行更改。这样，在组件中对 `musicList` 进行更改时，视图将自动更新。



#### toRefs（）的功能

另一种解决方法是使用 `toRefs()` 函数将响应式对象转换为普通对象的属性，然后将其返回给模板。这样做的好处是可以让模板中的数据绑定更加简单，而且不需要在组件中对响应式对象进行任何更改。



例如，可以使用以下代码：



```js
javascriptCopy codeimport { onMounted, reactive, toRefs } from 'vue'
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
    })

    return {
    //直接输state就是让模板上写state.musicList
      ...toRefs(state),
    }
  },
}
```



在这个例子中，`state` 对象包含一个 `musicList` 属性，这个属性是一个响应式数组。在 `onMounted()` 函数中，通过 API 请求获取到的数据被赋值给 `state.musicList`。然后，使用 `toRefs()` 函数将 `state` 对象转换为一个包含响应式属性的普通对象，并将其返回给模板。这样，在模板中就可以直接使用 `musicList`，而不需要在模板中使用 `.value` 访问响应式属性。





另一种解决方法是使用 `ref()` 函数将普通变量转换为响应式变量，然后将其返回给模板。这样做的好处是可以让代码更加简洁易懂，同时也可以提高代码的可读性和可维护性。

例如，可以使用以下代码：

```js
javascriptCopy codeimport { onMounted, ref } from 'vue'
import { getMusicList } from '@/request/api/home'

export default {
  name: 'MusicList',
  setup() {
    const musicList = ref([])

    onMounted(async () => {
      const res = await getMusicList()
      musicList.value = res.data.result
    })

    return {
      musicList,
    }
  },
}
```

在这个例子中，`musicList` 被定义为一个 `ref`，它是一个包含响应式值的对象。在 `onMounted()` 函数中，通过 API 请求获取到的数据被赋值给 `musicList.value`。然后，将 `musicList` 返回给模板。这样，在模板中就可以直接使用 `musicList`，而不需要在模板中使用 `.value` 访问响应式属性。

使用 `ref()` 函数的好处是让代码更加简洁易懂，同时也可以提高代码的可读性和可维护性。但是，使用 `ref()` 函数也有一些缺点。它会将变量转换为一个包含响应式值的对象，这意味着在模板中使用 `ref()` 函数返回的变量时，需要使用 `.value` 访问其值。这可能会让代码看起来有些冗长，并且可能会导致一些混淆和错误。此外，使用 `ref()` 函数也可能会使代码的性能略微降低，因为它需要将变量转换为一个包含响应式值的对象，并且需要在模板中使用 `.value` 访问其值。

综上所述，使用 `ref()` 函数也是一种可以解决这个问题的方法，但它也有自己的优点和缺点。在实际开发中，应该根据具体情况选择最适合自己的方法。

## Item页面

### ItemMusic（父）给子组件传值问题

![image-20230418163921807](C:\Users\LWJ\AppData\Roaming\Typora\typora-user-images\image-20230418163921807.png)

#### 方法1

```js
const state = reactive({
   playList: {
​    creator: {},
   },
  })
```

#### 方法2

```html
  <template v-if="playList.creator">
    <ItemMusicTop :playList="playList"></ItemMusicTop>
  </template>
```

#### 方法3（没有用）

另一种方法是使用 Vue 的异步组件，这可以确保子组件只有在父组件中的数据被正确地设置后才会被加载和渲染。异步组件可以使用 `defineAsyncComponent` 函数来定义，如下所示：

```js
import { defineAsyncComponent } from 'vue'

const ItemMusicTop = defineAsyncComponent(() => import('@/components/item/ItemMusicTop.vue'))

export default {
  name: 'ItemMusic',
  components: {
    ItemMusicTop,
  },
  setup() {
    const state = reactive({
      playList: {},
    })
    onMounted(async () => {
      let id = useRoute().query.id
      let res = await getMusicDetail(id)
      state.playList = res.data.playlist
    })
    console.log('我是state', state)

    return {
      ...toRefs(state),
    }
  },
}

```

在这个例子中，我们使用 `defineAsyncComponent` 函数来定义 `ItemMusicTop` 组件，并在 `ItemMusic` 父组件中使用它。这样，在父组件中的数据被正确地设置之前，`ItemMusicTop` 组件不会被加载和渲染，从而避免了在父组件中的数据还没有被正确地设置时访问 `playList.creator` 属性的问题。



需要注意的是，异步组件可能会增加页面加载时间，因为它需要在父组件加载完成后才会被加载和渲染。因此，这种方法应该根据你的具体情况来决定是否使用。

#### 方法4（没有用）

如果最后一种方法没有解决问题，你可以尝试使用 `watch` 监听器来检测 `playList` 对象的变化，并在 `playList` 对象被正确地设置后再渲染子组件。例如，你可以在父组件中添加以下代码：



```vue
vueCopy code
<template>
  <div>
    <ItemMusicTop v-if="playList" :playList="playList"></ItemMusicTop>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive, toRefs } from 'vue'
import { getMusicDetail } from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'

export default {
  name: 'ItemMusic',
  components: {
    ItemMusicTop,
  },
  setup() {
    const state = reactive({
      playList: {},
    })

    onMounted(async () => {
      let id = useRoute().query.id
      let res = await getMusicDetail(id)
      state.playList = res.data.playlist
    })

    console.log('我是state', state)

    return {
      ...toRefs(state),
    }
  },
  watch: {
    playList: {
      handler(newVal) {
        if (newVal) {
          this.$forceUpdate()
        }
      },
      deep: true,
    },
  },
}
</script>
```



在这个例子中，我们使用 `watch` 监听器来检测 `playList` 对象的变化，并在 `playList` 对象被正确地设置后再强制更新父组件，以便重新渲染子组件。这样，子组件只有在父组件中的数据被正确地设置后才会被渲染，从而避免了在父组件中的数据还没有被正确地设置时访问 `playList.creator` 属性的问题。



需要注意的是，使用 `watch` 监听器可能会增加页面的开销，因为它需要在 `playList` 对象发生变化时重新渲染整个组件树。因此，这种方法应该根据你的具体情况来决定是否使用

## FooterMusic

```
<template>
  <div class="FooterMusic">
    <div class="footerLeft">

      <img :src="$store.state.PlayList[$store.state.PlayListIndex].al.picUrl" alt="">
      <div>
        <p>
          {{ $store.state.PlayList[$store.state.PlayListIndex].al.name  }}
        </p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="pause">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <!-- <audio ref="audio" controls :src="`https://music.163.com/song/media/outer/url?id=${$store.state.PlayList[$store.state.PlayListIndex].id}`"></audio>
  </div>
</template> -->

    <div v-if="audioLoaded">
      <audio ref="audio"></audio>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, toRef, watch } from 'vue'

const audioRef = ref(null)
const audioLoaded = ref(false)
const store = useStore()

watch(audioLoaded, (value) => {
  if (value) {
    const audio = audioRef.value
    toRef(
      audio,
      'src'
    ).value = `https://music.163.com/song/media/outer/url?id=${
      store.state.PlayList[store.state.PlayListIndex].id
    }`
    audio.play()
  }
})

const play = () => {
  const audio = audioRef.value
  if (audio) {
    audio.play()
  }
}

const pause = () => {
  const audio = audioRef.value
  if (audio) {
    audio.pause()
  }
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
```

