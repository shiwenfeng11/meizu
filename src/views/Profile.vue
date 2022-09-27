<template>
        <div>
                <div class="header">
                        <router-link to="/home"><i class="iconfont icon-back"></i></router-link> 
                        <span v-if="userName">
                                <img src="../assets/images/1.png" alt="">
                                <h6 v-text="userName"></h6>
                        </span>
                        <span v-else>
                                <img src="../assets/images/2.png" alt="">
                                <router-link to="/login"><h6>点击登录</h6></router-link>    
                        </span>
                        <i class="iconfont icon-xinxi"></i>
                </div>
                <p></p>
                <div class="order">
                        <div class="order-header">
                                <span>我的订单</span>
                                <div>
                                        <router-link to="/order">查看全部订单</router-link>
                                        <i class="iconfont icon-icon-05"></i>
                                </div>                
                        </div>
                        <ul>
                                <li>
                                        <i class="iconfont icon-daifukuan"></i>
                                        <span>待付款</span>
                                </li>
                                <li>
                                        <i class="iconfont icon-31daifahuo"></i>
                                        <span>待发货</span>
                                </li>
                                <li>
                                        <i class="iconfont icon-daishouhuo"></i>
                                        <span>待收货</span>
                                </li>
                                <li>
                                        <i class="iconfont icon-shouhou"></i>
                                        <span>退款/售后</span>
                                </li>
                                
                        </ul>
                </div>
                <p></p>
                <div class="my">
                        <ul>
                                <li>
                                        <i class="iconfont icon-gerenzhongxinyewodeshoucang"></i>
                                        <span>我的收藏</span>
                                </li>
                                <li>
                                        <router-link to="/address">
                                                <i class="iconfont icon-dizhi"></i>
                                                <span>我的地址</span>
                                        </router-link>      
                                </li>
                                <li>
                                        <i class="iconfont icon-hongbao"></i>
                                        <span>我的红包</span>
                                </li>
                                <li>
                                        <i class="iconfont icon-youhuiquan"></i>
                                        <span>我的优惠券</span>
                                </li>
                        </ul>
                </div>
                <p></p>
                <ul class="list">
                        <li><span>M码通道</span><i class="iconfont icon-icon-05"></i></li>
                        <li><span>手机号码查询</span><i class="iconfont icon-icon-05"></i></li>
                        <li><span>以旧换新</span><i class="iconfont icon-icon-05"></i></li>
                        <li><span>百城速达</span><i class="iconfont icon-icon-05"></i></li>
                        <li><span>联系客服</span><i class="iconfont icon-icon-05"></i></li>
                        <li><span>意见反馈</span><i class="iconfont icon-icon-05"></i></li>
                </ul> 
                <p class="end"></p>
                <div class="exit" @click="exit" v-show="userName">退出登录</div>
        </div>
</template>

<script>
        import '../assets/iconfont5/iconfont.css';
        export default {
                name: 'Profile',
                data() {
                        return {};
                },
                computed: {
                        userName() {
                                 return sessionStorage.getItem("name");
                        }
                },
                methods: {
                       async exit() {
                                await this.$meiConfirm("你确定要退出吗?");
                                await sessionStorage.clear();
                        }
                }
        };
</script>

<style lang="stylus" scoped>
        .header
                height 40vw 
                background-color #1E90FF
                display flex 
                justify-content space-between
                padding 5vw 3vw
                i 
                        font-size 25px 
                        color #fff
                span 
                        display flex 
                        flex-direction column 
                        justify-content space-evenly
                        align-items center
                        img 
                                width 20vw 
                                height 20vw 
                                border-radius 50%
                                border 2px solid #fff
                        h6 
                                color #fff 
                                font-size 20px
        p 
                height 10px 
                background-color #eee
        .order 
                .order-header 
                        display flex 
                        justify-content space-between 
                        padding 3vw 3vw
                        border-bottom 1px solid #ccc
                        div 
                                diaplay flex 
                                align-items center
                                a 
                                        color #777
                                        font-size 14px
                                        margin-right 2vw
                                i 
                                        color #ccc
                ul 
                        display flex 
                        justify-content space-around
                        height 25vw
                        li 
                                display flex 
                                flex-direction column 
                                justify-content space-evenly
                                font-size 13px
                                align-items center
                                i 
                                        font-size 33px
                                        color #777
        .my 
                ul 
                        display flex 
                        justify-content space-around 
                        height 25vw 
                        li 
                                display flex 
                                flex-direction column 
                                justify-content space-evenly
                                align-items center
                                font-size 13px
                                a 
                                        display flex 
                                        flex-direction column 
                                        justify-content space-evenly
                                        align-items center
                                        font-size 13px
                                        color black
                                        height 100%
                                .icon-gerenzhongxinyewodeshoucang 
                                        font-size 33px 
                                        color #FFA500
                                .icon-dizhi
                                        font-size 33px 
                                        color #1E90FF
                                .icon-hongbao
                                        font-size 33px
                                        color #FA8072
                                .icon-youhuiquan 
                                        font-size 33px 
                                        color #FFA500
        .list          
                li 
                        height 14vw 
                        display flex 
                        justify-content space-between
                        align-items center  
                        border-bottom 1px solid #ccc
                        padding 0 3vw
                        i 
                                color #ccc
        .end
                height 13vw 
                background-color #eee
        .exit 
                height 14vw 
                display flex 
                justify-content center 
                align-items center
                font-size 14px                                   
</style>