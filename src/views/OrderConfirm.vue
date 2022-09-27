<template>
	<div class="container">
		<div class="header">
			<i class="iconfont icon-back"></i>
			<span>结算</span>
		</div>
		<div class="content">
			<div class="addr-txt">
				<div class="left">
					<div class="person">
						<span v-text="$store.getters['address/defaultAddress'].receiveName"></span>
						<span v-text="$store.getters['address/defaultAddress'].receivePhone"></span>
					</div>
					<p v-text="$store.getters['address/defaultAddress'].receiveRegion"></p>
				</div>
				<router-link to="/address">
					<i class="iconfont icon-icon-05"></i>
				</router-link>
			</div>
			<p class="helper1"></p>
			<p class="hepler2"></p>

			<div class="wrap">
				<div class="list">
					<div class="supplier">供应商 : <span>魅族</span></div>
					<div class="intro" v-for="item in buyList">
						<img :src="item.avatar" alt="">
						<div class="intro-right">
							<h5 v-text="item.name"></h5>
							<p v-text="item.brief"></p>
							<span>￥ <span v-text="item.price"></span> .00 </span>
						</div>
					</div>
					<div class="prow">配送方式 <span class="right">快递配送 ( 运费 ￥ 0.00 )</span></div>
					<div class="prow">发票类型 <span class="right">电子发票 <i class="iconfont icon-zhuyi"></i></span></div>
					<div class="prow">发票抬头<span class="right">个人 </span></div>
					<div class="prow3">买家留言 <input type="text" placeholder="备注信息"></div>

					<div class="sum">共 <span v-text="`${buyList.length}`"></span> 商品 合计 : ￥ <span v-text="`${summation}`" style="color: red"></span> .00</div>
				</div>
					
					<div class="background"></div>					
			</div>
		</div>
		<div class="footer">
			<div class="total">合计: <span v-text="`${summation}`" style="color: red"></span> .00</div>
			<p @click="goPay">下单并支付</p>
		</div>
		<div></div>
	</div>
	
</template>

<script>
import {CartAPI, OrderAPI} from "@/api";


export default {
        name: "OrderConfirm",
		data() {
				return {
					buyList: [],
					pay: {
						ids: null,
						account: 0,
						addressId: 0
					}
				};
		},
		async created() {
			const ids = JSON.parse(this.$route.query.ids);
			const [list] = await  Promise.all([
					CartAPI.getByIds(ids), //拿到要回显的购物记录的数据
					this.$store.dispatch('address/init') //通知vuex数据仓库准备好address列表
				]);
			this.buyList = list;
			this.pay.ids = ids;
			this.pay.account = this.summation;
			this.pay.addressId = this.$store.getters[`address/defaultAddress`].id;
	},
	computed: {
		summation() {
			let sum = 0;
			this.buyList.forEach(item => {
				sum += item.count * item.price;
			});
			return sum;
		}
	},
	methods: {
		async goPay() {
			try {
				const orderId = await OrderAPI.confirm(this.pay);
				this.$router.push(`/pay?target=${JSON.stringify(orderId)}`);
			} catch(e) {}
			
		}
	}
};
</script>

<style lang="stylus" scoped>
	i 
		font-size 13px
	.container
		height 100vh
		width 100vw
		display flex
		flex-direction column
		.header
			height 12vw
			flex-shrink 0
			display flex
			align-items center
			justify-content space-between
			i
				font-size 24px
			span
				width 100%
				text-align center
		.content
			flex-grow 1
			border-top 1px solid #ccc
			border-bottom 1px solid #ccc
			overflow auto
			.addr-txt
				height 20vw
				display flex
				justify-content space-between
				align-items center
				margin 10px 10px
				.left
					width 90%
					height 100%
					display flex 
					flex-direction column
					justify-content space-evenly
					.person
						display flex
						justify-content space-between
                    p
						font-size 14px
						color #777
			.helper1
				width 100% 
				height 3px 
				background-color #f0415f
				margin-bottom 3vw
			.wrap
				display flex
				flex-direction column
				.list
					position relative
					padding-bottom 8vw
					.supplier
						color #ccc
						margin-left 3vw
						font-size 14px
						margin-bottom 3vw
						span
							color black
							margin-bottom 10px
					.intro
						display flex
						height 30vw
						border-top 1px solid #ccc
						.intro-right
							display flex
							flex-direction column
							justify-content space-evenly
							background-color #fff
							p
								color #ccc
							span
								color red
					.prow 
						height 10vw 
						border-top 1px solid #ccc
						font-size 12px
						color #777
						display flex
						align-items center
						justify-content space-between
						padding 0 3vw
					.prow3 
						height 10vw 
						border-top 1px solid #ccc
						font-size 12px
						color #777
						display flex
						align-items center
						justify-content space-between
						padding 0 3vw
						border-bottom 1px solid #ccc
						input 
							width 65%
							border none
							outline none
							font-size 12px
							height 100%
						.right 
							color black
					.sum 
						position absolute 
						bottom 1vw 
						right 2vw
						font-size 12px 
						color black
				.helper3  
					height 10vw 
					background-color #eee 
					display flex 
					align-items center		
					padding-left 3vw
					font-size 14px
				.prow2 
					height 10vw 
					border-top 1px solid #ccc
					font-size 12px
					color #777
					display flex
					align-items center
					justify-content space-between
					padding 0 3vw
					div 
						display flex 
						align-items center
						.icon-zhifubao 
							font-size 30px
							color #1E90FF
							margin-right 10px
						.icon-huabei
							font-size 28px
							color #6495ED
							margin-right 12px
						.icon-weixinfang	
							font-size 24px
							color #32CD32
						span 
							margin-left 5px
				.background 
					height 30vw 
					background-color #fff		
		.footer
			height 14vw
			flex-shrink 0
			display flex 
			justify-content space-between
			align-items center
			.total 
				margin-left 10px
			p 
				width 130px 
				height 100%
				background-color #f0415f
				color #fff
				display flex 
				justify-content center
				align-items center
</style>