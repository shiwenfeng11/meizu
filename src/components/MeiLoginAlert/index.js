import Vue from "vue";
import MeiLoginAlert from "./MeiLoginAlert.vue";

export default function() {
        return new Promise((resolve, reject) => {
                const MeiLoginAlertConstructor = Vue.extend(MeiLoginAlert);
                const instance = new MeiLoginAlertConstructor({data: {resolve, reject}}).$mount();
                document.body.appendChild(instance.$el);
        });
}