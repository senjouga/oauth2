function getMsirmEnvIp () {
  // return (process.env.NODE_ENV !== 'production') ? 'http://hongqiceshi.guoshou.com:6129' : ''
  return (process.env.NODE_ENV !== 'production') ? 'http://192.168.20.25:8066' : ''
}
export default {
  getMsirmEnvIp
}
