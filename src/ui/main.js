import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/app.scss";

import Table from "buefy/dist/components/table";
import Snackbar from "buefy/dist/components/snackbar";
import Icon from "buefy/dist/components/icon";
import Dialog from "buefy/dist/components/dialog";

Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Dialog);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
