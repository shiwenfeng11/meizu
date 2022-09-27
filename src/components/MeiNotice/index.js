import Vue from "vue";
import MeiNotice from "./MeiNotice.vue";

export default function(message) {
        const MeiNoticeConstructor = Vue.extend(MeiNotice);
        const instance = new MeiNoticeConstructor({data: {message}}).$mount();
        document.body.appendChild(instance.$el);
}
