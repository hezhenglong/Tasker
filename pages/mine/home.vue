<template name="mine">
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<image src="/static/logo.png" class="png" mode="widthFix"></image>
				<view class="text-xl padding-top">
					{{name}}
				</view>
				<view class="margin-top-sm">
					<text>{{role}}</text>
				</view>
				<image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp">
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{visitTotal}}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-attentionfill"></text> View</view>
				</view>
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">{{starCount}}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-favorfill"></text> Star</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="text-xxl text-green">{{forksCount}}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-fork"></text> Fork</view>
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				
				<view class="cu-item arrow">
					<view class="content" @tap="navigatorChange('/pages/mine/addtask/addtask')" hover-class="none">
						<text class="cuIcon-add text-red"></text>
						<text class="text-grey">发布任务</text>
					</view>
				</view>
				
				<view class="cu-item arrow">
					<view class="content" bindtap="CopyLink" data-link="https://github.com/weilanwl/ColorUI">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">GitHub</text>
					</view>
				</view>

				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/log/log" hover-class="none">
						<text class="cuIcon-formfill text-green"></text>
						<text class="text-grey">日志</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<view class="content" bindtap="showQrcode">
						<text class="cuIcon-appreciatefill text-red"></text>
						<text class="text-grey">赞赏支持</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="feedback">
						<text class="cuIcon-writefill text-cyan"></text>
						<text class="text-grey">意见反馈</text>
					</button>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/test/list" hover-class="none">
						<text class="cuIcon-creativefill text-orange"></text>
						<text class="text-grey">Bug测试</text>
					</navigator>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
			<!-- <uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more> -->
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more.vue'
	var _this;
	export default {
		components: { //2注册组件
			uniLoadMore
		},
		data() {
			return {
				name: "",
				role: "",				
				starCount: 0,
				forksCount: 0,
				visitTotal: 0,
				// loadingText: '加载中...',
				// loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				// contentText: {
				// 	contentdown: '上拉显示更多',
				// 	contentrefresh: '正在加载...',
				// 	contentnomore: '没有更多数据了'
				// }
			};
		},
		mounted() {
			_this = this;
			this.initData();
			this.numDH(20)
		},
		onPullDownRefresh: function() {
			//刷新数据
			_this.initData();
			//下拉刷新的时候请求一次数据
			setTimeout(function() {
				uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
			}, 1000);
		},
		// onReachBottom: function() {
		// 		_this.loadingType = 1;
		// 		uni.showNavigationBarLoading();//显示加载动画
		// 		setTimeout(function(){
		// 			_this.loadingType = 2;
		// 			uni.hideNavigationBarLoading();
		// 		},2000)
						
		// },
		methods: {
			initData(){ //初始化数据
			    this.$db.userToken(token=>{
					var _userInfo = _this.$db.get("userInfo");
					if(_userInfo){
						this.name = _userInfo.nickName?_userInfo.nickName:_userInfo.username
						this.role = _userInfo.role_id==2?'普通用户':'门店管理员'
					}
				})
				
			},
			navigatorChange(_url){
				this.$db.userToken(token=>{
					_this.$common.navigateTo(_url)
				})
			},
			coutNum(e) {
				if (e > 1000 && e < 10000) {
					e = (e / 1000).toFixed(1) + 'k'
				}
				if (e > 10000) {
					e = (e / 10000).toFixed(1) + 'W'
				}
				return e
			},
			numDH(i) {
				var that = this;
				if (i < 20) {
					setTimeout(function() {
						that.starCount = i
						that.forksCount = i
						that.visitTotal = i
						i++
						that.numDH(i);
					}, 20)
				} else {
					that.starCount = that.coutNum(3000),
					that.forksCount = that.coutNum(484),
					that.visitTotal = that.coutNum(24000)
				}
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.UCenter-bg {
		background-color:#1CBBB4;
		background-size: cover;
		height: 550rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}
</style>
