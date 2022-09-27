<template>
    <div class="container">
        <div class="header">
            <div class="header-top">
                <router-link to="/profile"><i class="iconfont icon-back"></i></router-link> 
                <span>我的订单</span>
            </div>
            <div class="header-card">
                <ul>
                    <li @click="number = 0" :class="{active:number === 0}">全部</li>
                    <li @click="unpay()" :class="{active:number === 1}">待付款</li>
                    <li @click="pay()" :class="{active:number === 2}">已付款</li>
                    <li @click="number = 3" :class="{active:number === 3}">待发货</li>
                    <li @click="number = 4" :class="{active:number === 4}">退款/售后</li>
                </ul>
            </div>
        </div>
        <div class="content" v-show="number === 0">
            <ul>
                <li>
                    <div class="top">
                        <span class="provide">供应商: 魅族</span>
                        <span></span>
                    </div>
                    <div class="list" v-for="item in list">
                        <div v-for="i in item.details" class="subList" :key="i.id">
                            <span class="detail">
                                <img :src="i.avatar" alt="">
                                <div class="right">
                                    <h5 v-text="i.name"></h5>
                                    <span class="count">X <p v-text="i.count"></p></span>
                                    <span class="price">￥ 
                                        <span v-text="i.price"></span> .00
                                    </span>
                                </div>
                            </span>
                             
                         <div class="total">共<span style="color: red" v-text="i.count"></span>件商品 合计: ￥<span v-text="i.price * i.count" style="color: red"></span>.00 (免运费)</div>
                  
                        <div class="button">
                            <span class="cancel" @click="remove(i.id)">取消订单</span>
                            <span class="pay" @click="assign(i.id)">立即付款</span>
                            
                        </div>    
                    </div>    
                        <p class="background" style="background-color: #eee; height: 3vw"></p>            
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class="content1" v-show="number === 1">
            <div class="list1" v-for="item in unpayList">
                        <div v-for="i in item.details" class="subList1" :key="i.id">
                            <span class="detail1">
                                <img :src="i.avatar" alt="">
                                <div class="right1">
                                    <h5 v-text="i.name"></h5>
                                    <span class="count1">X <p v-text="i.count"></p></span>
                                    <span class="price1">￥ 
                                        <span v-text="i.price"></span> .00
                                    </span>
                                </div>
                            </span>
                             
                         <div class="total1">共<span style="color: red" v-text="i.count"></span>件商品 合计: ￥<span v-text="i.price * i.count" style="color: red"></span>.00 (免运费)</div>
                  
                        <div class="button1">
                            <span class="cancel1" @click="remove(i.id)">取消订单</span>
                            <span class="pay1" @click="assign(i.id)">立即付款</span>
                            
                        </div>    
                    </div>    
                        <p class="background" style="background-color: #eee; height: 3vw"></p>            
                    </div>
        </div>
        <div class="content1 none" v-show="number === 1 && unpayList.length === 0">
            <img src="../assets/images/1.jpg" alt="">
            <p>暂无相关订单</p>
        </div>
        <div class="content2" v-show="number === 2">
            <div class="list" v-for="item in payList">
                        <div v-for="i in item.details" class="subList" :key="i.id">
                            <span class="detail">
                                <img :src="i.avatar" alt="">
                                <div class="right">
                                    <h5 v-text="i.name"></h5>
                                    <span class="count">X <p v-text="i.count"></p></span>
                                    <span class="price">￥ 
                                        <span v-text="i.price"></span> .00
                                    </span>
                                </div>
                            </span>
                             
                         <div class="total">共<span style="color: red" v-text="i.count"></span>件商品 合计: ￥<span v-text="i.price * i.count" style="color: red"></span>.00 (免运费)</div>
                  
                        <div class="button">
                            <span class="cancel" @click="remove(i.id)">取消订单</span>
                            <span class="pay" @click="assign(i.id)">立即付款</span>
                            
                        </div>    
                    </div>    
                        <p class="background" style="background-color: #eee; height: 3vw"></p>            
                    </div>
        </div>
        <div class="content2 none" v-show="number === 2 && payList.length === 0">
            <img src="../assets/images/1.jpg" alt="">
            <p>暂无相关订单</p>
        </div>
        <div class="content3 none" v-show="number === 3">
           
            <img src="../assets/images/1.jpg" alt="">
            <p>暂无相关订单</p>
       
        </div>
        <div class="content4 none" v-show="number === 4">
            
            <img src="../assets/images/1.jpg" alt="">
            <p>暂无相关售后订单</p>
        
        </div>
    </div>
</template>

