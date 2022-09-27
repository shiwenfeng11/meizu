<template>
    <div>
        <div class="header">
                <div class="top">
                        <i class="iconfont icon-sousuo"></i>
                        <span>魅族</span>
                        <router-link to="/cart">
                                <i class="iconfont icon-gouwuche" style="color: black"></i>  
                        </router-link>
                            
                </div>
                <div class="bottom">
                        <ul>
                                <li>推荐</li>
                                <li>手机</li>
                                <li>声学</li>
                                <li>PANDAER</li>
                                <li>配件</li>
                                <li>lipro</li>
                        </ul>
                </div>
        </div>
        <div class="content">
                <!-- 轮播 -->
                <div class="rotation">
                        <ul class="image" v-for="item in imgArr" :key="item.id">
                                <!-- <li><img :src="imgArr[length - 1].url" alt="暂无图片"></li> -->
                                <li><img :src="item.url" alt="暂无图片"></li>
                                <!-- <li><img :src="imgArr[0].url" alt="暂无图片"></li> -->
                        </ul>
                        <ul class="indicator">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                        </ul>
                </div>
                <ul class="list">
                        <li  v-for="item in list">
                                <img :src="item.url" alt="">
                                <h6 v-text="item.name"></h6>
                        </li>
                </ul>
                <p class="background"></p>
                <div class="wrap">
                        <img class="left" src="../assets/images/13.jpg" alt="">
                        <div class="right">
                                <img src="../assets/images/14.jpg" alt="">
                                <img src="../assets/images/15.jpg" alt="">
                        </div>
                </div>
                <div class="phone">智能手机</div>
                <div class="sec1"><img src="../assets/images/16.jpg" alt=""></div>
                <p class="background"></p>
                <div class="sec2">
                        <ul>
                                <li v-for="item in phoneList">
                                        <img :src="item.url" alt="">
                                        <h6 v-text="item.name"></h6>
                                        <p v-text="item.content"></p>
                                        <span> ￥ <span v-text="item.price"></span> 起 </span>
                                </li>
                        </ul>
                </div>
                <div class="sec3">
                        <div class="pandaer">奇趣探索</div>
                        <div>
                                <img src="../assets/images/17.jpg" alt="">
                                <img src="../assets/images/18.jpg" alt="">
                        </div>
                </div>
                <div class="sec4">
                        <ul>
                                <li v-for="item in musicList">
                                        <img :src="item.url" alt="">
                                        <h6 v-text="item.name"></h6>
                                        <p v-text="item.content"></p>
                                        <span> ￥ <span v-text="item.price"></span></span>
                                        <p class="background1"></p>
                                </li>
                        </ul>
                </div>
        </div>
    </div>
</template>


<script>

	export default {
                name: 'Home',
                data() {
                        return {
                                imgArr: [
                                        {id: 0, url:require("../assets/images/3.jpg")},
                                        {id: 1, url:require("../assets/images/2.jpg")},
                                        {id: 2, url:require("../assets/images/4.jpg")},
                                        {id: 3, url:require("../assets/images/5.jpg")},
                                        {id: 4, url: require("../assets/images/6.jpg")},
                                        {id: 5, url:require("../assets/images/7.jpg") },
                                        {id: 6, url:require("../assets/images/8.jpg") }
                                ],
                                list: [
                                        {url: require("../assets/images/9.jpg"), name: "魅族宠粉周"},
                                        {url: require("../assets/images/10.jpg"), name: "免费换电池"},
                                        {url: require("../assets/images/11.jpg"), name: "奇趣潮品"},
                                        {url: require("../assets/images/12.jpg"), name: "以旧换新"}
                                ],
                                phoneList: [
                                        {url: require("../assets/images/3.png"), name: "魅族 18X", price: "1829", content: "限量赠充电器 | 6期免息"},
                                        {url: require("../assets/images/4.png"), name: "魅族 18S", price: "2699", content: "限时12期免息"},
                                        {url: require("../assets/images/5.png"), name: "魅族 18 Pro", price: "3299", content: "限时6期免息"},
                                        {url: require("../assets/images/6.png"), name: "魅族 18s Pro", price: "3599", content: "限时126期免息"}
                                ],
                                musicList: [
                                        {url: require("../assets/images/19.jpg"), name: "变速箱 潮充", price: "219", content: "3路电路 | 自适应分配"},
                                        {url: require("../assets/images/20jpg.jpg"), name: "白金星舟耳机", price: "399", content: "机械感滑轨舱 | Flyme妙连"},
                                        {url: require("../assets/images/21.jpg"), name: "妙磁充电器", price: "89", content: "妙磁闪充 | 妙磁收纳"},
                                        {url: require("../assets/images/22.jpg"), name: "妙磁冰能散热游戏背甲", price: "129", content: "半导体制冷"},
                                        {url: require("../assets/images/23.jpg"), name: "妙磁冰能闪充背甲", price: "199", content: "充电、磁吸、散热一体"},
                                        {url: require("../assets/images/24.jpg"), name: "妙磁冰能超冲背甲", price: "299", content: "全陶瓷热界面 | 10N磁力"},
                                        {url: require("../assets/images/25.jpg"), name: "妙磁抗菌壳", price: "129", content: "魅族 17/18/18s系列适用"},
                                        {url: require("../assets/images/26.jpg"), name: "重塑手机壳", price: "49", content: "魅族 18X 适用"},
                                        {url: require("../assets/images/27.jpg"), name: "妙磁抗菌壳", price: "79", content: "iPhone 12/13 系列适用"},
                                        {url: require("../assets/images/28.jpg"), name: "妙磁抗菌壳", price: "79", content: "iPhone 12/13 系列适用"}
                                ]
                        }
                },

        }
