import Vue from "vue";
import App from "./App.vue";
import "./config";
import ElementUI from "element-ui";
import "./assets/css/element-variables.scss";
import "./assets/css/base.css";
import "@/components";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import Blob from "@/excel/Blob.js";
// import Export2Excel from "@/excel/Export2Excel.js";

Vue.use(ElementUI);
// Vue.use(Blob);
// Vue.use(Export2Excel);
Vue.config.productionTip = false;
console.log(process.env);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
