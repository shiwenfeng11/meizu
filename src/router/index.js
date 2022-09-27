import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
var router = new VueRouter({

        //对路由的配置
         routes: [
                //路由懒加载
                {path: "/", redirect: "/home"},
                {path: "/home", component: () => import("../views/Home.vue")},
                {path: "/address", component: () => import("../views/Address.vue"),meta: {auth: true}},
                {path: "/cart", component: () => import("../views/Cart.vue")},
                {path: "/category", component: () => import("../views/Category.vue")},
                {path: "/detail/:id", component: () => import("../views/Detail.vue")},
                {path: "/list/:cid", component: () => import("../views/List.vue")},
                {path: "/login", component: () => import("../views/Login.vue")},
                {path: "/order", component: () => import("../views/Order.vue"),meta: {auth: true}},
                {path: "/profile", component: () => import("../views/Profile.vue")},
                {path: "/register", component: () => import("../views/Register.vue")},
                {path: "/orderconfirm", component: () => import("../views/OrderConfirm.vue"), meta: {auth: true}},
                {path: "/pay", component: () => import("../views/Pay.vue")},
                
        ]
});
router.beforeEach(function(to, from, next) {
        if(to.meta.auth && !sessionStorage.getItem("token")) {
                Vue.prototype.$meiLoginAlert()
                        .then(()=> { next(`/login?target=${to.fullPath}`)})
                        .catch(() => {})

                        // next({path: "/login", query: {target: to.fullPath}});
        } else next()
})
export default router;