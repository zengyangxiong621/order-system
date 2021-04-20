import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';
import less from 'less'
import 'vant/lib/index.less'
import '@/assets/theme.less'
import { Lazyload } from 'vant';

import axios from 'axios'
Vue.prototype.$axios = axios;

Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(less)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
