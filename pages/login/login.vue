<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="username"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
				></wInput>
				<wInput
					v-model="password"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton 
				text="登 录"
				:rotate="isRotate" 
				@click.native="startLogin()"
			></wButton>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import { jumpBackPage } from '../../config/mixins.js'
	import md5 from 'js-md5'
	export default {
		mixins:[jumpBackPage],
		data() {
			return {
				//logo图片 base64
				logoImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAFuElEQVR4nO3cb2wTdRzH8c91G2MQkAmIEEZAmUBEITgTmIkafKAZRlFjwD8TExNl6gOSBaPPlAeLT4yJEXwgCZDFKRkYozwQFCMkI6Agm4uwLQ4w3aQbA0bH/nbr+QiEsXa3bt9rO96vp9f2vlnf+d31ep3jlO6XR67XB2Jcc7w8KNPDYwgKN7rWQ9zA4oVFUIgnbmCBYZ4EDGfIVoYKi6gwUrc0MzgsokKibmonEGsDkIDrDcU6xwJG5VpYrFYYK67EigUjAbFaYey5rFgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgw4eV3hWMqK8PRqyvm6On7Z2rlvDs0e2q23yOklUtdEf0b7tWXR5u0/ViTuiPRZI/kieOU7vftfqzJEzL0S0mBHs67w69djiuVNS16e+8pXeyKJHuUYfl2KJyYGdBXrzyogrlElagXl83Sng3L02KV9y2s1fl36qnF0+V4+uU/Ynns3lz9/FaBHr0nN9mjxOVbWLOnZCtAVWNiyazJ2vv6cm0omKPMQGr+TX0La15ujrd/UwJPpk/K0o71S/XBEws0MTP1Ptz7NlFTew+/2jDw0ZML9ckzizQl2/cP+HH5Flbr1T65lGWipDBPu15aqmk5qROXb2EdaGjT4TOX/drdbWft0ru0740Vmj4pK9mjSPIxrO5IVM/tPKn6C51+7fK2Uzh/mn7btFJzUuByRIZTWPyhXzvrG3C1/VizJmQENC0nUzlZAWWn4IlnOsvNydLGwjwdarysYHtP0ubw9cp7Onp/9QKVFeXH3H6iKaziilrVtY7tSvzOI3kqK8of1Ul5cUWtvqkOaSDq/1vMcpGitlYFVbLn9Ki+vil/+QFtfny+JmT4/zYTVgqrOHlexRW1CnX0JvwaZUX5+vTZRb5f6yKsFPdjXZue31mthgtdCb9GSWGedr+2TDlZ/r3dhJUGjv5zRWt3nNShxsQv1xQtnqGNq/J8+wqIsNJEXWun1pXXqLKmRdEErjRnBBx9vOY+rVky02C6WxFWGmm92qfiilp9XhVU38DIb/gLONLK+f7ctkRYaaZvIKpN39Vpy4HGEd9NGnAcPTR3qtFkg/bly14w5soOntXmH+rV0dvv+TmuXIXCfYZT/Y+w0ti2I0G9WXlK7d3e4nJdqTnsz9V4wkpzu6tDWlde4+nrm/aeflVWt/gwFWGNCz81XNQLu6p1oikc8zFR19UXR4KqDXX4MhNhjRPHg2GtL/9T244E1dt/80l91HVV+n29thxoVGTAn+8NU+fOMIxa48UuvfvtaX39x3ktnDFJd0/JVv2FTh0PhtUc7vH1RkvCGoeqzrWr6lx7UmfgUAgThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThAUThDWM+tZO9Q1EY24/e6lbzVd6fZwoPRDWMBraunSqpTPm9l//vqSO3n4fJ0oPhDWMv0JXtacmNOS23dUh7fi92eeJ0gNheVB28KxWfXZMh89cVmTAVVtnRFurgnpvX4O6I7EPk7czxynd7yZ7CIw/rFgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwQVgwEZDkJHsIjDsOKxZMXAuLVQtjxZE4x4KRG8Ni1cJoXW9o8IpFXEjUTe0MdSgkLozULc3EOsciLng1ZCuZHp7Az8MwlLiLT7ywBr8AgUHyeDT7D2cyT2im3gHvAAAAAElFTkSuQmCC',
				username:'', //用户/电话
				password:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		methods: {
			isLogin(){
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.username.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.password.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				var _data = {
					username: this.username,
					password: md5(md5(this.password) + 'jiehai')  //加密密码
				}
				_this.isRotate=true
				//登录 post
				this.$api.userLogin(_data,res=>{
					_this.isRotate=false
					if(res.code == 0){//登陆成功
						uni.showToast({
						    title: '登陆成功'
						});
						_this.$db.set('userToken',res.token)
						_this.$db.set('userInfo',res.data)
						_this.handleBack()
						
					}else{
						uni.showToast({
						    title: '服务异常'
						});
					}
				})
		    },
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
