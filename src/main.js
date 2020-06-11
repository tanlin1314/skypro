import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import './assets/styles/reset.css';
import './assets/img/0.jpg'
//


import './assets/font/iconfont.css'
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')