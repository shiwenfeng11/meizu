<template>
	<div class="container" v-if="isLogin">
		<div class="header" v-if="list.length > 0">
			<router-link to="/home">
				<i class="iconfont icon-back"></i>
			</router-link>
			<span class="cart-header">购物车</span>
			<div class="edit1">
				<i class="iconfont icon-wancheng" v-if="isEdit"></i>
				<i class="iconfont icon-bianji" v-else></i>
				<input  class="edit" type="button" :value="isEdit ? '完成' : '编辑'" @click="isEdit = !isEdit" />
			</div>
			
		</div>
		<div class="content" v-if="list.length > 0">
			<ul>
				<li v-for="(item, i) in list">
					<i class="check"
					   :class="{checked: status[i][isEdit ? 'checked2' : 'checked1']}"
					@click="status[i][isEdit ? 'checked2' : 'checked1'] = !status[i][isEdit ? 'checked2' : 'checked1']"></i>
					<img class="avatar" :src="item.avatar" alt="">
					<div class="detail">
						<h5 v-text="item.name"></h5>
						<span class="price" v-text="item.price"></span>
						<MeiCount :count="item.count"
						          @decrease="decrease(item.id)"
						          @increase="increase(item.id)"></MeiCount>
					</div>
				</li>
			</ul>
		</div>
		<div class="footer" v-show="!isEdit" v-if="list.length > 0">
			<i class="check"
			   :class="{checked: isAllChecked}"
			   @click="isAllChecked = !isAllChecked"></i>
			<span class="checkbox" >全选</span>
			<span class="total">总计:  ￥<span class="all" v-text="total"></span>.00</span>
			<span class="accounts" @click="goOrderConfirm">结算</span>
		</div>
		<div class="footer" v-show="isEdit" v-if="list.length > 0">
			<div><i class="check"
			        :class="{checked: isAllChecked}"
			        @click="isAllChecked = !isAllChecked"></i>
				<span class="checkbox">全选</span></div>
			<span class="delete" @click="remolveHandler">删除</span>
		</div>
		<div class="wrapper" v-else>
			<div class="title"> 购物车</div>
			<div class="go-shopping">
				<p class="text">购物车内还没有商品，赶紧去选购吧~</p>
				<router-link to="/home">随便逛逛</router-link>
			</div>
		</div>
	</div>
	<div class="go-login-wrap" v-else>
		<div class="go-login-header">
			<i></i>
			<span class="cart-title">购物车</span>
		</div>
		<div class="go-login" v-if="!isLogin">
			<p>登录后可显示您账号中已加入的商品</p>
			<router-link to="/login" class="login">去登录</router-link>
		</div>
	</div>
</template>

<script>
	import '@/assets/iconfont7/iconfont.css';
	import '@/assets/iconfont6/iconfont.css';
	import {CartAPI} from "@/api";
	import {MeiCount} from "@/components";
	//	import "../assets/css/reset.css";

        export default {
                name: "Cart",
	        components: {MeiCount},
                data: function() {
                        return {
				isEdit: false,
	                        list: [],
	                        status: [],
	                        isLogin: !!sessionStorage.getItem("token")
                        };
                },
	        computed: {
					isAllChecked: {
							get: function() {
								return this.status.every(item =>  item[this.isEdit ? 'checked2' : 'checked1']);
							},
							set: function(value) {
				this.status.forEach(item => item[this.isEdit ? 'checked2' : 'checked1'] = value)
							}
					},
		        total: {
				get: function() {
				        var total = 0;
				        this.status.forEach((item, i) => {
				                if(item.checked1) {
				                        total += this.list[i].price * this.list[i].count;
				                }
				        });
				        return total;
				}
		        },
		        removeIds() {
					return this.status.reduce((ids, item, i) => {
							item.checked2 && ids.push(this.list[i].id);
							return ids;
					},[]);
		        },
		        buyIds() {   //把用户在购物车的购物记录的id自动弄成数组
					return this.status.reduce((ids, item, i) => {
							item.checked1 && ids.push(this.list[i].id);
							return ids;
					},[]);
		        }
	        },
	       async mounted() {
		        if(!this.isLogin) return;
		        try {
					this.list = await CartAPI.get();
					this.status = this.list.map(() => ({checked1: true,checked2: false}));
		        } catch(e) {}
	        },
	        methods: {
                       async remolveHandler() {
                               await this.$meiConfirm("确定删除?")
	                          await CartAPI.remove(this.removeIds)
	                                for(var i = 0; i < this.status.length;) {
	                                        if(this.status[i].checked2) {
	                                                this.list.splice(i, 1);
	                                                this.status.splice(i,1);
	                                        } else {i++}
	                                }
                        },
		       async decrease(id) {
                                try {
                                        await CartAPI.decrease(id)
	                                this.list.find(item => item.id  === id ).count--;
                                } catch(e) {}
		        },
		       async increase(id) {
				try {
				        await CartAPI.increase(id)
					this.list.find(item => item.id === id).count++;
				} catch(e) {}
		        },
		        goOrderConfirm() {
                    this.$router.push(`/orderconfirm?ids=${JSON.stringify(this.buyIds)}`);
		        }
	        }
        };
