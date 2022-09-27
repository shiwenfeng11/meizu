<template>
	<div class="wrap">
		<p class="notice" v-text="message"></p>
	</div>
</template>

<script>
	export default {
	        name: "MeiNotice",
		data() {
	                return {
                                message: ""
	                };
		},
		mounted() {
	                setTimeout(() => {
                                this.$destroy(true);
                                document.body.removeChild(this.$el);
	                },1500)
		}
	};
</script>

<style lang="stylus" scoped>
	@keyframes fadeOut
		from {opacity: 1}
		to {opacity: 0}
	.notice
		position fixed
		left 50%
		top 20%
		transform translate(-50%, -50%)
		min-width 40%
		max width 60%
		border 1px solid skyblue
		box-shadow 0 0 10px 7px skyblue inset
		color deepskyblue
		border-radius 10px
		text-align center
		font-weight 500
		padding 1vw 1vw
		background-color #fff
		animation-name fadeOut
		animation-duration 1s
		animation-delay: 0.5s
		animation-fill-mode forwards
</style>