</script>

<style lang="stylus">
        .header 
                display flex 
                flex-direction column 
                justify-content evenly
                .top 
                        display flex 
                        justify-content space-between 
                        height 10vw
                        align-items center
                        padding 0 3vw
                        i 
                                font-size 18px
                        span 
                                width 15vw 
                                display flex 
                                justify-content space-between
                .bottom 
                        ul 
                                display flex 
                                justify-content space-around
                                font-size 14px
                                height 15vw
                                align-items center
        .content 
                .rotation 
                        position relative 
                        height 52vw 
                        width 100% 
                        overflow hidden
                        .image 
                                li 
                                        img 
                                                width 100%
                .list 
                        height 30vw 
                        display flex 
                        justify-content space-evenly
                        align-items center
                        li 
                                display flex 
                                flex-direction column 
                                justify-content space-between
                                align-items center
                                img 
                                        width 60%
                                        margin-bottom 2vw
                                h6 
                                        font-weight normal
                .background 
                        height 3vw 
                        background-color #eee
                .wrap 
                        height 70vw 
                        display flex
                        .left 
                                width 50%
                        .right 
                                height 100% 
                                img 
                                        height 50% 
                .phone 
                        height 20vw 
                        background-color #eee
                        display flex 
                        justify-content center 
                        align-items center
                        font-weight bold
                        font-size 20px
                .sec1 
                        height 43vw      
                        img 
                                width 100%  
                .sec2 
                        ul 
                                display flex 
                                flex-wrap wrap
                                justify-content space-between
                                background-color #eee
                                height 510px
                                li 
                                        width 49% 
                                        height 66vw 
                                        display flex 
                                        flex-direction column 
                                        justify-content space-evenly
                                        align-items center
                                        background-color #fff
                                        img 
                                                width 80%
                                        h6 
                                                font-size 14px
                                        p 
                                                font-size 12px 
                                                color red 
                                                border 1px solid red 
                                                padding 1vw 1vw
                                        span 
                                                font-size 13px
                .sec3 
                        .pandaer
                                height 20vw 
                                display flex 
                                align-items center 
                                justify-content center
                                background-color #eee
                                font-weight bold 
                        div 
                                img 
                                        width 50%
                .sec4
                        ul 
                                display flex 
                                flex-wrap wrap
                                justify-content space-between
                                background-color #eee
                                
                                li 
                                        width 49% 
                                        height 66vw 
                                        display flex 
                                        flex-direction column 
                                        justify-content space-evenly
                                        align-items center
                                        background-color #fff
                                        img 
                                                width 80%
                                        h6 
                                                font-size 14px
                                        p 
                                                font-size 12px 
                                                color #777
                                                padding 1vw 1vw
                                        span 
                                                font-size 13px 
                                        .background1 
                                                height 1vw 
                                                background-color #eee
                                                width 100%

</style>















