<template>
	<div class="container">
		<div class="header">
			<span>搜索</span>
			<i class="iconfont icon-sousuo"></i>
		</div>
		<div class="content">
			<div class="left">
				<ul class="list-main">
					<li v-for="item in listMain" @click="activeId = item.id">
						<span class="name"  v-text="item.name" :class="{active: activeId === item.id}"></span>
					</li>
				</ul>
			</div>
			<div class="right">
				<img class="avatar" :src="avatar" alt="">
				<ul class="list-sub" v-if="listSub.length > 0">
					<li v-for="item in listSub">
						<router-link :to="`/list/${item.id}`">
							<img class="img" :src="item.avatar" alt="">
							<span class="span" v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
				<p v-else>暂无相关商品，敬请期待...</p>
			</div>
		</div>
		<!-- <div class="footer"></div> -->
	</div>
</template>

<script>
	import '@/assets/iconfont8/iconfont.css';
	import axios from "axios";
	import {CategoryAPI} from "@/api";
	export default {
		name: "category",
		data(){
			return {
				listMain: [],
				listSub: [],
				activeId: 0
			};
		},
		computed: {
			avatar() {
				return this.activeId !== 0 ? this.listMain.find(item => item.id === this.activeId).avatar : "";
			}
		},
		async created() {
			try {
					const data = await CategoryAPI.get(0)
						this.listMain = Object.freeze(data);
						this.activeId = data[0].id;
			} catch(e) {}
		},
		watch: {
			async activeId(newValue, oldValue) {
				try {
					const data = await CategoryAPI.get(newValue)
					this.listSub = Object.freeze(data);
				} catch(e) {}
			}
		}
        };
</script>

<style lang="stylus" scoped>
	.container
		display flex
		flex-direction column
		width 100vw
		height 100vh
		.header
			height 13vw
			flex-shrink 0
			display flex 
			justify-content space-between
			flex-direction row
			align-items center
			padding 0 2vw
			span 
				width 100%
				text-align center
			i 
				font-size 20px
		.content
			flex-grow 1
			border-top 1px solid #ccc
			border-bottom 1px solid #ccc
			display flex
			overflow hidden
			.left
				width 25vw
				flex-shrink 0
				overflow auto
				display flex
				.list-main
					flex-grow 1
					padding 2vw 2vw
					display flex
					flex-direction column
					justify
					li
						flex-grow 1
						width 100%
						display flex
						align-items center
						.name
							margin auto
							width 100%
							text-align center
							font-size 16px
							color #777
							&.active
								color #fff
								background-color rgb(230, 170, 92)
								border-radius 3vw
			.right
				flex-grow 1
				overflow auto
				border-left 1px solid #ccc
				padding 2vw 2vw
				background-color #eee
				.avatar
					width 100%
				.list-sub
					display flex
					flex-wrap wrap
					background-color #fff
					padding 2vw 0
					li
						width 33.333333%
						padding 0 2vw
						box-sizing border-box
						display flex
						a
							width 100%
							display flex
							flex-direction column
							justify-content center
							align-items center
							.img
								width 70%
							.span
								color #ccc
								font-size 14px
		.footer
			height 14vw
			flex-shrink 0
</style>