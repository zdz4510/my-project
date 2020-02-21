import Vue from "vue";
import App from "./App.vue";
import "./config";
import ElementUI from "element-ui";
import VueDraggableResizable from "vue-draggable-resizable";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import VueCookies from "vue-cookies";
import { DEFaLTDIALOG } from "@/constant/";
// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

import "./assets/css/element-variables.scss";
import "./assets/css/base.css";
import "./assets/css/customer.scss";
import "./assets/css/resetElement.scss";
import "@/components";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { loadMore } from './directives';
Vue.use(ElementUI);
Vue.use(codemirror);
Vue.use(VueCookies);
Vue.use(loadMore);
Vue.component("vue-draggable-resizable", VueDraggableResizable);
Vue.config.productionTip = false;

new Vue({
  provide: {
    defaltDialogWidth: DEFaLTDIALOG //默认的宽度
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
