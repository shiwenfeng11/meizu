<template>
	<MeiModalDialog>
		<h5>声明与政策</h5>
		<p>您可在魅族进行商品浏览、支付购买、售后服务等功能。
			我们将严格遵守相关法律法规和隐私政策以保护您的个人信息。
			请您阅读并同意</p>
		<div class="dialog-footer">
			<input type="button" value="确定" @click="ok">
			<input type="button" value="取消" @click="cancel">
		</div>
	</MeiModalDialog>
</template>

<script>
	import MeiModalDialog from "../MeiModalDialog/MeiModalDialog.vue";
	export default {
	        name: "MeiLoginAlert",
		components: {MeiModalDialog},
		data() {
	                return {
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
	h5
		text-align center
		margin 3vw 0
		font-size 18px
		font-weight 400
	p
		margin 2vw 0
		padding 0 2vw
		color #777
		font-size 16px
	.dialog-footer
		margin-bottom 3vw
		display flex
		justify-content space-around
		width 100%
		input
			border none
			margin 3vw 0
			font-size 14px
</style>