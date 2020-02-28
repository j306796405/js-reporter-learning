import {randomString, } from '../utils/tools'
import { insertCss, removeCss } from '../handlers'

// 默认参数
export let GlobalVal = {
  page: '', // 当前页面
  sid: '', // session id,页面切换就会改变
  sBegin: Date.now(), // 修改sid时间
  _health: {
    errcount: 0,
    apisucc: 0,
    apifail: 0
  },
  // ???
  circle: false,
  // ???
  cssInserted: false,
}

// 设置页面名称
export function setGlobalPage(page) {
  GlobalVal.page = page
}

// 设置sid
export function setGlobalSid() {
  GlobalVal.sid = randomString()
  GlobalVal.sBegin = Date.now()
}

// 设置页面健康度
export function setGlobalHealth(type: string, success?:boolean) {
  debugger
  if (type === 'error') GlobalVal._health.errcount++
  if (type === 'api' && success) GlobalVal._health.apisucc++
  if (type === 'api' && !success) GlobalVal._health.apifail++
}

// 重置页面健康度
export function resetGlobalHealth() {
  GlobalVal._health = {
    errcount: 0,
    apisucc: 0,
    apifail: 0
  } 
}
