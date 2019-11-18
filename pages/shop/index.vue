<template name="shop">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">门店列表</block>
		</cu-custom>
		<view class="dqwz flex4">
			<image src="/static/store/dqdw.png"></image>
			<view class="gobyndsingle">当前位置：{{ weizhi }}</view> 
		</view>
		<view class="cu-bar bg-white search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="serchInfo" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入门店名称" confirm-type="search"></input>
			</view>
			<view class="action" v-if="serchInfo" @click="cancelSearch">
				<text class="cuIcon-close"></text>
				<text>取消</text>
			</view>
		</view>
		
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-cyan cur':''" v-for="(item,index) in navs" :key="index" @tap="tabSelect" :data-id="index">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow" v-for="(item,key) in stores" :key="key">
				<view class="image">
					<image :src="item.logopath"
					 mode="widthFix" style="max-height:200px;"></image>
					<view v-if="item.isrecommend==1" class="cu-tag bg-blue">推荐</view>
					<view v-if="item.distance" class="cu-tag dis bg-green">距您{{item.distanceText}}</view>
					<view class="cu-bar bg-shadeBottom">
						<text class="text-cut">{{item.address}}</text>
					</view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+item.logopath+');'"></view>
						<view class="content flex-sub">
							<view class="text-grey">{{item.name}}</view>
							<view class="text-gray text-sm flex justify-between">
								入驻 {{item.create_time}}
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.popularity}}
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-bottom-sm" style="height:30px;">
			 <!-- 内容显示完整 -->
		</view>
	</view>
</template>

<script>
	import QQMapWX from '../../common/qqmap-wx-jssdk.min.js'  
	var _this = this
	export default {
		data() {
			return {
				weizhi: "定位中...",
				currentPos: null,
				serchInfo: '',
				InputBottom: 0,
				TabCur: 0,
				navs: [
					{title: "推荐排序"},
					{title: "距您最近"},
					{title: "人气优先"}
				],
				isCard: false,
				stores:[],
				page_size: 10,
				current: 1  //当前页面
			}
		},
		mounted() {
			_this = this
			// #ifdef APP-PLUS
			uni.getLocation({
			    type: 'wgs84',
				geocode: true,
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
			// #endif
			
			// #ifdef MP-WEIXIN
			const qqmapsdk = new QQMapWX({  
				key: '2KWBZ-3UZKS-TM5OG-6MUXS-HKXJ2-BOBRU'//key腾讯地图api密钥  
			})
			uni.authorize({
			    scope: 'scope.userLocation',
			    success() {
			        uni.getLocation({
						type: 'wgs84',  
						success: res => {  
							qqmapsdk.reverseGeocoder({  
								location: {  
									latitude: res.latitude,  
									longitude: res.longitude  
								},  
								coord_type: 1,
								success: res => {  
									var e = res.result.ad_info.location;
									
									_this.weizhi = res.result.formatted_addresses.recommend
									_this.currentPos = e
									_this.refreshData(true)
								}  
							})  
							
						}  
					})
			    }
			})
			// #endif
			
		},
		methods: {
			refreshData(_refresh){
				if(_refresh){
					_this.current = 1
					_this.stores = []
				}
				let data = {
					search: _this.serchInfo,
					page_size: _this.page_size,
					current: _this.current
				}
				this.$api.getStoreList(data,res=>{
					if(res.code == 0){
						var _newStores = res.data.map(store=>{
							store.create_time = _this.$common.timeToAgoDate(store.create_time,-1)
							store.distance = 0
							store.distanceText = 0
							// #ifdef MP-WEIXIN
							//距离
							var s = store.coordinate.split(",");
							var o = _this.$common.getDistance(_this.currentPos.lat, _this.currentPos.lng, s[0], s[1]).toFixed(1);
							store.distance = o
							store.distanceText = o < 1000 ?(o+'m'):((o/1000).toFixed(2) + "Km")
							// #endif
							return store
						})
						_this.stores =  _this.stores.concat(_newStores)
						
					}
				})
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			cancelSearch(){
				this.serchInfo = '';
			},
			compareData(o,_order) {
				return function(t, e) {
					var a = t[o], s = e[o];
					return isNaN(Number(a)) || isNaN(Number(s)) || (a = Number(a), s = Number(s)), a < s ? -1*_order : s < a ? 1*_order : 0;
				};
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				if(this.TabCur==0){
					_this.stores.sort(_this.compareData("isrecommend",-1))
				}else if(this.TabCur == 1){
					_this.stores.sort(_this.compareData("distance",1))
				}else if(this.TabCur == 2){
					_this.stores.sort(_this.compareData("popularity",-1))
				}
				
			}
		}
	}
</script>

<style>
.flex4 {
	background: #fff;
	padding: 15rpx 30rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.dqwz image {
	width: 50rpx;
	height: 50rpx;
	margin-right: 20rpx;
}

.dqwz view {
	width: 90%;
	font-size: 28rpx;
}
.gobyndsingle {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.cu-card.case .image .cu-tag.dis {
    position: absolute;
    left: 0;
    top: 0;
	right: auto !important;
}



</style>
