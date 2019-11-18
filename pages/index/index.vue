<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<shop v-if="PageCur=='shop'"></shop>
		<mine v-if="PageCur=='mine'"></mine>
		
		<view class="cu-bar tabbar bg-white shadow foot">
			
			
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur == 'home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-green':'text-gray'">首页</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="shop">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/store' + [PageCur == 'shop'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='shop'?'text-green':'text-gray'">门店</view>
			</view>
			
			<view class="action" @click="NavChange" data-cur="mine">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/mine' + [PageCur == 'mine'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='mine'?'text-green':'text-gray'">我的</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
