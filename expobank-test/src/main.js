import Vue from 'vue'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import CreateRectangle from './components/CreateRectangle'
import Scan from './components/Scan'
import VueQrcodeReader from 'vue-qrcode-reader'

Vue.config.productionTip = false

Vue.use(VueQrcodeReader)
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  { path: '/create', component: CreateRectangle },
  { path: '/scan', component: Scan }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
