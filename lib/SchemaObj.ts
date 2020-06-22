'use strict';

import { Schema } from './Schema'
import { SchemaAny } from './SchemaAny'
import { Rule } from './Rule'
import { Reference } from './Reference'
import { isObj, omit } from './utils'
import { MSG_PARAM_NOT_OBJ, MSG_NOT_NAVY_OBJ } from './message'


function required (ref, val) {
  return isObj(val)
}
function rebuild (ref) {
  if (!isObj(ref)) {
    throw new TypeError(MSG_PARAM_NOT_OBJ)
  }

  let duplicate = Object.assign({}, ref)

  for (let key of Object.keys(duplicate)) {
    let val = duplicate[key]

    if (isObj(val)) {
      let child = new SchemaObj().keys(val)

      duplicate[key] = child
      child.__setParent__(this)
    } else if (val instanceof Schema) {
      val.__setParent__(this)
    } else if (val instanceof Reference) {
      let child = new SchemaAny().equal(val)

      duplicate[key] = child
      child.__setParent__(this)
    } else {
      throw new TypeError(MSG_NOT_NAVY_OBJ)
    }
  }

  return duplicate
}
function keys (ref, val) {
  if (!isObj(val)) {
    return false
  }

  let __rules__ = this.__keys__
  let optional = this.__optional__
  let refKeys = Object.keys(__rules__)
  let valKeys = Object.keys(val)
  let optKeys = Object.keys(optional)
  let keySet = new Set([...refKeys, ...valKeys, ...optKeys])
  let oLen = optKeys.length
  let rLen = refKeys.length
  let kLen = keySet.size
  if (kLen < rLen || kLen > rLen + oLen) {
    return false
  }

  for (let key of refKeys) {
    let schema = __rules__[key]
    if (!schema.validate(val[key])) {
      return false
    }
  }

  return true
}
function optional (ref, val) {
  if (!isObj(val)) {
    return false
  }

  let __rules__ = this.__optional__
  let keys = Object.keys(__rules__)

  for (let key of keys) {
    let item = val[key]
    let schema = __rules__[key]
    if (item !== undefined) {
      if (!schema.validate(item)) {
        return false
      }
    }
  }

  return true
}

type Name = 'required'
  | 'keys' | 'optional'

class SchemaObj extends Schema {
  private __optional__ = {}
  private __keys__ = {}
  private __hasOpational__ = false
  private __hasKeys__ = false

  effect (status: Status, name: Name, hook: Hook) {
    this.__hooks__[status][name] = hook

    return this
  }
  required (ref) {
    this.__rules__.push(new Rule(required, 'required', null))

    return this
  }
  keys (ref) {
    let duplicate = rebuild.call(this, ref)

    Object.assign(this.__keys__, duplicate)

    if (!this.__hasKeys__) {
      this.__rules__.push(new Rule(keys.bind(this), 'keys', null))
      this.__hasKeys__ = true
    }

    this.__optional__ = omit(this.__optional__, Object.keys(ref))

    return this
  }
  optional (ref) {
    let duplicate = rebuild.call(this, ref)

    Object.assign(this.__optional__, duplicate)

    if (!this.__hasOpational__) {
      this.__rules__.push(new Rule(optional.bind(this), 'optional', null))
      this.__hasOpational__ = true
    }

    this.__keys__ = omit(this.__keys__, Object.keys(ref))

    return this
  }
}

export { SchemaObj }