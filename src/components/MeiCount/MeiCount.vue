<template>
	<div class="count-detail">
		<i class="iconfont icon-xianxingtubiaozhizuomoban-02"  @click="decrease"></i>
		<!-- <button class="decrease" :disabled="count === 1" @click="decrease">-</button> -->
		<span class="count" v-text="count"></span>
		<i class="iconfont icon-jiahao" @click="increase"></i>
		<!-- <button class="increase" :disabled="count === maxCount" @click="increase">+</button> -->
	</div>
</template>

<script>
	import '@/assets/iconfont7/iconfont.css';
	export default {
	        name: "MeiCount",
			props: {
	                count: {
	                        type: Number,
		                	required: true
	                },
			maxCount: {
	            type: Number,
				default: 5
			}
		},
		model: {
	        prop: "count",
			event: "change"
		},
		methods: {
	                decrease() {
	                    this.$emit("decrease")
		                this.$emit("change", this.count - 1)
		                this.$emit("update:count", this.count - 1)
	                },
			increase() {
	            this.$emit("increase")
				this.$emit("change", this.count + 1)
				this.$emit("update:count", this.count + 1)
			}
		}
	}

</script>

<style lang="stylus" scoped>
	.detail
		display: flex
		flex-direction: column
		justify-content: space-around
		h5
			font-size: 18px
		.price
			font-size: 20px
			color: red
		.count-detail
			.icon-xianxingtubiaozhizuomoban-02
				width: 5vw
				height: 5vw
				border none
				background-color #fff
			.count
				display: inline-block
				height: 5vw
				width: 5vw
				text-align: center
			.icon-jiahao
				width: 5vw
				height: 5vw
				border none
				background-color #fff
</style>