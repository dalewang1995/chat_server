import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({

  state: {
    userInfo: {
			userId: '',
			nickname: '',
			avatar: ''
		},
  },

  getters: {
		// 获取登录用户信息
		getUserinfo: state => {
			return state.userInfo
		},
  },

  actions: {

  },

  mutations: {
		// 设置用户信息
		setUserinfo(state, userInfo) {
			state.userInfo.userId = userInfo.userId
			state.userInfo.nickname = userInfo.nickname
			state.userInfo.avatar = userInfo.avatar
		},
  }
})

export default store;