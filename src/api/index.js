import http from "@/util/http";
export const CategoryAPI = {
        get: function(fid) {
                return http({url: '/category/list/' + fid})
        }
};
export const UserAPI = {
        login: function(data) {
                return http({url: "/user/login_pwd", method: "post", data})
        }
};
export const AddressAPI = {
        get:function() {
                return http({url: "/address/list"})
        },
        setDefault: function(id) {
                return http({url: "/address/set_default/" + id});
        },
        remove:function(id) {
                return http({url: "/address/remove/" + id});
        },
       add: function(data) {
                return http({url: "/address/add", method: "post", data});
       },
        update: function(data) {
                return http({url: "/address/update", method: "post", data}); //传的是一整项，所以拿着去请求数据
        }
};

export const CartAPI = {
        getByIds: ids => http({url: "/cart/list_ids",method: "post", data: {ids}}),
        get: () => http({url: "/cart/list", method: "post"}),
        remove: ids => http({url: "/cart/remove", method: "post", data: {ids}}),
        increase: id => http({url: "/cart/increase/" + id, method: "post"}),
        decrease: id => http({url: "/cart/decrease/" + id, method: "post"}),
        add: data => http({url: "/cart/add", method: "post", data})
};
export const ProductAPI = {
        get: data =>  http({url: "/product/list", method: "post", data}, false),
        getModel:  id => http({url:"/product/model/" + id})
};
export const OrderAPI = {
        confirm : data => http({url: "/order/confirm", method: "post", data}),  //确认订单
        get: id => http({url: "/order/pay/" + id}),
        getTotal: id => http({url: "/order/account/" + id}),
        getAll: () => http({url:"/order/list_all"}),   //获取当前登录用户全部订单
        remove: id => http({url: "/order/remove/" + id}),
        unpay: () => http({url: "/order/list_unpay"}), //获取待付款
        pay: () => http({url: "/order/list_pay"})   //获取已付款
}

