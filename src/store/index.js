import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({

  state: {
    userInfo: {
			userId: '',
			username: ''
		},
  },

  getters: {
		// 获取登录用户信息 , 一些简单 和通用的操作
		/*
		mapGetters 和 mapState
		*/
		getUserinfo: state => {
			return state.userInfo
		},
  },

  actions: {
		/*
			负责所有数据的提交, commit 提交出来的数据，传递给mutations 处理
		*/
		login({ commit }, userInfo){
			commit('setUserinfo', userInfo)
		}
		
  },

  mutations: {
		// 设置用户信息
		setUserinfo(state, userInfo) {
			state.userInfo.userId = userInfo.userId
			state.userInfo.username = userInfo.username

		},
  }
})

export default store;