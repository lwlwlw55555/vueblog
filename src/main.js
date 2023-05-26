import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import JsonViewer from 'vue-json-viewer'
import mavonEditor from 'mavon-editor'

import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'

import "./axios"
import "./permission"
import "./dateutil"

//el-select 懒加载
import directives from './directives'

// import dateutil from './dateutil'

// 全局注册指令
Vue.use(directives)

Vue.use(Element)
Vue.use(mavonEditor)
Vue.use(JsonViewer)
// Vue.use(dateutil)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

const http_php = axios.create({
  timeout: 10000 * 12,
  baseURL: "http://121.40.113.153",
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
Vue.prototype.$http_php = http_php

const http_java = axios.create({
  timeout: 10000 * 12,
  baseURL: "http://121.40.113.153/do_mdd",
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})
Vue.prototype.$http_java = http_java

// Vue.dateutil = dateutil

// export {dateutil}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

