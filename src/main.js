import Vue from 'vue'
import App from './App.vue'
import './config'
import ElementUI from 'element-ui';
import VueDraggableResizable from 'vue-draggable-resizable'
import {codemirror} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

import "./assets/css/element-variables.scss";
import "./assets/css/base.css";
import "@/components";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
Vue.use(ElementUI);
Vue.use(codemirror);
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
