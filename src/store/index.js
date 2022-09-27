//创建vuex对象并导出
import Vue from 'vue';
import Vuex from 'vuex';
import address from './address.js';
Vue.use(Vuex);

const store = new Vuex.Store({
        modules: {address}
});

export default store;