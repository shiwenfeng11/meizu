<template>
	<div class="container">
		<div class="header">
			<router-link to="">
				<i class="iconfont icon-fanhui"></i>
			</router-link>
			<span>魅族 18X</span>
			<router-link to="/cart">
				<i class="iconfont icon-gouwuche"></i>
			</router-link>

		</div>
		<div class="content hide-scroll-bar">
			<div class="scroll" ref="scroll">
				<ul ref="scrollContent">
					<li><img :src="bannerImgs[bannerImgs.length-1]" alt=""></li>
					<li v-for="item in bannerImgs">
						<img :src="item" alt="">
					</li>
					<li><img :src="bannerImgs[0]" alt=""></li>
				</ul>
				<div class="indicator">
					<span v-text="currentPage"></span>/<span v-text="bannerImgs.length"></span>
				</div>
			</div>
			<div class="discount">
				<span class="price">￥1999</span>
				<p class="price-box">或低至￥179.07/期</p>
				<span class="tag">818特惠</span>
			</div>
			<div class="text">
				<p class="font">【限量赠魅族超充适配器 45W】【限时 6 期免息】</p>
				<p class="font">【魅族商城APP100积分兑30元购机红包】</p>
				<p class="option"> 高通骁龙 870 + UFS 3.1 强劲性能 | 10bit 120Hz OLED 屏幕 | Flyme 9.2 | 屏下光学指纹解锁</p>
			</div>
			<div class="sale-wrap">
				<div class="sale">
					<span class="sale-show">促销</span>
					<p class="em">赠魅族超充适配器，数量有限，赠完即止</p>
				</div>
			</div>
			<div class="wrapper">
				<div class="prod">
					<span class="prod-selected">已选</span>
					<p class="s-selected">全网通公开版 玄 8+256GB 官方标配</p>
				</div>
				<div class="prod2">
					<span class="prod-suda">送至</span>
					<p class="suda-selected">山东省青岛市</p>
				</div>
			</div>
			<div class="otherImgs-wrap">
				<ul>
					<li v-for="item in otherImgs">
						<img :src="item" alt="">
					</li>
				</ul>
			</div>
		</div>
		<div class="footer">
			<div class="hide">
				<i class="iconfont icon-shoucang"></i>
				<span>收藏</span>
			</div>
			<div class="hide">
				<i class="iconfont icon-kefu"></i>
				<span>客服</span>
			</div>
			<div class="button">
				<span class="left" @click="show=true">加入购物车</span>
				<span class="right">立即购买</span>
			</div>
		</div>
		<div class="layer" v-show="show">
			<transition>
				<div class="layer-inner" v-show ="show">
					<div class="inner-header">
						<i class="iconfont icon-guanbi" @click="show = false"></i>
						<img :src="bannerImgs[0]" alt="">
						<div>
							<span>￥1999</span>
							<p>全网通公开版、玄、8+256GB、官方标配（不含充电器）  、1件</p>
						</div>
					</div>
					<div class="inner-content hide-scroll-bar">
						<div>
							<span>型号</span>
							<div>
								<span class="active">魅族 18xs</span>
								<span>魅族 18s</span>
								<span>魅族 18</span>
								<span>魅族 18x Pro</span>
							</div>
						</div>
						<div>
							<span>颜色</span>
							<div>
								<span class="active">禅</span>
								<span>玄</span>
								<span>岚</span>
								<span>白</span>
							</div>
						</div>
						<div>
							<span>内存容量</span>
							<div>
								<span class="active">8+128GB</span>
								<span>8+256GB</span>
								<span>12+256GB</span>
								<span>12+512GB</span>
							</div>
						</div>
						<div class="choice">
							<span class="count">选择数量</span>
							<span class="count-choice">
							<!-- <MeiCount></MeiCount>  -->
							<button @click="decrease(model.id)">-</button>
							<span v-text="count"></span>
							<button @click="increase(model.id)">+</button>
							</span>
						</div>
					</div>
					<div class="inner-footer">
						<div>
							<span class="inner-left" @click="add">加入购物车</span>
							<span class="inner-right">立即购买</span>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
	import {CartAPI, ProductAPI} from "@/api";
	import IScroll from "iscroll";
	// import {MeiCount} from '../components';
	export default {
	        name: "Detail",
			// components: { MeiCount, MeiCount },
		data() {
	                return {
	                        model: null,
							currentPage: 0,
							show: false,
							count: 1,
							addModel: {
								pid: 0, 
								count: 0,
							},

	                };
		},
		computed: {
	                bannerImgs() {
	                        return this.model ? this.model.bannerImgs.split(",") : [];
	                },
			otherImgs() {
	                        return this.model ? this.model.otherImgs.split(",") : [];
			}

		},
		async created() {
	                try{
                                let id = parseInt(this.$route.params.id);
                                this.model = await ProductAPI.getModel(id);
								console.log(this.model)
								this.addModel.pid = id;
								// this.addModel.count = this.model.count;
                                this.$nextTick(() => {
                                        this.$refs.scrollContent.style.width = `${this.bannerImgs.length + 2}00vw`;
                                        this.scroll = new IScroll(this.$refs.scroll, {
                                                scrollX: true,
                                                scrollY: false,
                                                snap: true,
	                                        	momentum: false
                                        }); 
                                        this.scroll.on("scrollEnd", () => {
                                                if(this.scroll.currentPage.pageX === this.bannerImgs.length + 1) {
                                                        this.scroll.goToPage(1, 0, 0);
                                                        this.currentPage = 1;
                                                        return;
                                                } else if(this.scroll.currentPage.pageX === 0) {
                                                        this.scroll.goToPage(this.bannerImgs.length, 0, 0);
                                                        this.currentPage = this.bannerImgs.length;
                                                        return;
                                                };
                                                this.currentPage = this.scroll.currentPage.pageX;
                                        });
                                        this.scroll.goToPage(1, 0, 0);
	                                this.currentPage = 1;
                                })
	                } catch(e) {}
		},
		methods: {
			async decrease(id) {
				await CardAPI.decrease(id);
				this.count = this.count - 1;
				
			},
			async increase(id) {
				await CartAPI.increase(id);
				this.count = this.count + 1;
			},
			async add() {
				await CartAPI.add(this.addModel);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	.container
		overflow hidden
		width 100vw
		height 100vh
		display flex
		flex-direction column
		.layer
			.layer-inner
				&.v-enter
					transform translateY(100%)
				&.v-enter-to
					transition all 0.4s
				&.v-enter-to
					transform translateY(0)
		.header
			flex-shrink 0
			height 14vw
			display flex
			justify-content  space-around
			line-height 14vw
			i
				font-size 18px
			span
				font-size 20px
		.content
			overflow auto
			border-top 1px solid #ccc
			border-bottom 1px solid #ccc
			flex-grow 1
			.scroll
				overflow hidden
				touch-action pan-x
				position relative
				.indicator
					position absolute
					right 3vw
					bottom 2vw
					width 12vw
					height 7vw
					display flex
					justify-content center
					align-items center
					background-color rgba(0, 0, 0, 0.3)
					border-radius 10vw
				ul
					display flex
					li
						flex-shrink 0
						height 100vw
						width 100vw
						img
							width 100%
							height 100%
			.discount
				height 17vw
				background-color red
				.price
					font-size 18px
					color #fff
					margin-left 5vw
					margin-top 3vw
				.price-box
					font-size 14px
					color #fff
					display inline-block
					margin-left 5vw
					margin-top 3vw
				.tag
					font-size 12px
					margin-left 9vw
					margin-top 1vw
					color #fff
					display block
			.text
				padding 3vw 2vw
				.font
					font-size 12px
					color red
				.option
					font-size 12px
					color balck
					margin-top 2vw
			.sale-wrap
				height 13vw
				background-color #eee
				display flex
				justify-content center
				align-items center
				.sale
					height 11vw
					width 100%
					background-color #fff
					display flex
					justify-content around
					align-items center
					.sale-show
						margin 8vw 2vw
						color #777
						font-size 12px
						width 10vw
					.em
						font-size 12px
			.wrapper
				.prod
					padding 5vw 2vw
					display flex
					align-items center
					.prod-selected
						font-size 12px
						color #ccc
						margin-right 3vw
					.s-selected
						font-size 12px
						color black
				.prod2
					padding 5vw 2vw
					display flex
					align-items center
					.prod-suda
						font-size 12px
						color #ccc
						margin-right 3vw
					.suda-selected
						font-size 12px
						color black
			.otherImgs-wrap
				margin-top 5vw
				ul
					li
						img
							width 100%


		.footer
			height 14vw
			flex-shrink 0
			display flex
			align-items center
			position relative
			.hide
				display flex
				flex-direction column
				justify-content center
				align-items center
				margin-left 3vw
				span
					color #777
					font-size 12px
			.button
				width 60vw
				height 14vw
				position absolute
				bottom 0
				right 0
				display flex
				text-align center
				margin-left 3vw
				.left
					width 50%
					background-color blue
					line-height 14vw
					color #fff
				.right
					width 50%
					background-color red
					line-height 14vw
					color #fff
		.layer
			position fixed
			background-color rgba(0, 0, 0, 0.3)
			width 100vw
			height 100vh
			.layer-inner
				height 85vh
				width 100vw
				background-color #fff
				position absolute
				bottom 0
				left 0
				display flex
				flex-direction column
				overflow hidden
				.inner-header
					height 32vw
					flex-shrink 0
					display flex
					padding 2vw 0
					position relative
					i
						position absolute
						right 1vw
						top 1vw
						font-size 14px
					img
						width 30vw
						flex-shrink 0
					div
						display flex
						flex-grow 1
						flex-direction column
						justify-content space-evenly
						span
							color red
						p
							font-size 12px
				.inner-content
					flex-grow 1
					border-top 1px solid #eee
					border-bottom 1px solid #eee
					overflow auto
					div
						padding 2vw 2vw
						span
							width 100%
							height 7vw
							line-height 7vw
						div
							display flex
							flex-wrap wrap
							justify-content space-around
							align-items center
							width 100%
							span
								width 40%
								height 7vw
								border 1px solid #ccc
								text-align center
								line-height 7vw
								margin 2vw 0
								font-size 12px
								color #777
								&.active
									border 1px solid royalblue
					.choice
						padding 2vw 2vw
						.count
							width 100%
							height 7vw
							line-height 7vw
						.count-choice
							display flex
							justify-content space-around
							width 23vw
							margin-top 2vw
							button
								width 7vw
								height 7vw
								font-size 14px
							i
								font-size 14px
								width 7vw
								height 7vw
				.inner-footer
					height 14vw
					flex-shrink 0
					div
						width 100vw
						height 13vw
						border-radius 10px
						display flex
						justify-content center
						.inner-left
							width 45%
							background-color blue
							line-height 13vw
							color #fff
							text-align center
							border-radius 20px  0   0 20px
						.inner-right
							width 45%
							background-color red
							line-height 13vw
							color #fff
							text-align center
							border-radius   0 20px  20px 0

</style>