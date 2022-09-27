<template>
	<div class="login-wrapper">
		<h5>账号登录</h5>
		<input class="phone" type="text" placeholder="手机号/Flyme账号" v-model.trim.lazy="model.name">
		<input class="password" type="text" placeholder="密码" v-model.lazy="model.pwd">
		<div class="login" @click="login">登录</div>
	</div>
</template>

<script>
	import {UserAPI} from "@/api";
	export default {
	        name: "Login",
		data() {
	                return {
	                        model: {
	                                name: "",
		                        pwd: ""
	                        }
	                };
		},
		methods: {
	                async login(){
	                        try {
									const token = await UserAPI.login(this.model)
									await this.$meiNotice("登陆成功..")
										//将token存起来，将用户名存起来
									sessionStorage.setItem("token", token);
									sessionStorage.setItem("name", this.model.name)
									//跳转页面
									this.$router.replace(this.$route.query.target || "/profile");
	                        } catch(e) {}
                        }
		}
	};
</script>

<style lang="stylus">
	.login-wrapper
		height: 100vh
		width: 100vw
		text-align center
		h5
			font-size: 18px
			text-align: center
			margin-top: 10vw
			font-weight: normal
		.phone
			border: none
			border: 1px solid #ccc
			height: 13vw
			width: 95%
			margin: 10vw 0
			text-Indent: 1em
		.password
			height: 13vw
			border: none
			border: 1px solid #ccc
			width: 95%
			margin: 0 0 10vw
			text-indent: 1em
		.login
			display inline-block
			height: 13vw
			width: 95%
			background-color: dodgerblue
			color: #fff
			margin: 10vw 0
			text-align: center
			line-height: 13vw
</style>