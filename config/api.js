import {
	apiBaseUrl
} from './config.js';
import * as common from './common.js' //引入common
import * as db from './db.js' //引入common
// 需要登陆的，都写到这里，否则就是不需要登陆的接口地址
const urlsToken = [
	'task/add',
];

const post = (url, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});
    var Authorization = '';
	// 判断token是否存在
	if (urlsToken.indexOf(url) >= 0) {
		// 获取用户token
		let userToken = db.get("userToken");
		if (!userToken) {
			common.jumpToLogin();
			return false;
		} else {
			Authorization = userToken;
		}
	}


    if(url.indexOf("/static") == 0){
		
	}else if(url.indexOf('http') == 0){
		
	}else{
		url = apiBaseUrl + url;
	}
	

	uni.request({
		url: url,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization' : Authorization
			// 'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (result) {
				// 登录信息过期或者未登录
				if (result.code === 999 || result.code === 998) {
					db.del("userToken");
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 1000,
						complete: function() {
							setTimeout(function() {
								uni.hideToast();
								// #ifdef H5 || APP-PLUS
								uni.navigateTo({
									url: '/pages/login/login/index1'
								})
								// #endif
								// #ifdef MP-WEIXIN || MP-ALIPAY	
								uni.navigateTo({
									url: '/pages/login/choose/index',
									animationType: 'pop-in',
									animationDuration: 200
								});
								// #endif
							}, 1000)
						}
					});
				}
			}
			callback(result);
		},
		complete: () => {
			uni.hideLoading();
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
	});

}



const get = (url, data,callback) => {
	uni.showLoading({
		title: '加载中'
	});
	if(url.indexOf("/static") == 0){
		
	}else if(url.indexOf('http') == 0){
		
	}else{
		url = apiBaseUrl + url;
	}
	uni.request({
		url: url,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			setTimeout(function() {
				uni.hideLoading();
			}, 250);
		}
	});
}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 1000);
		}
	});
}

// 文件上传
export const uploadFiles = (callback) => {
	uni.chooseImage({
		success: (chooseImageRes) => {
			uni.showLoading({
				title: '上传中...'
			});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			const uploadTask = uni.uploadFile({
				url: apiBaseUrl + 'file/image', //仅为示例，非真实的接口地址
				filePath: tempFilePaths[0],
				fileType: 'image',
				name: 'file',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				formData: {
					'method': 'images.upload',
					'upfile': tempFilePaths[0]
				},
				success: (uploadFileRes) => {
					callback(JSON.parse(uploadFileRes.data));
				},
				fail: (error) => {
					if (error && error.response) {
						showError(error.response);
					}
				},
				complete: () => {
					setTimeout(function() {
						uni.hideLoading();
					}, 250);
				}
			});
			// 					uploadTask.onProgressUpdate((res) => {
			//             console.log('上传进度' + res.progress);
			//             console.log('已经上传的数据长度' + res.totalBytesSent);
			//             console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
			//
			//             // 测试条件，取消上传任务。
			//             if (res.progress > 50) {
			//                 uploadTask.abort();
			//             }
			// 					});
		}
	});
}

// 上传图片
export const uploadImage = (num, callback) => {
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: apiBaseUrl + 'file/image',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'file',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i]
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data));
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}


//获取APP版本 确定是否需要更新
export const getAppVersion = (data, callback) => post('user/app/version', data, callback);

//用户注册
export const userRegister = (data,callback) => post('user/register', data, callback)

//用户登陆
export const userLogin = (data,callback) => post('user/login', data, callback)

export const getAllCitys = (callback) => get('/static/json/city.json',callback) 
//添加任务
export const addTask = (data,callback) => post('task/add', data, callback)

//得到所有的任务
export const getTaskList = (data,callback) => get('task/list', data, callback)

//得到所有的门店信息
export const getStoreList = (data,callback) => get('store/list', data, callback)



// 获取店铺配置
export const shopConfig = (callback) => get(apiBaseUrl + 'api/common/jshopconf', callback);

// 用户注册
export const reg = (data, callback) => post('user.reg', data, callback);

// 用户登录
export const login = (data, callback) => post('user.login', data, callback);

// 用户信息
export const userInfo = (data, callback) => post('user.info', data, callback);

// 上传头像
export const changeAvatar = (data, callback) => post('user.changeavatar', data, callback);

// 编辑用户信息
export const editInfo = (data, callback) => post('user.editinfo', data, callback);


// 退出登录
export const logout = (data, callback) => post('user.logout', data, callback);

