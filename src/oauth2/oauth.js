/**
 * ------------------------------------------------------------------
 * 微信授权
 * @date 2018/8/26
 * ------------------------------------------------------------------
 */

class oauth {
  constructor (config) {
    let defaultConfig = {
      appid: '',
      agentid: '',
      responseType: 'code',
      scope: 'snsapi_base'
    }
    this.config = Object.assign(defaultConfig, config)
  }

  openAuthPage (redirectUri = window.location.href) {
    let redirectUriArr = redirectUri.split('#')
    window.localStorage.setItem('redirect_path', redirectUriArr[1])
    redirectUri = encodeURIComponent(redirectUriArr[0])
    this.removeAccessToken()
    this.removeAuthCode()
    window.localStorage.removeItem('loginFail')
    let authPageBaseUri = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    // &connect_redirect=1
    let authParams = `?appid=${this.config.appid}&redirect_uri=${redirectUri}&response_type=${this.config.responseType}&agentid=${this.config.agentid}&scope=${this.config.scope}#wechat_redirect`
    let url = authPageBaseUri + authParams
    window.location.replace(url)
  }

  setAuthCode (code) {
    if (!code) return false
    window.localStorage.setItem('auth_code', code)
    return true
  }

  getAuthCode () {
    let codeValue = window.localStorage.getItem('auth_code')
    if (!codeValue) return ''
    return codeValue
  }

  removeAuthCode () {
    window.localStorage.removeItem('auth_code')
  }

  removeUrlCodeQuery () {
    let location = window.location
    let search = location.search
    if (search) {
      search = search.substr(1)
    }
    let href = location.origin
    let pathName = location.pathname
    if (pathName) {
      href += pathName
    }
    let searchArr = search.split('&').filter(item => {
      if (item.indexOf('code=') !== -1) {
        return false
      }
      if (item.indexOf('state=') !== -1) {
        return false
      }
      if (item.indexOf('agentid=') !== -1) {
        return false
      }
      return true
    })
    if (searchArr.length > 0) {
      href += '?' + searchArr.join('&')
    }
    let hash = location.hash
    if (hash) {
      href += hash
    }
    window.location.replace(href)
  }

  setAccessToken (accessToken) {
    if (!accessToken) return false
    window.localStorage.setItem('accesstoken', accessToken)
    return true
  }

  getAccessToken () {
    return window.localStorage.getItem('accesstoken')
  }

  removeAccessToken () {
    window.localStorage.removeItem('accesstoken')
  }
}

export default oauth
