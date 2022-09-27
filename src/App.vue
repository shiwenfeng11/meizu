<template>
	<keep-alive include="List">
		<!--路由匹配要渲染的组件的占位符-->
		<router-view></router-view>
	</keep-alive>
</template>

<script>
	export default {
	        data: function() {
	                return {

	                };
	        }
	};
</script>

<style lang="stylus">

</style>