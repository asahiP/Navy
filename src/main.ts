'use strict';

import { Rule } from './lib/Rule'
import { Reference } from './lib/Reference'
import { Schema } from './lib/Schema'
import { SchemaAny } from './lib/SchemaAny'
import { SchemaNum } from './lib/SchemaNum'
import { SchemaStr } from './lib/SchemaStr'
import { SchemaDate } from './lib/SchemaDate'
import { SchemaArr } from './lib/SchemaArr'
import { SchemaObj } from './lib/SchemaObj'
import { isObj } from './lib/utils'
import { MSG_REF_ONCE, MSG_OBJ_ONLY } from './lib/message'

const trigger = function (status: string, name: string, ref: any, val: any) {
  const hook = this.__hooks__[status][name]
  hook && hook(ref, val)
}

Schema.prototype.validate = function validate (val: any): boolean {
  this.__value__ = val

  for (let rule of this.__rules__) {
    if (rule.hasRef) {
      let parent = this.__getParent__()
      if (parent instanceof SchemaArr) {
        while (!(parent instanceof SchemaObj) && parent !== null) {
          parent = parent.__getParent__()
        }
        this.__setParent__(parent)
      }
      if (parent instanceof SchemaObj) {
        if (parent.__getParent__() instanceof SchemaArr) {
          parent = parent.__getParent__()
          while (!(parent instanceof SchemaObj) && parent !== null) {
            parent = parent.__getParent__()
          }
          this.__setParent__(parent)
        }
        if (!validateWithRef.apply(this, [rule, val])) {
          return false
        }
      } else {
        throw new TypeError(MSG_OBJ_ONLY)
      }
    } else {
      if (!rule.call(rule.ref, val)) {
        trigger.call(this, 'failed', rule.name, rule.ref, val)
        return false
      } else {
        trigger.call(this, 'passed', rule.name, rule.ref, val)
      }
    }
  }

  return true
}
function validateWithRef (rule: Rule, val: any): boolean {
  let ref = rule.ref
  let keys = ref.key.split('.')
  let ancestor = ref.ancestor
  let parent = this.__getParent__()
  
  while (ancestor && parent.__getParent__()) {
    parent = parent.__getParent__()
    ancestor--
  }

  let refVal = parent.__value__[keys[0]]
  for (let i = 1, kLen = keys.length; i < kLen; i++) {
    if (isObj(refVal)) {
      refVal = refVal[keys[i]]
    } else {
      return false
    }
  }
  if (refVal instanceof Reference) {
    throw new TypeError(MSG_REF_ONCE)
  }
  if (!rule.call(refVal, val)) {
    trigger.call(this, 'failed', rule.name, refVal, val)
    return false
  }
  
  trigger.call(this, 'passed', rule.name, refVal, val)
  return true
}

const Navy = {
  any: function () {
    return new SchemaAny()
  },
  number: function () {
    return new SchemaNum()
  },
  string: function () {
    return new SchemaStr()
  },
  date: function () {
    return new SchemaDate()
  },
  array: function () {
    return new SchemaArr()
  },
  object: function () {
    return new SchemaObj()
  },
  ref: function (key: string, ancestor?: number) {
    return new Reference(key, ancestor)
  }
}

export { Navy }