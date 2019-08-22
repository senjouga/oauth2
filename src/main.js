import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import oauth2 from './oauth2'

Vue.config.productionTip = false

let wxOption = {
  appid: '', // appid
  agentid: '', // agentid
  responseType: 'code', // 返回类型，请填写code
  scope: 'snsapi_base'
}

Vue.use(oauth2, wxOption, ({code, wait, timeOutRefresh, message}) => {
  if (!wait) {
    if (code) {
      console.log('code')
      console.log(code)
      // store.dispatch('wxLogin', code).then(res => {
      //   if (res) {
      //     router.push('/pages/top/home')
      //   } else {
      //     window.localStorage.setItem('loginFail', 'true')
      //     router.push('/?autoLoginFail=1')
      //   }
      // }).catch(e => {
      //   window.localStorage.setItem('loginFail', 'true')
      //   router.push('/?autoLoginFail=1')
      // })
    }
    window.hideAuthLoading()
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  } else {
    console.log('waiting……')
  }
})

