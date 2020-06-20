'use strict';

import { Reference } from './Reference'
import { Schema } from './Schema'

const isArr = Array.isArray
const isObj = (val: any) =>
  !isArr(val)
  && typeof val === 'object'
  && val !== null
  && !(val instanceof Schema)
  && !(val instanceof Reference)
const isNum = val => typeof val === 'number'
const isStr = val => typeof val === 'string'
const isRegExp = val => val instanceof RegExp

function deepCompare (ref, val) {
  if (isArr(ref)) {
    if (isArr(val)) {
      let rLen = ref.length
      let vLen = val.length

      if (rLen === vLen) {
        for (let i = 0; i < rLen; i++) {
          if (!deepCompare(ref[i], val[i])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (isObj(ref)) {
    if (isObj(val)) {
      let rKeys = Object.keys(ref)
      let vKeys = Object.keys(val)
      let keySet = new Set([...rKeys, ...vKeys])
      let rLen = rKeys.length
      let vLen = vKeys.length
      let kLen = keySet.size

      if (rLen === vLen && rLen === kLen) {
        for (let i = 0; i < rLen; i++) {
          let key = rKeys[i]
          if (!deepCompare(ref[key], val[key])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (isNaN(ref)) {
    return isNaN(val)
  }

  return ref === val
}

interface ObjType {
  [key: string]: any
}

function omit (obj: ObjType, uselessKeys: string[]) {
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, uselessKeys.includes(key) ? {} : { [key]: obj[key] })
  }, {})
}

function typeAssert (val: any, msg: string, cb: Function) {
  if (!cb(val) && !(val instanceof Reference)) {
    throw new TypeError(msg)
  }
}

export {
  deepCompare,
  omit,
  typeAssert,
  isNum,
  isStr,
  isRegExp,
  isArr,
  isObj,
}