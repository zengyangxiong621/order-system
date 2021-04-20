import Vue from 'vue';
import Vuex from 'vuex';
//
// import mutations from "@/store/mutations";
// import actions from "@/store/actions";
// import getters from "@/store/getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dishList: [],
    priceSum: 0,
    cartList: [],
    currentOrder: ''
  },
  getters: {
    getDishList(state) {
      return state.dishList;
    },
    getPriceSum(state) {
      return state.priceSum
    },
    getCartList(state) {
      return state.cartList
    },
    getCurrentOrder(state) {
      return state.currentOrder
    }
  },
  actions: {},
  mutations: {
    // 初始化
    setDishList(state, payload) {
      state.dishList = payload;
    },
    setPriceSum(state, payload) {
      state.priceSum = state.priceSum + payload
    },
    setPriceSumZero(state,payload) {
      state.priceSum = 0
    },
    // 初始化
    setCartList(state, payload) {
      state.cartList = payload
    },
    setCurrentOrder(state, payload) {
      state.currentOrder = payload
    }
  }
});
