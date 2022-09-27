<template>
	<div class="container">
		<div class="header">
			<router-link to="/profile">
				<i class="iconfont icon-fanhui"></i>
			</router-link>
			<span class="receive-address">收货地址</span>
		</div>
		<div class="content">
			<div class="add" @click="beginAdd" >添加收货人信息</div>
				<transition-group tag="ul" class="list">
					<li v-for="item in $store.state.address.list" :key="item.id">
						<span class="name" v-text="item.receiveName"></span>
						<span class="phone" v-text="item.receivePhone"></span>
						<p class="address" v-text="item.receiveRegion"></p>
						<p class="detail" v-text="item.receiveDetail"></p>
						<span class="setDefault" v-if="item.isDefault === 0" @click="setDefault(item.id)">设为默认地址</span>
						<span class="default" v-else>默认地址</span>
						<div class="remove-w">
							<i class="iconfont icon-shanchu"></i>
							<input class="remove" type="button" value="删除" @click="remove(item.id)" />
						</div>
						<div class="edit-w">
							<i class="iconfont icon-bianji"></i>
							<input class="edit" type="button" value="编辑" @click="beginUpdate(item)" />
						</div>
						
					</li>
				</transition-group>
			<AddressEdit v-if="isEdit" :model="model" @endEdit="save"></AddressEdit>
		</div>
	</div>
</template>

<script>
	import {AddressAPI} from "@/api";
	import AddressEdit from "./AddressEdit.vue";
	import '@/assets/iconfont6/iconfont.css';
        export default {
                name: "Address",
	        components: {AddressEdit},
                data: function() {
                        return {
				isEdit: false,
	                        model: null
                        };
                },
	        async created() {
                        try {
                                this.$store.dispatch('address/init')
                        } catch(e) {}
	        },
                methods: {
					async setDefault(id){
							try {
								await this.$store.dispatch('address/setDefault',id)
								this.$meiNotice("设为默认成功..")
							} catch(e) {}
					},
	                async remove(id) {
                                try {
									await this.$meiConfirm("确认删除？")
	                                await this.$store.dispatch('address/remove',id)
									this.$meiNotice("删除成功");
                                } catch(e) {}

	                },
	                beginAdd() {
                                this.model = {
                                    id: 0,
	                                name: sessionStorage.getItem("name"),
	                                isDefault: 0,
	                                receiveName: "",
	                                receivePhone: "",
	                                receiveRegion: "",
	                                receiveDetail: ""
                                };
                                this.isEdit = true;
	                },
	                beginUpdate(address) {
                                this.model = Object.assign({},address);
                                this.isEdit = true;
	                },
	                async save(address) {
						address.id = this.model.id;
						try {
							await this.$store.dispatch(
									`address/${this.model.id === 0 ? "add" : "update"}`,
								{...this.model,...address})
									this.isEdit = false;
							this.$meiNotice("保存成功");
						} catch(e) {}
	                }
                }
        };
</script>

<style lang="stylus">
	.container
		width 100vw
		height 100vh
		display flex
		flex-direction column
		background-color #eee
		.header
			height 13vw
			flex-shrink 0
			line-height 13vw
			text-align center
			font-size 20px
			display flex 
			justify-content space-between
			background-color #fff
			span 
				width 100%
				font-size 18px
				
		.content
			flex-grow 1
			border-top 1px solid #ccc
			padding 2vw 2vw
			overflow auto
			.add
				height 12vw
				border: 1px dashed #ccc
				line-height 12vw
				text-align center
				color black
				font-size 13px
				background-color #fff
				border-radius 15px 15px
			.list
				li
					position relative
					margin-top 3vw
					padding 2vw 2vw
					border 1px solid #ccc
					border-radius 15px 15px
					background-color #fff
					height 35vw
					color #777
					font-size 12px
					&.v-enter, &.v-leave-to
						opacity 0
					&.v-enter-active, &.v-leave-active
						transition all 0.8s
					&.v-enter-to, &.v-leave
						opactiy 1
					.phone
						margin-left 40vw
					.address
						height 10vw
						line-height 10vw
					.detail
						border-bottom 1px solid #ccc
						height 8vw
						line-height 8vw
					.setDefault
						position absolute
						left 2vw
						bottom 5vw
						padding 0 1vw
					.default
						position absolute
						border-radius 5px 5px
						left 2vw
						bottom 5vw
						border 1px solid #1E90FF
						padding 0 1vw
					.remove-w
						position absolute
						bottom 5%
						right 20%
						i 
							color #1E90FF
							font-size 16px
						.remove
							border none
							background-color #fff
							color #777
					.edit-w
						position absolute
						bottom 5%
						right 5%
						i 
							color #1E90FF
						.edit
							border none
							color #777
							background-color #fff


</style>