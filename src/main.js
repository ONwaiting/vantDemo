import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import Qs from "qs";
Vue.prototype.$echarts = echarts
Vue.prototype.$qs = Qs
Vue.use(VueAxios, axios)
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
