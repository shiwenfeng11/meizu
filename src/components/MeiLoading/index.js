import Vue from "vue";
import MeiLoading from "./MeiLoading.vue";

export default {
        _instance: null,
        _count: 0,
        open(){
                this._count++;
                if(this._count === 1){
                        const MeiLoadingConstructor = Vue.extend(MeiLoading);
                        this._instance = new MeiLoadingConstructor().$mount();
                        document.body.appendChild(this._instance.$el);
                }
        },
        close(){
                this._count--;
                if(this._count === 0){
                        this._instance.$destroy(true);
                        document.body.removeChild(this._instance.$el);
                }
        }
}