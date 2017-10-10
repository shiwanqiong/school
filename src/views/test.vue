<template>
  <div slot="demo">
    <scroll ref="scroll"
            :data="items"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
      <ul class="list-content">
        <li class="list-item" v-for="item in items">{{item}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../components/scroll/scroll.vue'
/*  import {ease} from '../../common/js/ease'*/

  const _data = [
    '我是第 1 行',
    '我是第 2 行',
    '我是第 3 行',
    '我是第 4 行',
    '我是第 5 行',
//    '我是第 6 行',
//    '我是第 7 行',
//    '我是第 8 行',
//    '我是第 9 行',
//    '我是第 10 行',
//    '我是第 11 行',
//    '我是第 12 行',
//    '我是第 13 行',
//    '我是第 14 行',
//    '我是第 15 行',
//    '我是第 16 行',
//    '我是第 17 行',
//    '我是第 18 行',
//    '我是第 19 行',
//    '我是第 20 行'
  ]

  export default {
    data() {
      return {
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了',
        startY: 0,
        scrollToX: 0,
        scrollToY: -200,
        scrollToTime: 700,
        scrollToEasing: 'bounce',
        scrollToEasingOptions: ['bounce', 'swipe', 'swipeBounce'],
        items: _data,
        itemIndex: _data.length
      }
    },
    components: {
      Scroll,
    },
    watch: {
      scrollbarObj() {
        this.rebuildScroll()
      },
      pullDownRefreshObj() {
        this.rebuildScroll()
      },
      pullUpLoadObj() {
        this.rebuildScroll()
      },
      startY() {
        this.rebuildScroll()
      }
    },
    computed: {
      scrollbarObj: function () {
        return this.scrollbar ? {fade: this.scrollbarFade} : false
      },
      pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {threshold: parseInt(this.pullUpLoadThreshold), txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}} : false
      }
    },
    methods: {
      scrollTo() {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
        /*this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime, ease[this.scrollToEasing])*/
      },
      onPullingDown() {
        // 模拟更新数据
        console.log('pulling down and load data')
        setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            let newPage = [
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行'
            ]
            this.items=[];
            this.items.concat(newPage);
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },
      onPullingUp() {
        // 更新数据
        console.log('pulling up and load data')
       /* setTimeout(() => {*/
          if (Math.random() > 0.5) {
            // 如果有新数据
            let newPage = [
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行',
              '我是第 ' + ++this.itemIndex + ' 行'
            ]

            this.items = this.items.concat(newPage)
          } else {
            // 如果没有新数据
            this.$refs.scroll.forceUpdate()
          }
       /* }, 1000)*/
      },
      rebuildScroll() {
        Vue.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-wrapper{
    height:100px;
  }
</style>
