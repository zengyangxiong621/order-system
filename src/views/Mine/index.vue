<template>
  <div id="mine">
    <div id="header">
      <div class="img-box">
        <img src="https://img01.yzcdn.cn/vant/cat.jpeg">
      </div>
      <div class="intro">
        <p v-if="username">{{ username }}，欢迎光临，祝您用餐愉快</p>
        <p v-else>您还未登录，点击<span style="color: #ee0a24" @click="login">登录</span>
          </p>
      </div>
    </div>
    <Divider :style="{padding: '0', margin: '0'}" />
    <Collapse v-model="activeNames">
      <Collapse-item title="我的订单" name="1" icon="todo-list-o">
        <span v-show="!getCurrentOrder">暂无订单</span>
        <span class="order-card" v-show="getCurrentOrder" @click="$router.push(`/order/${getCurrentOrder}`)">当前订单</span>
      </Collapse-item>
      <Collapse-item title="历史账单" name="2" icon="orders-o">
        <span v-show="completedOrderList.length == 0">暂无订单</span>
        <span class="order-card" v-for="item in completedOrderList" @click="$router.push(`/order/${item._id}`)">{{ item.intro }}</span>
      </Collapse-item>
      <Collapse-item title="设置" name="3" icon="setting-o">
        <span style="margin-left: 20px;" @click="exitUser()">退出</span>
      </Collapse-item>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Image as VanImage, Divider} from 'vant';
import {mapGetters} from 'vuex'
import { getCommentList } from '@/network/menu';
export default {
  name: 'mine',
  data() {
    return {
      activeNames: ['1'],
      username: '',
      completedOrderList: []
    }
  },
  computed: {
    ...mapGetters(['getCurrentOrder'])
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    async getCompletedOrders() {
      // 已经完成的订单
      const res = await getCommentList({ status: true });
      this.completedOrderList = res
      console.log('已完成的:', this.completedOrderList);
    },
    exitUser() {
      sessionStorage.clear()
      this.$router.push('/login')
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
    this.userId = sessionStorage.getItem('id')
    console.log('getCurrentOrder', this.getCurrentOrder);
    this.getCompletedOrders({status: true})
  },
  components: {
    Collapse,
    CollapseItem,
    VanImage,
    Divider
  },
};
</script>

<style scoped lang="less">
#mine {
  height: 100%;
  #header {
    height: 15%;
    display: flex;
    align-items: center;
    padding: 20px;
    .img-box {
      height: 75px;
      width: 75px;
      border-radius: 75px;
      overflow: hidden;
      margin-right: 20px;
      img {
        height: 75px;
        width: 75px;
      }
    }
    .intro {
      font-size: 14px;
    }
  }
  .order-card {
    color: #1989fa;
    margin-left: 20px;
    padding: 5px 0 5px 0;
    display: block;
  }
}

</style>
