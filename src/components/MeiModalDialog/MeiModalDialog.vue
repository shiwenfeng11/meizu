<template>
	<div class="container">
		<div class="mei-dialog">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
	        name: "MeiModalDialog"
	};
</script>

<style lang="stylus" scoped>
	.container
		position fixed
		left 0
		top 0
		height 100vh
		width 100vw
		background-color rgba(0,0,0,0.5)
		.mei-dialog
			min-width 70%
			background-color #fff
			position absolute
			left 50%
			top 50%
			transform translate(-50%, -50%)
			display flex
			flex-direction column
			justify-content center
			align-items center
			border-radius 10px
</style>