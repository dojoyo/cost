import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store';
import ElementUI from 'element-ui';
import Cookies from 'js-cookie';
import 'element-ui/lib/theme-chalk/index.css';
import Vue2OrgTree from 'vue2-org-tree';
import Print from 'vue-print-nb';
import '@/styles/index.scss';
import '@/styles/resetE.scss';
import '@/icons/iconfont.css';
import 'vue-orgchart/dist/style.min.css';
import common from '@/utils/common'; // 全局方法
import filters from '@/utils/filters'; // 全局过滤器
import 'swiper/dist/css/swiper.min.css';
import 'swiper/dist/js/swiper.min';
import directive from '@/utils/directive';
import VueClipboard from 'vue-clipboard2';

import Video from 'video.js';
import 'video.js/dist/video-js.css';

import '@/utils/permission';
import $ from 'jquery';
Vue.prototype.$video = Video;

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
});

Vue.use(Print);
Vue.use(Vue2OrgTree);
Vue.use(VueClipboard);
Vue.use(directive);

// 注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key]);
}

Vue.use(common);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
