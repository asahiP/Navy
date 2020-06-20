'use strict';

import { Schema } from './Schema'
import { SchemaAny } from './SchemaAny'
import { Rule } from './Rule'
import { Reference } from './Reference'
import { typeAssert, isNum, isArr } from './utils'
import { MSG_PARAM_NOT_NUM, MSG_REF_NOT_NUM, MSG_NOT_NAVY_ARR, MSG_PARAM_NOT_ARR } from './message'

function required (ref, val) {
  return isArr(val)
}
function max (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isArr(val) && val.length <= ref
}
function min (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isArr(val) && val.length >= ref
}
function length (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isArr(val) && val.length === ref
}
function items (ref, val) {
  if (!isArr(val) || val.length === 0) {
    return false
  }

  for (let item of val) {
    let passed = false
    for (let schema of ref) {
      if (schema.validate(item)) {
        passed = true
        break
      }
    }

    if (!passed) {
      return false
    }
  }

  return true
}
function only (ref, val) {
  if (!isArr(val) || val.length === 0) {
    return false
  }

  for (let item of val) {
    if (!ref.validate(item)) {
      return false
    }
  }

  return true
}
type Name = 'required' | 'max' | 'min' | 'length' | 'items' | 'only'

class SchemaArr extends Schema {
  effect (status: Status, name: Name, hook: Hook) {
    this.__hooks__[status][name] = hook

    return this
  }
  required () {
    this.__rules__.push(new Rule(required, 'required', null))

    return this
  }
  max (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(max, 'max', ref))

    return this
  }
  min (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(min, 'min', ref))

    return this
  }
  length (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(length, 'length', ref))

    return this
  }
  items (ref) {
    let duplicate = []
    
    if (isArr(ref)) {
      if (ref.length === 0) {
        throw new TypeError('At least one Navy instance must be included')
      }
      
      duplicate = ref.concat()
      for (let [key, item] of duplicate.entries()) {
        if (item instanceof Reference) {
          let child = new SchemaAny().equal(item)
          child.__setParent__(this)
          duplicate[key] = child
        } else if (!(item instanceof Schema)) {
          throw new TypeError(MSG_NOT_NAVY_ARR)
        } else {
          item.__setParent__(this)
        }
      }
    } else {
      throw new TypeError(MSG_PARAM_NOT_ARR)
    }

    this.__rules__.push(new Rule(items, 'items', duplicate))

    return this
  }
  only (ref) {
    let duplicate = ref
    if (duplicate instanceof Reference) {
      duplicate = new SchemaAny().equal(ref)
    } else if (!(ref instanceof Schema)) {
      throw new TypeError('The parameter must be a Navy instance')
    }

    duplicate.__setParent__(this)
    this.__rules__.push(new Rule(only, 'only', duplicate))

    return this
  }
}

export { SchemaArr }