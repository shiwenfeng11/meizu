<template>
    <div class="container">
            <div class="header">
                    <div class="top">
                            <router-link to="/order">
                                <i class="iconfont icon-back"></i>
                            </router-link> 
                            <span class="cashier">收银台</span>
                    </div>
                    <div class="time">
                            <div>￥ <span v-text="total"></span> .00</div>
                            <div class="timer">支付剩余时间 <span v-text="Math.floor(time / 3600)"></span> : <span v-text="Math.floor(time / 60)"></span> : <span v-text="time % 60"></span></div>
                    </div>
            </div>
            <div class="content">
                    <p class="helper3">选择支付方式 :</p>
                    <div class="prow2">
                            <div>
                                    <i class="iconfont icon-zhifubao"></i>
                                    <span>支付宝支付</span>
                            </div>
                            <input name="checked" type="radio">
                    </div>
                    <div class="prow2 prow2-1">
                            <div>
                                    <i class="iconfont icon-huabei"></i>
                                    <span>花呗支付 </span>
                            </div>
                            <input @click="isShow = true" @blur="isShow = false" name="checked" type="radio">
                    </div>
                    <ul v-show="isShow">
                            <li>
                                    <span class="free">免息</span>
                                    <p v-text="`￥${total / 3}.00 X 3期`"></p>
                                    <span>0 手续费</span>
                            </li>
                            <li>
                                    <span class="free">免息</span>
                                    <p v-text="`￥${total / 6}.00 X 6期`"></p>
                                    <span>0 手续费</span>
                            </li>
                            <li>
                                    <span class="free">免息</span>
                                    <p v-text="`￥${total / 12}.00 X 12期`"></p>
                                    <span>0 手续费</span>
                            </li>
                            <li>
                                    <span class="free">免息</span>
                                    <p v-text="`￥${total / 24}0 X 24期`"></p>
                                    <span>0 手续费</span>
                            </li>
                            </ul>
                    <div class="prow2">
                            <div>
                                    <i class="iconfont icon-weixinfang"></i>
                                    <span>微信支付</span>
                            </div>
                            <input name="checked" type="radio">
                    </div>
            </div>
            <div class="footer">
                    <div>去支付</div>
            </div>
    </div>
</template>

<script>
    import {OrderAPI} from '@/api';
    export default {
            data: function() {
                    return {
                        total: 0,
                        isShow: false,
                        time: 1200
                    };
            },
            async created() {
                    try {
                        this.total = await OrderAPI.getTotal(JSON.parse(this.$route.query.target));
                        this.getTime();
                    } catch(e){}                    
            },
            methods: {
                getTime() {
                    let timer = setInterval(() => {
                        this.time --;
                        if(this.time === 0) {
                            clearInterval(timer);
                            this.$meiConfirm('交易超时，请重新下单..');
                        }
                    },1000)
                    
                }
            }
    }
            
</script>

<style lang="stylus" scoped>
    .container
            height 100vh 
            width 100vw
            display flex 
            flex-direction column
            .header 
                    display flex 
                    flex-direction column 
                    height 40vw
                    justify-content space-between
                    flex-shrink 0
                    .top 
                            display flex 
                            justify-content center
                            text-align center
                            align-items center
                            width 100% 
                            .icon-back 
                                font-size 25px
                                margin-top 3vw
                            .cashier 
                                font-size 18px
                                width 100% 
                                margin-top 3vw
                    .time 
                            display flex 
                            flex-direction column 
                            justify-content space-evenly
                            align-items center
                            height 25vw
                            div 
                                font-size 16px 
                                color red
                                span 
                                    font-size 25px 
                                    color red
                                    font-weight bold
                            .timer 
                                color #777
                                font-size 16px 
                                font-weight bold
            .content 
                    flex-grow 1
                    overflow auto
                    .helper3 
                        background-color #eee
                        padding 2vw 3vw
                        font-size 14px 
                    .prow2 
                            height 20vw 
                            font-size 18px
                            color #777
                            display flex
                            align-items center
                            justify-content space-between
                            padding 0 3vw
                            div 
                                    display flex 
                                    align-items center
                                    flex-direction row
                                    // justify-content space-between
                                    .icon-zhifubao 
                                            font-size 40px
                                            color #1E90FF
                                            margin-right 10px
                                    .icon-huabei
                                            font-size 40px
                                            color #6495ED
                                            margin-right 12px
                                    .icon-weixinfang	
                                            font-size 40px
                                            color #32CD32
                                    span 
                                            margin-left 5px
                            input 
                                    zoom 1.7
                    ul 
                            display flex
                            flex-wrap wrap
                            justify-content space-evenly

                            li 
                                    position relative
                                    height 16vw 
                                    width 40vw
                                    border 1px solid #ccc 
                                    border-radius 10px 10px
                                    margin-bottom 5vw
                                    background-color #F5F5F5
                                    display flex 
                                    flex-direction column 
                                    align-items center
                                    justify-content center
                                    .free 
                                        position absolute 
                                        right 0 
                                        top 0 
                                        font-size 11px 
                                        color red
                                        padding 0 2vw 
                                        padding-bottom 1vw
                                        border-radius 0 10px 0 10px
                                        background-color #FFE4E1
                                    p 
                                        font-size 14px
                                    span 
                                            font-size 13px
            .footer 
                    height 14vw 
                    flex-shrink 0
                    display flex 
                    justify-content center 
                    align-items center
                    div 
                            width 60vw 
                            height 11vw 
                            background-color red
                            color #fff
                            border-radius 20px 20px
                            margin-bottom 5vw
                            border 1px solid green
                            font-size 18px 
                            display flex 
                            align-items center 
                            justify-content center
</style>