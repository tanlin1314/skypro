<template>
	<div class="login">
		<div class="login_form">
			<h1>系统登陆</h1>
			<el-form ref="loginForm">
				<el-form-item>
					<el-input prefix-icon="el-icon-s-custom" v-model="name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input prefix-icon="el-icon-lock" v-model="pwd" show-password></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">登陆</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
// import axios from "axios";
import {Land} from '@/api/apis.js'
	export default {
		data() {
			return {
					name: '',
					pwd: '',
					//1. 标杆
					biangan:true  //点击后是否发送请求   true 发送  false 不发送
			}
		},
		methods: {
			onSubmit() {
				// 防抖节流  ：  3秒定时器。。。点击一次发送一次请求   标杆
				if(this.biangan==false) return  //2.判断一下，如果为false就不发请求  

				// 3.发送一次请求，把标杆设置为false
				this.biangan=false;
					Land(this.name,this.pwd).then((res)=>{
					console.log(res);
					// 1.登录成功后把token写入浏览器中 并保持到token,id,用户名,权限都保存到本地储存 localStorage
					// 
					localStorage.token=res.data.token
					localStorage.id=res.data.id
					localStorage.name=this.name	
					localStorage.role=res.data.role	
					
					
					// 2.进页面验证token是否过期

					if(res.data.code==0){
					this.$message({
					message: '恭喜你，这是一条成功消息',
					type: 'success'
					});
					setTimeout(()=>{
						this.$router.push('/Index/homePage'); 
					},3000)
					}else{
						this.$message.error('登陆错误');
					}
					
				})
				//4. 发送成功后3秒后又可以点击
					setTimeout(()=>{
						this.biangan=true
					},3000)

			}
		}
	}
</script>

<style scoped>
html,
body,

.login {
    width: 100%;
    height: 100%;
}

	.login {
        background: #2D3A4B;
        /* height: 792px; */
        height: 100%;
	
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.login_form {
        width: 400px;
       
    }
    
	
	.login_form>h1 {
		text-align: center;
		color: #fff;
		font: 20px/2em 微软雅黑;
		padding-bottom: 20px;
	}
	
	.el-button--primary {
		width: 100%;
	}
</style>