<script>
    import {OrderAPI} from '@/api';

    export default {
        name: 'Order',
        data() {
            return {
                list: [],
                payList: [],
                unpayList: [],
                number: 0
            }
        },
        async created() {
            try {
                this.list = await OrderAPI.getAll();
            } catch(e) {}          
        },
        methods: {
            async remove(row) {
                try {
                    await this.$meiConfirm('确定取消订单吗？')
                    await OrderAPI.remove(row.id);
                    this.list.splice(row.id, 1);
                    await this.$meiNotice('取消订单成功');
                }catch(e) {}
            },
            async assign(id) {
                try {
                    await OrderAPI.get(id);
                    this.$meiNotice('支付成功');
                } catch(e) {} 
            },
            async unpay() {
                try {
                    this.number = 1;
                    this.unpayList = await OrderAPI.unpay();
                } catch(e) {}
            },
            async pay() {
                try {
                    this.number = 2;
                    this.payList = await OrderAPI.pay();
                    console.log(this.payList)
                } catch(e) {}
            }
        }
    };
</script>

<style scoped lang="stylus">
    
    .container 
        height 100vh 
        width 100vw 
        background-color #eee
        display flex 
        flex-direction column
        .header 
            height 30vw 
            background-color #fff
            flex-shrink 0 
            .header-top 
                height 15vw 
                display flex 
                align-items center 
                justify-content space-between 
                i 
                    font-size 18px
                span 
                    width 100%
                    text-align center
            .header-card 
                border-top 1px solid #ccc   
                height 15vw   
                ul 
                    display flex 
                    justify-content space-evenly
                    align-items center
                    height 100%
                    li 
                        font-size 14px 
                        height 100%
                        display flex 
                        align-items center
                        &.active 
                            border-bottom 2px solid #1E90FF
                            color #1E90FF
        .content
            flex-grow 1 
            overflow auto
            ul 
                display flex 
                margin-top 3vw
                flex-direction column 
                li 
                    border-radius 15px 15px
                    .top 
                        height 6vw 
                        border-bottom 1px solid #ccc
                        display flex 
                        justify-content space-between
                        align-items center
                        padding 0 2vw
                        font-size 16px
                        padding-bottom 2vw
                    .list 
                        border-bottom 1px solid #ccc
                        background-color #fff  
                        .subList
                            display flex 
                            height 60vw
                            border-bottom 1px solid #ccc
                            // height 30vw
                            flex-direction column
                            .detail 
                                display flex 
                                height 60% 
                                width 100%
                                img 
                                    height 90%
                                    flex-shrink 0
                                .right
                                    flex-grow 1 
                                    display flex 
                                    flex-direction column 
                                    justify-content space-evenly
                                    align-items flex-start
                                    .count 
                                        display flex
                                    .price 
                                        color red
                            .total 
                                height 12vw
                                display flex 
                                align-items center
                                justify-content flex-end
                                border-bottom 1px solid #ccc
                                border-top 1px solid #ccc
                                font-size 14px
                                padding 0 2vw
                            .button 
                                height 14vw 
                                display flex 
                                align-items center 
                                justify-content flex-end
                                .cancel 
                                    border 1px solid #ccc 
                                    padding 2vw 3vw
                                    margin-right 2vw
                                    border-radius 5px 5px
                                    font-size 14px 
                                .pay 
                                    border 1px solid #ccc 
                                    background-color red 
                                    color #fff
                                    padding 2vw 3vw 
                                    margin-right 2vw
                                    border-radius 5px 5px 
                                    font-size 14px
        .content1       
            overflow auto
            .list1 
                border-bottom 1px solid #ccc
                background-color #fff  
                .subList1
                    display flex 
                    height 60vw
                    border-bottom 1px solid #ccc
                    // height 30vw
                    flex-direction column
                    .detail1 
                        display flex 
                        height 60% 
                        width 100%
                        img 
                            height 90%
                            flex-shrink 0
                        .right1
                            flex-grow 1 
                            display flex 
                            flex-direction column 
                            justify-content space-evenly
                            align-items flex-start
                            .count1 
                                display flex
                            .price1 
                                color red
                    .total1 
                        height 12vw
                        display flex 
                        align-items center
                        justify-content flex-end
                        border-bottom 1px solid #ccc
                        border-top 1px solid #ccc
                        font-size 14px
                        padding 0 2vw
                    .button1 
                        height 14vw 
                        display flex 
                        align-items center 
                        justify-content flex-end
                        .cancel1 
                            border 1px solid #ccc 
                            padding 2vw 3vw
                            margin-right 2vw
                            border-radius 5px 5px
                            font-size 14px 
                        .pay1 
                            border 1px solid #ccc 
                            background-color red 
                            color #fff
                            padding 2vw 3vw 
                            margin-right 2vw
                            border-radius 5px 5px 
                            font-size 14px 
       
        .none 
            display flex 
            flex-grow 1
            flex-direction column 
            align-items center 
            justify-content center
            img 
                width 50%
                margin-bottom 3vw
</style>