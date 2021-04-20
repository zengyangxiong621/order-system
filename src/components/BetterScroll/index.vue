<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "BetterScroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      scroll: ''
    }
  },
  mounted() {
    // 1. 创建 BScroll 对象
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true

      })
    })

    // 2. 监听滚动的位置
    if (this.probeType === 2 || this.probeType ===3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }

    // 3. 监听上拉事件 滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    }


  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y ,time)
    },
    finishPullUp(time) {
      this.scroll.finishPullUp()
    },
    refresh() {
      // console.log('---')
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll.y
    }
  }

}
</script>

<style scoped>

</style>
