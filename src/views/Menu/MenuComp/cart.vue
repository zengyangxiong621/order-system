<template>
  <div>
    <Cell-group>
      <Cell v-for="item in getCartList" :title="item.name" v-show="item.nums>0">
        <template #default>
          <span>¥{{ item.price + '/' + item.unit }}</span>
          <Stepper
            v-model="item.nums"
            theme="round"
            button-size="22"
            disable-input min="0"
            @plus="plusChange(item)"
            @minus="minusChange(item)"
          />
        </template>
      </Cell>
    </Cell-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { Cell, CellGroup, Stepper } from 'vant';
import Bus from '@/utils/bus.js';

export default {
  name: 'cart',
  props: {},
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['getDishList', 'getCartList'])
  },
  methods: {
    ...mapMutations(['setPriceSum', 'setCartList']),
    plusChange(item) {

    },
    minusChange(item) {

    }
  },
  mounted() {

  },
  components: {
    Cell,
    CellGroup,
    Stepper
  }

};
</script>

<style scoped lang="less">

</style>
