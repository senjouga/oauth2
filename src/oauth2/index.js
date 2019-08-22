import timg from '../assets/timg.gif'
import oauth from './oauth'

function getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null
}

export default {
    install (Vue, wxauthConfig, codeCallBack) {
        console.log('构造器')
        window.showAuthLoading = function () {
            var para = document.createElement('div');
            para.id = 'auth_loading'
            para.style.textAlign = 'center'
            para.innerHTML = "<img style='width: 100%;min-height: 204px' src='"+timg+"'/>" +
                "<p>微信授权中…</p>"
            document.getElementsByTagName('body')[0].appendChild(para)
        }
        window.hideAuthLoading = function () {
            document.getElementById('auth_loading').remove()
        }
        window.showAuthLoading()
        let oauth2 = new oauth(wxauthConfig)
        console.log(oauth2)
        let codeUrl = getQueryString('code') // url code
        let codeSession = oauth2.getAuthCode() // session code
        let autoLoginFail = window.localStorage.getItem('loginFail') || false
        let logoutAction = window.localStorage.getItem('logoutAction') || null
        if (logoutAction) {
            window.localStorage.removeItem('logoutAction')
            codeCallBack({code: '', wait: false, timeOutRefresh: false, message: 'logoutAction'})
            return false
        }
        if (codeUrl) {
            oauth2.setAuthCode(codeUrl)
            oauth2.removeUrlCodeQuery()
            codeCallBack({code: '', wait: true, timeOutRefresh: true, message: 'removeUrlCodeQuery'})
            return false
        }
        if (codeSession) {
            console.log('自动登录')
            window.localStorage.removeItem('auth_code') // 使用一次后删除
            codeCallBack({code: codeSession, wait: false, timeOutRefresh: false, message: 'autoLogon'})
            return false
        }
        if ((!codeUrl && !codeSession) || autoLoginFail) {
            console.log('openAuthPage')
            oauth2.openAuthPage()
            codeCallBack({code: '', wait: true, timeOutRefresh: true, message: 'openAuthPage'})
            return false
        }
        console.log('执行成功')
        codeCallBack({code: '', wait: true, timeOutRefresh: true, message: 'none'})
        return false
    }
}
