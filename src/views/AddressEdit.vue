<template>
	<div class="address-edit">
		<div class="header">编辑收货地址</div>
		<div class="content">
			
			<input type="text" placeholder="收货人姓名" v-model.trim.lazy="address.receiveName">
			<input type="text" placeholder="收货人手机号" v-model.trim.lazy="address.receivePhone">
			<input type="text" placeholder="收获人地址" v-model.trim.lazy="address.receiveRegion">
			<input type="text" placeholder="收货人详细地址" v-model.trim.lazy="address.receiveDetail">
			<p class="save" @click="save">确认保存</p>
		</div>
	</div>
</template>

<script>
	export default {
	    name: "AddressEdit",
		props: ["model"],
		data() {
	                return {
	                        address: {
	                            receiveName: this.model.receiveName,
		                        receivePhone: this.model.receivePhone,
		                        receiveRegion: this.model.receiveRegion,
		                        receiveDetail: this.model.receiveDetail
	                        }
	                };
		},
		methods: {
	                save() {
	                        this.$emit("endEdit", Object.assign({}, this.address));
	                }
		}

	};
</script>

<style lang="stylus">
	.address-edit
		position fixed
		left 0
		top 0
		background-color #fff
		width 100vw
		height 100vh
		display flex
		flex-direction column
		.header
			font-size 18px
			color #777
		.content
			input
				border none
				outline none
				border-bottom 1px solid #ccc
				height 12vw
				line-height 12vw
				width 100%
			.save
				height 12vw
				line-height 12vw
				color gainsboro
				background-color deepskyblue
				margin-top 15vw
				text-align center
</style>