</script>

<style lang="stylus" scoped>
	i.check
		display: inline-block
		height: 5vw
		width: 5vw
		margin-right: 2vw
		background-image: url("../assets/images/icon_checkbox_uncheck.png")
		background-size: 100% 100%
		&.checked
			background-image: url("../assets/images/icon_checkbox_check.png")
	.container
		width: 100vw
		height: 100vh
		display: flex
		flex-direction:  column
		background-color #eee
		.header
			height: 13vw
			display flex 
			justify-content space-between
			flex-shrink: 0
			line-height: 13vw
			align-items center
			padding 0 2vw
			background-color #fff
			.cart-header 
			.edit1	
				i 
					color #1E90FF
				.edit 
					font-size: 14px
					border: none
					background-color #fff
		.content
			flex-grow: 1
			overflow: auto
			border-top: 1px solid #ccc
			border-bottom: 1px solid #ccc
			padding: 2vw 2vw
			ul
				li
					display: flex
					align-items: center
					margin-bottom: 2vw
					border-radius 15px 15px 
					background-color #fff
					.avatar
						width: 26vw
						height: 26vw
						margin-right: 2vw

		.footer
			height: 13vw
			flex-shrink: 0
			padding-left: 2vw
			display: flex
			align-items: center
			justify-content: space-between
			background-color #fff
			font-size 14px
			.avatar
				width: 6vw
			.checkbox
				height: 14vw
				line-height: 14vw
				flex-shrink: 0
			.total
				margin-left: 15px
				height: 14vw
				line-height: 14vw
				.all
					display: inline-block
					font-size: 18px
					color: orange
			.accounts
				width: 28vw
				height: 13vw
				background-color: deeppink
				color: #fff
				text-align: center
				line-height: 14vw
				font-size 14px
			.delete
				width: 28vw
				height: 13vw
				background-color: deepskyblue
				color: #fff
				text-align: center
				line-height: 14vw
				font-size 14px
	.wrapper
		height 100vh
		width 100vw
		display flex
		flex-direction column
		.title
			height 14vw
			text-align center
			line-height 14vw
			flex-shrink 0
			font-size 18px
		.go-shopping
			flex-grow 1
			background-color #eee
			text-align center
			.text
				margin-top 50vw
				margin-bottom 10vw
				color #777
			a
				padding 2vw 5vw
				background-color deepskyblue
				color #fff
				border-radius 3px
	.go-login-wrap
		position fixed
		left 0
		top 0
		background-color #fff
		width 100vw
		height 100vh
		display flex
		flex-direction column
		.go-login-header
			height 14vw
			flex-shrink 0
			text-align center
			line-height 14vw
			font-size 18px
		.go-login
			flex-grow 1
			border-top 1px solid #ccc
			display flex
			flex-direction column
			align-items center
			background-color #eee
			p
				margin-top 40vw
				margin-bottom 5vw
				color #777
				font-size 14px
			.login
				background-color deepskyblue
				color #fff
				padding 2vw 6vw
				font-size 16px
</style>