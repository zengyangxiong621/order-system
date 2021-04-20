<template>
  <div id="app">
    <keep-alive exclude="search,mine,Cart,Order">
      <router-view/>
    </keep-alive>
    <Tabbar v-model="active" z-index="80" active-color="#ee0a24">
      <TabbarItem icon="shop-o" to="/">菜单</TabbarItem>
      <TabbarItem icon="cart-o" to="/cart">购物车</TabbarItem>
      <TabbarItem icon="user-o" to="/mine">我的</TabbarItem>
    </Tabbar>
  </div>
</template>
<script>
// vant 组件
import { Tabbar, TabbarItem, Icon, Search, Toast, Button, Popover } from 'vant';
// 公共组件
export default {
  name: 'App',
  data() {
    return {
      active: 0,
      value: '',
    };
  },
  components: {
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Button,
    Popover,
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
    onSelect(action) {
      Toast(action.text);
    },
  },

};
</script>
<style>
html, body, #app {
  height: 100vh;
  width: 100vw;
}
</style>
