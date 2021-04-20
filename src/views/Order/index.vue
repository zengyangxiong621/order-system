<template>
  <div id="order">
    <div id="header">
      <Icon name="arrow-left" class="back" @click="$router.back()"/>
      订单页
    </div>
    <div id="business">
      <Steps :active="active" id="steps">
        <step>买家下单</step>
        <step>交易完成</step>
      </Steps>
    </div>
    <CellGroup class="order-list">
      <Cell v-for="order in orderList">
        <template #title>
          <span>{{ order.name }}</span>
        </template>
        <template #default>
          <span><b>¥{{ order.price }}</b></span> x
          <span>{{ order.nums }}</span>
        </template>
      </Cell>
      <Cell>
        <template #title>
          <span>总价</span>
        </template>
        <template #default>
          <span><b>¥{{ priceSum + '.00' }}</b></span>
        </template>
      </Cell>
    </CellGroup>
    <Field
      v-model="intro"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评价"
      show-word-limit
    >
      <template #label>
        <span style="font-weight: bold; font-size: 0.4rem">评价</span>
      </template>
    </Field>
    <Cell>
      <template #title>
        <Button type="primary" size="small" @click="orderSubmit"
                v-show="active == 0">完成订单
        </Button>
      </template>
    </Cell>
  </div>
</template>

<script>
import { Step, Steps, Button, Cell, CellGroup, Icon, Field, Notify } from 'vant';
import { getOrder, saveOrder, getOrderList } from '@/network/menu';


export default {
  name: 'Order',
  data() {
    return {
      id: '',
      active: 1,
      orderList: [],
      intro: '',
      priceSum: 0,
    };
  },
  computed: {},
  methods: {
    async orderSubmit() {
      if (this.intro == '' || this.intro == undefined) {
        Notify({
          type: 'warning',
          message: '请输入评价',
          duration: 1000
        });
      } else {
        const order = await saveOrder(this.id, {
          status: true,
          intro: this.intro
        });
        console.log(order);
        this.$nextTick(() => {
          if (order.status) {
            this.active = 1;
          }
        });
      }
    },

  },
  mounted() {
    this.id = this.$route.params.id;
    getOrder(this.id)
      .then(res => {
        this.orderList = res.orderList;
        console.log(res);
        this.intro = res.intro;
        this.orderList.forEach(item => {
          this.priceSum = this.priceSum + item.price * item.nums;
        });
        if (res.status) {
          this.active = 1;
        } else {
          this.active = 0;
        }
      });
  },

  components: {
    Step,
    Steps,
    Button,
    CellGroup,
    Cell,
    Icon,
    Field,
    Notify
  }
};
</script>

<style scoped lang="less">
#order {
  #header {
    height: 50px;
    width: 100%;
    background-color: #f7f8fa;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    position: relative;

    .back {
      position: absolute;
      top: 50%;
      left: 10px;
      font-size: 20px;
      transform: translateY(-50%);
    }
  }

  #steps {
    width: 200px;
    margin: 0 auto;
  }
  .order-list {
    height: calc(100vh - 300px);
    overflow: auto;
  }
  //#business {
  //  height: 100px;
  //}
}
</style>
