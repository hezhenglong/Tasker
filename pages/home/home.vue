<template name="home">
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="content">首页</block>
		</cu-custom>
		<view class="cu-bar bg-blue search">
			<view class="search-form radius">
				<text class="cuIcon-search"></text>
				<input v-model="serchInfo" @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索" confirm-type="search"></input>
			</view>
			<view class="action" v-if="serchInfo" @click="cancelSearch">
				<text class="cuIcon-close"></text>
				<text>取消</text>
			</view>
		</view>
		
		<!-- <scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-cyan cur':''" v-for="(item,index) in navs" :key="index" @tap="tabSelect" :data-id="index">
					{{item.title}}
				</view>
			</view>
		</scroll-view> -->
		
		<view class="cu-card dynamic" :class="isCard?'no-card':''">
			
		<view class="cu-item shadow" v-for="(item,index) in tasks" :key="index">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="'background-image:url('+(item.avatarUrl?item.avatarUrl:'/static/logo.png')+');'"></view>
					<view class="content flex-sub">
						<view>{{item.username}}</view>
						<view class="text-gray text-sm flex justify-between">
							{{item.create_time}}
						</view>
					</view>
				</view>
			</view>
			<view class="text-content">
				{{item.description}}
			</view>
			<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
				<view  v-for="(pic,index) in item.imgList" :key="index"
				class="bg-img" :class="isCard?'':'only-img'" 
				:style="'background-image:url('+pic+');'" >
				</view>
			</view>
			<view class="text-gray text-sm text-right padding">
				<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
				<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
				<text class="cuIcon-messagefill margin-lr-xs"></text> 30
			</view>
				
			
		</view>
				
		
		</view>
		
		<view class="margin-bottom-sm" style="height:30px;">
			 <!-- 内容显示完整 -->
		</view>
		
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				serchInfo: '',
				page_size: 10,
				current: 1,  //当前页面
				tasks:[],
				InputBottom: 0,
				TabCur: 0,
				navs: [
					{title: "推荐"},
					{title: "全部"},
					{title: "点工"},
					{title: "包工"}
				],
				isCard: true
			};
		},
		mounted() {
			_this = this;
			_this.refreshData(true)
		},
		methods: {
			refreshData(_refresh){
				if(_refresh){
					_this.current = 1
					_this.tasks = []
				}
				let data = {
					search: _this.serchInfo,
					page_size: _this.page_size,
					current: _this.current
				}
				this.$api.getTaskList(data,res=>{
					if(res.code == 0){
						var _newTasks = res.data.map(task=>{
							task.imgList = task.imgList.split(",")
							task.create_time = _this.$common.timeToAgoDate(task.create_time,604800)//7D
							return task
						})
						console.log(_newTasks)
						_this.tasks = _this.tasks.concat(_newTasks)
						
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
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
