<template>
  <div id="cart">
    <div v-show="cartList.length > 0">
      <FoodCard v-for="card in cartList" :card="card" @updateCart="updateCart"></FoodCard>
    </div>
    <Empty description="请添加菜品" v-show="cartList.length == 0"/>

    <div id="subCon">
      <submit-bar :price="getPriceSum*100" button-text="提交订单" id="submit" style="z-index: 3000"
                  @submit="onSubmit" :disabled="cartList.length == 0">
        <Icon name="shopping-cart-o" color="#ee0a24" size="0.7rem"/>
      </submit-bar>
    </div>

  </div>
</template>

<script>
import { Dialog, SubmitBar, Icon, Empty } from 'vant';
import { createOrder } from '@/network/menu';

const FoodCard = () => import('@/components/FoodCard');
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Cart',
  data() {
    return {
      cartList: []
    };
  },
  computed: {
    ...mapGetters(['getDishList', 'getPriceSum'])
  },
  methods: {
    ...mapMutations(['setPriceSumZero', 'setCurrentOrder']),
    async addOrder() {
      // console.log('1');
      this.cartList = this.cartList.map(item => {
        return {
          ...item,
          userId: sessionStorage.id,
        };
      });
      const id = await createOrder(this.cartList);
      this.$nextTick(() => {
        for (const key in this.getDishList) {
          for (let i = 0; i < this.getDishList[key].dishList.length; i++) {
            this.getDishList[key].dishList[i].nums = 0;
          }
        }
        this.setPriceSumZero('归零')
        this.setCurrentOrder(id)
      });

      this.$router.push(`/order/${id}`);

      // console.log('111', this.cartList);
    },
    onSubmit() {
      let token = sessionStorage.getItem('token');
      if (token) {
        // console.log('提交:', this.cartList);
        this.addOrder();
      } else {
        Dialog.confirm({
          // title: '标题',
          message: '您还未登录, 是否登录',
          overlay: false
        })
          .then(() => {
            // on confirm
            this.$router.push('/login');
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    updateCart(value) {
      this.$nextTick(() => {
        this.cartList = this.cartList.filter(item => item.nums > 0);
      });
    }
  },
  mounted() {
    this.cartList = [];
    for (const key in this.getDishList) {
      // console.log(this.getDishList[key].dishList);
      for (let i = 0; i < this.getDishList[key].dishList.length; i++) {
        if (this.getDishList[key].dishList[i].nums > 0) {
          this.cartList.push(this.getDishList[key].dishList[i]);
        }
      }
    }
    // console.log(this.cartList);
  },
  components: {
    FoodCard,
    SubmitBar,
    Icon,
    Empty
  },
};
</script>

<style scoped lang="less">
#cart {
  height: calc(100vh - 100px);
  overflow: auto;

  #submit {
    bottom: 50px;
  }
}

</style>
