<template>
	<MeiModalDialog>
		<img :src="avatar" alt="">
		<p v-text="message"></p>
		<input type="button" value="确定" @click="ok">
	</MeiModalDialog>
</template>

<script>
	import avatar from "./msg.png";
	import MeiModalDialog from "../MeiModalDialog/MeiModalDialog.vue";
	export default {
	        name: "MeiAlert",
		components: {MeiModalDialog},
		data() {
	                return {
	                        message: "",
		                avatar
	                };
		},
		methods: {
	                ok() {
	                        this.$destroy(true);
	                        document.body.removeChild(this.$el);
	                }
		}
	};
</script>

<style lang="stylus" scoped>
	img
		width 70%
	p
		padding 0 3vw
	input
		margin 4vw 0

</style>