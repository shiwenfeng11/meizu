import MeiTabBar from "./MeiTabBar/MeiTabBar.vue";
import MeiNotice from "./MeiNotice";
import MeiAlert from "./MeiAlert";
import MeiConfirm from "./MeiConfirm";
import MeiLoginAlert from "./MeiLoginAlert";
import MeiLoading from "./MeiLoading";
import MeiCount from "./MeiCount/MeiCount.vue";
export default {
       install: function(Vue) {
                       Vue.prototype.$meiNotice = MeiNotice;
                       Vue.prototype.$meiAlert = MeiAlert;
                       Vue.prototype.$meiConfirm = MeiConfirm;
                       Vue.prototype.$meiLoginAlert = MeiLoginAlert;
                       Vue.prototype.$meiLoading = MeiLoading;
               }
};
export {
        MeiTabBar,
        MeiCount
};
