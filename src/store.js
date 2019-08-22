import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    wxLogin ({ commit }, code) {
      return new Promise((resolve, reject) => {
        console.log('发起自动登录请求')
        // 用户同意授权后回调方法
        // code：用户同意授权后，获得code值
        // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
        // fly.get(autoLoginUrl).then(response => {
        //   let accessToken = ''
        //   if (accessToken) {
        //     resolve(accessToken)
        //   } else {
        //     reject(new Error('warn'))
        //   }
        // }).catch(e => {
        //   reject(new Error('warn'))
        // })
      })
    }
  }
})
