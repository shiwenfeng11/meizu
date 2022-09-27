import Vue from "vue";
import MeiConfirm from "./MeiConfirm.vue";
export default function(message) {
        return new Promise((resolve, reject) => {
                const MeiConfirmConstructor = Vue.extend(MeiConfirm);
                const instance = new MeiConfirmConstructor({data: {message, resolve, reject}}).$mount();
                document.body.appendChild(instance.$el);
        })

}