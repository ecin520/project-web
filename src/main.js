// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import VCharts from 'v-charts'
import './common/css/index.scss'
import 'github-markdown-css'
import moment from 'moment'

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css'

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() => {
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  }, 1)
});

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios;

Vue.use(ElementUI)
Vue.use(VCharts)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
