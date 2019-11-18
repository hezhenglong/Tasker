<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">添加任务</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input placeholder="标题" type="text" v-model="title"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">描述</view>
				<textarea maxlength="-1" type="text" v-model="description" placeholder="描述"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">价格</view>
				<input placeholder="价格" type="number" v-model="price"></input>
				<text class=''>元</text>
			</view>
			<view class="cu-form-group">
				<view class="title">周期</view>
				<input placeholder="周期: 如 7天,3天,一个月" type="number" v-model="cycle"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="电话" type="number" v-model="mobile"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地址</view>
				<picker mode="multiSelector" @change="MultiChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="标题" type="text" v-model="address"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">标签</view>
				<view class='cu-tag bg-blue'>包吃</view>
				<view class='cu-tag line-gray'>包住</view>
				<view class='cu-tag bg-blue'>餐补</view>
				<view class='cu-tag bg-blue'>交通补</view>
				<view class='cu-tag bg-blue'>交通补</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" :disabled="canSubmit" :loading="loading" @tap="submitTask">提交</button>
		</view>
		</form>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				title:"",
				description:"",
				price: "",
				cycle: "",
				mobile: "",
				address: "",
				type: "",
				keywords: "",
				imgList: [],
				multiArray: [
					["湖北"],
					["武汉市"],
					["请选择","江岸区", "江汉区", "硚口区", "汉阳区", "武昌区", "青山区", "洪山区", "东西湖区", "汉南区", "蔡甸区", "江夏区", "黄陂区", "新洲区", "其它区"]
				],
				multiIndex: [0,0,0],
				canSubmit: false,
				loading: false
			}
		},
		mounted() {
			_this = this;
		},
		methods: {
			submitTask(){
				if(!_this.loading){
					_this.loading = true
					if (this.title.length == "") {
					     uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '标题必填'
					    });
					    return;
					}
					if (this.description.length == "") {
					     uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '描述必填'
					    });
					    return;
					}
					if (this.price.length == "") {
					     uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '价格必填'
					    });
					    return;
					}
					if (this.cycle.length == "") {
					     uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '周期必填'
					    });
					    return;
					}
					if (this.mobile.length == "") {
					     uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '联系电话必填'
					    });
					    return;
					}
					if (this.address.length == "") {
					     uni.showToast({
					        icon: 'none',
							position: 'bottom',
					        title: '地址必填'
					    });
					    return;
					}
					var _data = {
						title: _this.title,
						description: _this.description,
						price: _this.price,
						cycle: _this.cycle,
						mobile: _this.mobile,
						address: _this.multiArray[0][_this.multiIndex[0]]+" "+_this.multiArray[1][_this.multiIndex[1]]+" "+_this.multiArray[2][_this.multiIndex[2]]+ " " +_this.address,
						type: 0,
						keywords: "",
						imgList:_this.imgList
					}
					_this.$api.addTask(_data,res=>{
						_this.loading = false
						if(res.code == 0){//登陆成功
							uni.showToast({
							    title: '添加成功,待审核'
							});
						}else{
							uni.showToast({
							    title: '服务异常'
							});
						}
					})
				}
				
			},
			textareaBInput(e) {
				this.description = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			ChooseImage() {
				_this.$api.uploadImage(4, res => {
					if (res.code==0) {
						_this.imgList.push(res.data)
					} else {
						that.$common.errorToShow("异常")
					}
				})
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
