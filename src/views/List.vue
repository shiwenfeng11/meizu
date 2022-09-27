<template>
	<div class="container">
		<div class="header">
			<router-link to="/category">
				<i class="iconfont icon-back"></i>
			</router-link>
			<input type="text" placeholder="请输入搜索关键字..." v-model.trim.lazy="search.name">
			<router-link to="/home">
				<i class="iconfont icon-home"></i>
			</router-link>
			</div>
		<div class="order">
			<span :class="{active: search.orderCol === 'price'}" @click="changeOrder('price')">价格 <i :class="`iconfont icon-${search.orderDir}`"></i></span>
			<span :class="{active: search.orderCol === 'sale'}" @click="changeOrder('sale')">销量 <i :class="`iconfont icon-${search.orderDir}`"></i></span>
			<span :class="{active: search.orderCol === 'rate'}" @click="changeOrder('rate')">好评 <i :class="`iconfont icon-${search.orderDir}`"></i></span>
		</div>
		<div class="content" ref="scroll">
			<div class="item-container">
				<ul class="item-list">
					<li v-for="item in list" :key="item.id">
						<router-link :to="`/detail/${item.id}`">
							<img :src="item.avatar" alt="">
							<div class="item-content">
								<h5 class="name" v-text="item.name"></h5>
								<span class="brief" v-text="item.brief"></span>
								<div class="price-wrapper">
									￥ <span class="price" v-text="item.price"></span>.00元
								</div>
								<div class="rate-sale">
									<span class="rate" v-text="'好评：' + item.rate"></span>
									<span class="sale" v-text="'销量：' + item.sale"></span>
								</div>
							</div>
						</router-link>
					</li>
			</ul>
				<p>—— <span v-text="tip"></span> ——</p></div>
		</div>
		<i class="iconfont icon-top rocket" @click="toTop"></i>
	</div>
</template>

<script>
	import imagesloaded from "imagesloaded";
	import {ProductAPI} from "@/api";
	import IScroll from 'iscroll'; //被new的需要写大写
        export default {
                name: "List",
                data() {
                        return {
				search: {
				        name: "",
					cid: parseInt(this.$route.params.cid),
					orderCol: "price",
					orderDir: "asc",
					pageSize: 6
				},
	                        list: [],
	                        isLoading: false,
	                        hasMore: true //标识按照当前搜索条件还有没有更多商品可供加载
                        };
                },
	        computed: {
                        tip() {
                                if(this.isLoading) return '加载更多...'
                                else if(this.hasMore) return '上拉加载更多';
                                else if(this.list.length === 0) return '暂无相关商品，敬请期待...';
                                else return '已到达底部';
                        }
                },
	        watch: {
                        search: {
                                handler: function() { this.getList() },
	                        deep: true,
	                        immediate: true
                        },
		        list() {
					//在本次数据变化导致的页面dom渲染完毕后做某一件事情
					this.$nextTick(() => {
						imagesloaded(this.$refs.scroll,() => {
								if(this.scroll)  this.scroll.refresh();
								else {
										this.scroll = new IScroll(this.$refs.scroll,{
												//对滚动进行详细深入的配置
												bounce: false,  //关掉边界回弹
											deceleration: 0.003,
											click: true
										});
										this.scroll.on("scrollEnd",() => {
												//正在加载中，如果没有更多//如果没到底 不做响应
											if(this.isLoading || this.scroll.maxScrollY !== this.scroll.y || !this.hasMore) return;
												this.getList(true);
										});
								}
						});
				});
			}
			},
		methods: {
			changeOrder(col) {
				if(this.isLoading) {
					this.$meiNotice('您的操作太频繁了..');
					return;
				}
				if(col !== this.search.orderCol)
					this.search.orderCol = col;
				else
					this.search.orderDir = this.search.orderDir === "asc" ? "desc" : "asc";
			},
			async getList(isLoadMore = false) {
				try {
					if(!isLoadMore) this.list = [];
					this.isLoading = true;
					let list =  await ProductAPI.get({...this.search,begin: isLoadMore ? this.list.length : 0})
					this.hasMore = this.search.pageSize === list.length;
					if(isLoadMore) this.list = [...this.list, ...list];
					else  this.list = list;
					if(this.scroll && !isLoadMore) this.scroll.scrollTo(0,0) //换了一批全新的数据需要滚到顶部开始浏览
					this.isLoading = false;
				} catch(e) {}
			},
			toTop() {
				if(this.scroll) this.scroll.scrollTo(0, 0, 400);
			}
		},

		beforeDestroy() {
			if(this.scroll) {
					//释放iscroll占用的内存空间
				this.scroll.destroy();
				this.scroll = null;
			}
		}
        };
</script>

<style lang="stylus" scoped>
	i.rocket
		position fixed
		right 2vw
		bottom 2vw
		z-index 100
		width 10vw
		height 10vw
		border-radius 50%
		background-color rgba(0, 0, 0, 0.3)
		line-height 10vw
		text-align center
		color #fff
	.container
		width 100vw
		height 100vh
		display flex
		flex-direction column
		background-color #eee
		.header
			height 15vw
			flex-shrink 0
			display flex
			justify-content space-between
			align-items center
			background-color #fff
			padding 0 3vw
			
			i
				font-size 25px
				color #ccc
			input
				height 7vw
				width 55vw
				border-radius 50vw
				border none
				border 1px solid #777
				text-indent 1em
		.order
			height 12vw
			border-top 1px solid #ccc
			border-bottom 1px solid #ccc
			flex-shrink 0
			display flex
			font-size 14px
			justify-content space-around
			align-items center
			background-color #fff
			span
				display flex
				align-items center
				i
					font-size 14px
				&.active
					color orange
		.content
			padding 0 2vw
			flex-grow 1
			overflow hidden /* IScroll硬性要求*/
			touch-action: pan-y;
			.item-container
				.item-list
					li
						height 43vw
						display flex
						margin-top 2vw
						background-color #fff
						border-radius 20px 20px
						padding 0 2vw
						display flex 
						align-items center
						a
							width 100%
							display flex
							img
								flex-shrink 0
								width 40%
								height 90%
								
							.item-content
								display flex
								flex-direction column
								justify-content space-evenly
								color black
								flex-grow 1
								h5
									font-size 16px
									font-weight 400
								.brief
									font-size 13px
									color #ccc
								.price-wrapper
									font-size 13px
									.price
										color red
										font-size 16px
								.rate-sale
									display flex
									justify-content space-evenly
									font-size 14px
									color #777
				p
					height 13vw
					line-height 13vw
					text-align center
					color #ccc


</style>