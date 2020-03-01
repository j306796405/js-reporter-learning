
import { Config, } from './config'
import { queryString, serialize, warn } from './utils/tools'

// 上报
// 1: ？？？为啥上报health需要使用sendBeacon方法 2: ？？？写法过于复杂
export function report(e: ReportData) {
    "res" === e.t ?
    send(e)
      : "error" === e.t ? send(e)
      : "behavior" === e.t ? send(e)
      : "health" === e.t && window && window.navigator && "function" == typeof window.navigator.sendBeacon ? sendBeacon(e)
      : send(e);
  return this
}

// post上报
// ？？？1：为啥不使用图片的方式 ？？？2: 图片上报需要作长度限制
export function send(msg: ReportData) {
  /**
   * msg中会有t代表主题信息，对应的主题有对应的key
   * msg: {
   *     t: 'behavior',
   *     behavior: { ... }
   * }
   * */
  var body = msg[msg.t]
  delete msg[msg.t]
  var url = `${Config.reportUrl}?${serialize(msg)}`
  post(url, {
    [msg.t]: body
  })
  // new Image().src = `${Config.reportUrl}?${serialize(msg)}`
}

// post方式上传信息
export function post(url, body) {
  // 此处用的是原生方法所以不会被劫持
  var XMLHttpRequest = window.__oXMLHttpRequest_ || window.XMLHttpRequest;
  if (typeof XMLHttpRequest === 'function') {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, !0)
      xhr.setRequestHeader("Content-Type", "text/plain")
      xhr.send(JSON.stringify(body))
    } catch (e) {
      warn('[monitor] Failed to log, POST请求失败')
    }
  } else {
    warn('[monitor] Failed to log, 浏览器不支持XMLHttpRequest')
  }
}

// sendBeacon方式上报
export function sendBeacon(e:any) {
  "object" == typeof e && (e = serialize(e));
  e = `${Config.reportUrl}?${e}`
  window && window.navigator && "function" == typeof window.navigator.sendBeacon
    ? window.navigator.sendBeacon(e)
    : warn("[monitor] navigator.sendBeacon not supported")
}
