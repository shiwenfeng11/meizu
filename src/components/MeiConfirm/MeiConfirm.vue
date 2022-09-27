<template>
	<MeiModalDialog>
		<p v-text="message"></p>
		<div class="dialog-footer">
			<input class="fix" type="button" value="确定" @click="ok">
			<input class="cancel" type="button" value="取消" @click="cancel">
		</div>
	</MeiModalDialog>
</template>

<script>
	import MeiModalDialog from "../MeiModalDialog/MeiModalDialog.vue";
	export default {
	        name: "MeiConfirm",
		components: {MeiModalDialog},
		data() {
	                return {
				message: "",
		                resolve: null,
		                reject: null
	                };
		},
		methods: {
	                ok() {
				this.resolve();
	                       this.$destroy(true);
	                       document.body.removeChild(this.$el);
	                },
			cancel() {
	                        this.reject();
                                this.$destroy(true);
                                document.body.removeChild(this.$el);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	p
		padding 10vw 10vw
	.dialog-footer
		display flex
		justify-content space-around
		width 100%
		border-top 1px solid #ccc
		padding 3vw 5vw
		.fix
			border none
			background-color #fff
		.cancel
			border none
			background-color #fff

</style>