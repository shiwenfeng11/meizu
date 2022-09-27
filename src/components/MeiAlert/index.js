import Vue from "vue";
import MeiAlert from "./MeiAlert.vue";

export default function(message) {
        const MeiAlertConstructor = Vue.extend(MeiAlert);
        const instance = new MeiAlertConstructor({data: {message}}).$mount();
        document.body.appendChild(instance.$el);
}