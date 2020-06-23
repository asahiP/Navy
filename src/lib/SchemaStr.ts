'use strict';

import { Schema } from './Schema'
import { Reference } from './Reference'
import { Rule } from './Rule'
import { typeAssert, isStr, isRegExp, isNum } from './utils'
import {
  MSG_PARAM_NOT_STR, MSG_REF_NOT_STR,
  MSG_PARAM_NOT_NUM, MSG_REF_NOT_NUM,
  MSG_PARAM_NOT_REGEXP, MSG_REF_NOT_REGEXP
} from './message'



function required (ref: any, val: any) {
  return isStr(val)
}
function regexp (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_REGEXP, isRegExp)

  return isStr(val) && ref.test(val)
}
function includes (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_STR, isStr)

  return isStr(val) && val.includes(ref)
}
function equal (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_STR, isStr)

  return isStr(val) && val === ref
}
function max (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isStr(val) && val.length <= ref
}
function min (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isStr(val) && val.length >= ref
}
function length (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isStr(val) && val.length === ref
}
function number (ref: any, val: any) {
  return isStr(val) && /^\d+$/.test(val)
}
function alphabet (ref: any, val: any) {
  return isStr(val) && /^[a-zA-Z]+$/.test(val)
}
function alphanum (ref: any, val: any) {
  return isStr(val) && /^[a-zA-Z\d]+$/.test(val) && /\d/.test(val) && /[a-zA-Z]/.test(val)
}
function URL (ref: any, val: any) {
  return isStr(val) && /^(https?:\/\/)?(\w+\.)?\w+\.[a-z]{2,}(\/.*)?$/i.test(val)
}
function mail (ref: any, val: any) {
  return isStr(val) && /^([a-z0-9_\-.\u4e00-\u9fa5]+)@([a-z0-9_\-.]+)\.([a-z]{2,8})$/i.test(val)
}
function phone (ref: any, val: any) {
  /** 
   * Time：2019 / 10 / 13
   * Source：https://zh.wikipedia.org/wiki/中国内地移动终端通讯号段
   * Description: 仅匹配中国大陆手机号码
   */
  
  return isStr(val) && /^(\+86)?(13[0-9]|14(5|7|9)|15([0-3]|[5-9])|166|17([1-3]|[5-8])|18[0-9]|19(1|[8-9]))\d{8}$/.test(val)
}
function isLegalIDCard (val: any) {
  /** 
   * Time：2020 / 02 / 06
   * Source：https://zh.wikipedia.org/wiki/中华人民共和国公民身份号码
   * Description: 仅匹配中国大陆身份证号码
   */
  let ais = val.split('').map((val: string) => {
    let n = parseInt(val)

    return isNaN(n)
      ? 10
      : n
  }).reverse()
  let Wis = [...new Array(18).keys()].map(n => Math.pow(2, n) % 11)
  let sum = ais.map((n: number, index: number) => n * Wis[index])
    .reduce((total: number, num: number) => total + num)

  return sum % 11 === 1
}
function IDCard (ref: any, val: any) {
  return isStr(val) && /^[1-9]\d{16}(\d|x)$/i.test(val) && isLegalIDCard(val)
}


class SchemaStr extends Schema {
  required () {
    this.__rules__.push(new Rule(required, 'required', null))

    return this
  }
  regexp (ref: RegExp | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_REGEXP, isRegExp)

    this.__rules__.push(new Rule(regexp, 'regexp', ref))

    return this
  }
  includes (ref: string | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_STR, isStr)

    this.__rules__.push(new Rule(includes, 'includes', ref))

    return this
  }
  equal (ref: string | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_STR, isStr)

    this.__rules__.push(new Rule(equal, 'equal', ref))

    return this
  }
  max (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(max, 'max', ref))

    return this
  }
  min (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(min, 'min', ref))

    return this
  }
  length (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(length, 'length', ref))

    return this
  }
  number () {
    this.__rules__.push(new Rule(number, 'number', null))

    return this
  }
  alphabet () {
    this.__rules__.push(new Rule(alphabet, 'alphabet', null))

    return this
  }
  alphanum () {
    this.__rules__.push(new Rule(alphanum, 'alphanum', null))

    return this
  }
  URL () {
    this.__rules__.push(new Rule(URL, 'URL', null))

    return this
  }
  mail () {
    this.__rules__.push(new Rule(mail, 'mail', null))

    return this
  }
  phone () {
    this.__rules__.push(new Rule(phone, 'phone', null))

    return this
  }
  IDCard () {
    this.__rules__.push(new Rule(IDCard, 'IDCard', null))

    return this
  }
}

export { SchemaStr }