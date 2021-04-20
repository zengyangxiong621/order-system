<template>
  <div id="menu">
    <NavBar :isSearched="isSearched" @shareAction="shareAction" ref="navBar"></NavBar>
    <div :class="{'order-body': true, 'order-scroll': true}" ref="orderBody">
      <div class="center" ref="center">
        <tabs v-model="active"
              swipeable
              animated
              sticky
              integer
        >
          <tab title="点餐">
            <div class="menu">
              <div :class="{'left': true, 'left-scroll': true}" ref="leftCon" @scroll="leftScroll($event)">
                <sidebar v-model="dishTypeIndex" @change="typeChange">
                  <sidebar-item v-for="(item, index) in dishType" :title="item.name" @click="dishTypeClick(index)"/>
                </sidebar>
              </div>
              <div :class="{'right': true,'right-scroll': true}" ref="rightCon" @scroll="rightScroll($event)">
                <div v-for="(item,index) in getDishList" :ref="'foodType'+index">
                  <Cell :title="item.name"/>
                  <FoodCard v-for="card in item.dishList" :card="card" @sendOrder="getOrder"></FoodCard>
                </div>
              </div>
            </div>
          </tab>
          <tab title="商家">
            <div class="business">

            </div>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ShareSheet,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Sticky,
  Card,
  Button,
  Tag,
  RadioGroup,
  Radio,
  Stepper,
  Icon,
  Sidebar,
  SidebarItem,
  Popup,
  Dialog,
  Cell
} from 'vant';
// 分享组件
import NativeShare from 'nativeshare';
// 自己定义公共组件
import NavBar from '@/components/NavBar';
import BetterScroll from '@/components/BetterScroll';
/// vuex
import { mapGetters, mapMutations } from 'vuex';

import Cart from '@/views/Menu/MenuComp/cart';

const FoodCard = () => import('@/components/FoodCard');
// http请求方法
import { getMenu, getDishType, getListByDish } from '@/network/menu';

export default {
  name: 'menu',
  data() {
    return {
      isSearched: false,
      showShare: false,
      active: 0,
      foodsArray: [],
      isScroll: false,
      dishTypeIndex: 0,
      cartShow: false,
      totalOrder: {},
      dishType: [],
      dishList: [],
      offsetTopArray: {},
    };
  },
  computed: {
    ...mapGetters(['getDishList', 'getPriceSum', 'getCartList'])
  },
  methods: {
    ...mapMutations(['setDishList', 'setCartList']),
    shareAction(text) {
      // console.log(text);
      // this.showShare = true; // 分享
      // console.log(this.showShare);
    },
    handleScroll() {
      if (this.$refs.center?.getBoundingClientRect().top && this.$refs.navBar.$el.offsetHeight) {
        // console.log('距离顶部高度', this.$refs.center.getBoundingClientRect().top);
        // console.log('navBar高度', this.$refs.navBar.$el.offsetHeight);
        let clientReactTop = this.$refs.center.getBoundingClientRect().top;
        let navBarHeight = this.$refs.navBar.$el.offsetHeight;
        if (clientReactTop < navBarHeight + 1) {
          this.isScroll = true;
        } else {
          this.isScroll = false;
        }
      }
    },
    debounce(fn, delay) {
      // 防抖
      let timer = null;
      return (...args) => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      };
    },
    dishTypeClick(index) {
      this.$refs.rightCon.scrollTo({
        top: this.offsetTopArray[index],
        behavior: 'smooth'
      });
    },
    cartClick() {
      this.cartShow = true;
    },
    getOrder(value) {
      this.totalOrder[value.name + value.id] = value;
      // console.log(this.totalOrder);
      this.solveOrder();
    },
    solveOrder() {
      // arr = arr.filter(item => item.nums == 0)
      for (const key in this.totalOrder) {
        if (this.totalOrder[key].nums == 0) {
          delete this.totalOrder[key];
        }
      }
      // console.log(this.totalOrder);
    },
    leftScroll(e) {
      // console.log(e.target.scrollTop);
    },
    rightScroll(e) {
      // console.log(e.target.scrollTop);
      // console.log(this.$refs);
      this.getOffsetTop();
      let scrollTop = e.target.scrollTop;
      let num = 0;
      const length = Object.getOwnPropertyNames(this.offsetTopArray).length - 1;
      for (const key in this.offsetTopArray) {
        if (scrollTop >= this.offsetTopArray[key] && scrollTop < this.offsetTopArray[parseInt(key) + 1]) {
          this.dishTypeIndex = key;
        }
        if (scrollTop >= this.offsetTopArray[length - 1]) {
          this.dishTypeIndex = length - 1;
        }
      }
    },
    typeChange(index) {
      // console.log(index);
    },

    getOffsetTop() {
      new Promise((resolve, reject) => {
        this.$nextTick(() => {
          for (const key in this.$refs) {
            // console.log(key);
            if (key.indexOf('foodType') !== -1) {
              this.offsetTopArray[key.match(/\d+/g)] = this.$refs[key][0].offsetTop;
            }
          }
        });
        resolve();

      }).then(() => {
        this.getOffsetTop = function () {
        };
      });
    }

  },
  mounted() {
    getDishType()
      .then(res => {
        this.dishType = res;
      });
    // 分类查询, 查询分类下的数据
    getMenu()
      .then(res => {
        // this.foodsArray = res;
        this.setDishList(res);
        this.dishList = this.dishType;
        // console.log('food:', this.foodsArray);
        // console.log('food2:', this.getDishList);
      });
    // getListByDish()
    //   .then(res => {
    //     this.setDishList(res);
    //     console.log('this.getDishList', this.getDishList);
    //   });
    window.addEventListener('scroll', this.debounce(this.handleScroll, 50), true);
    // console.log('cartData:', this.getCartData);
  },
  updated() {

  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);

  },
  components: {
    NavBar,
    ShareSheet,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    Sticky,
    Card,
    Button,
    Tag,
    RadioGroup,
    Radio,
    Stepper,
    FoodCard,
    Icon,
    Sidebar,
    SidebarItem,
    Popup,
    Dialog,
    Cell,
    Cart
  },

};
</script>

<style lang="less" scoped>
#menu {
  height: 100vh;


  .order-body {

    &.order-scroll {
      overflow-y: auto;
    }

    .header {
      height: 150px;
      background: pink;

      .my-swipe {
        height: 100%;
      }
    }

    .center {
      .menu {
        display: flex;

        .overlay {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99
        }

        .left {
          flex: 1;
          background-color: #f7f8fa;
          height: calc(100vh - 148px);

          &.left-scroll {
            overflow-y: auto;
          }
        }

        .right {
          flex: 3;
          background-color: #f7f8fa;
          height: calc(100vh - 148px);
          //overflow-y: auto;
          &.right-scroll {
            overflow-y: auto;
          }
        }
      }
    }
  }

}
</style>
