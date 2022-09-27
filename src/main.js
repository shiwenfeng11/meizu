import Vue from 'vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/reset.css";
import './assets/css/iconfont.css';
import './assets/iconfont1/iconfont.css';
import './assets/iconfont2/iconfont.css';
import './assets/iconfont3/iconfont.css';
import './assets/iconfont4/iconfont.css';
import './assets/iconfont8/iconfont.css';
import MeiMessage from "./components";
import http from "./util/http.js";
Vue.prototype.$http = http;

Vue.use(MeiMessage);
new Vue({
        el: "#app",
        store,
        router,
        render: h => h(App)
})