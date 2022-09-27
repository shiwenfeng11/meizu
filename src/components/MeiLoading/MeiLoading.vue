<template>
	<div class="container">
		<img :src="loading" alt="">
	</div>
</template>

<script>
	import loading from "./loading.gif";
	export default {
	        name: "MeiLoading",
		data() {
	                return {loading};
		}
	};
</script>

<style lang="stylus" scoped>
	.container
		position fixed
		width 100vw
		height 100vh
		top 0
		left 0
		background-color rgba(0,0,0,0.5)
		img
			width 70%
			position absolute
			top 50%
			left 50%
			transform translate(-50%, -50%)
</style>