import axios from "axios";
import Vue from "vue";
async function http(options,withLoading = true) {
        options.headers = {Authorization: sessionStorage.getItem("token")};
       if(withLoading) Vue.prototype.$meiLoading.open(); //开启;oading
        //所有的ajax请求全部延时1.5秒再发送让loading效果能够站住(真实开发误用)
        await new Promise(resolve => setTimeout(resolve,1500));
        return axios(options)
                .then(res => {
                        if(res.status === 200) {
                                let result = res.data;
                                switch(result.code) {
                                        case 200:
                                                //成功的话： 延时1秒关闭loading，载返回数据
                                                if(withLoading)  Vue.prototype.$meiLoading.close();
                                               return result.data;
                                        case 401:
                                                sessionStorage.removeItem('token');
                                                sessionStorage.removeItem('name');
                                                Vue.prototype.$meiLoginAlert('去登录');
                                                return;
                                        case 199:
                                        case 500:
                                        case 404:
                                               throw new Error(result.msg);
                        }
        } else throw new Error(res.statusText);
})
        .catch(function(error)  {
                if(withLoading) Vue.prototype.$meiLoading.close();
                Vue.prototype.$meiAlert(error.message);
                return Promise.reject(error.message);
        });
}


export default http;