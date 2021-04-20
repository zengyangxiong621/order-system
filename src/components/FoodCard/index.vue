<template>
  <Card
    title="商品标题"
    lazy-load
    :thumb="card.avatar"
    :price="card.price+'/'+card.unit"
  >
    <template #title>
      <div style="padding-bottom: 0.1rem;font-size: 0.4rem; font-weight: bold">
        {{ card.name }}
      </div>
    </template>
    <template #desc>
      <div>
        <Tag color="#c1bcbc">{{ card.desc }}</Tag>
      </div>
    </template>
    <template #num>
      <stepper min="0" v-model="card.nums" default-value="0" theme="round" button-size="0.6rem"
               disable-input
               @plus="plusChange()"
               @minus="minusChange()"
      />
      <!--                     @change="foodChange()"
      -->
    </template>
  </Card>
</template>

<script>
import { Card, Button, Stepper, Tag, Lazyload } from 'vant';
import { mapGetters, mapMutations } from 'vuex';
import Bus from '@/utils/bus.js';

export default {
  name: 'FoodCard',
  props: {
    card: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      nums: 0,
    };
  },
  computed: {
    ...mapGetters(['getDishList', 'getPriceSum', 'getCartList'])
  },
  methods: {
    ...mapMutations(['setDishList', 'setPriceSum', 'setCartList']),
    plusChange() {
      this.setPriceSum(parseFloat(this.card.price));
      console.log('getPriceSum', this.getPriceSum);
    },
    minusChange() {
      this.setPriceSum(-parseFloat(this.card.price));
      console.log('getPriceSum', this.getPriceSum);
      this.$emit('updateCart','更新')
    }
  },
  mounted() {
    // console.log(this.card);

  },
  created() {

  },
  components: {
    Card,
    Button,
    Stepper,
    Tag,
  }
};
</script>

<style scoped>

</style>
