import Vue from 'vue'
import App from './App'

import * as Api from './config/api.js'

import * as Common from './config/common.js'
import * as Db from './config/db.js'
import * as Config from './config/config.js'
import store from './store'
import './common/uni-H5Api'

import home from './pages/home/home.vue'
Vue.component('home',home)

import shop from './pages/shop/index.vue'
Vue.component('shop',shop)

import mine from './pages/mine/home.vue'
Vue.component('mine',mine)



import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
//全局变量定义
Vue.config.productionTip = false
Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;
Vue.prototype.$store = store;

Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



