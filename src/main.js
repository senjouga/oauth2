import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import oauth2 from './oauth2'

Vue.config.productionTip = false

Vue.use(oauth2, ({code, wait, timeOutRefresh, message}) => {
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

