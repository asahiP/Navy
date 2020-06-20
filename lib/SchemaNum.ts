'use strict';

import { Schema } from './Schema'
import { Rule } from './Rule'
import { typeAssert, isNum } from './utils'
import { MSG_PARAM_NOT_NUM, MSG_REF_NOT_NUM } from './message'



function required (ref, val) {
  return isNum(val)
}

function greater (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val > ref
}

function less (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val < ref
}

function max (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val <= ref
}

function min (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val >= ref
}

function equal (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && ref === val
}

function int (ref, val) {
  return isNum(val) && (val % 1 === 0)
}

function multiple (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && (val / ref % 1 === 0)
}

function divisor (ref, val) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && (ref / val % 1 === 0)
}

function positive (ref, val) {
  return isNum(val) && val > 0
}

function negative (ref, val) {
  return isNum(val) && val < 0
}

type Name = 'required'
  | 'greater' | 'less'
  | 'max' | 'min' | 'equal'
  | 'int' | 'multiple'| 'divisor'
  | 'positive' | 'negative'

class SchemaNum extends Schema {
  effect (status: Status, name: Name, hook: Hook) {
    this.__hooks__[status][name] = hook

    return this
  }
  required () {
    this.__rules__.push(new Rule(required, 'required', null))

    return this
  }
  greater (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(greater, 'greater', ref))

    return this
  }
  less (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(less, 'less', ref))

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
  equal (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(equal, 'equal', ref))

    return this
  }
  int (ref) {
    this.__rules__.push(new Rule(int, 'int', null))

    return this
  }
  multiple (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(multiple, 'multiple', ref))

    return this
  }
  divisor (ref) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(divisor, 'divisor', ref))

    return this
  }
  positive (ref) {
    this.__rules__.push(new Rule(positive, 'positive', null))

    return this 
  }
  negative (ref) {
    this.__rules__.push(new Rule(negative, 'negative', null))

    return this 
  }
}

export { SchemaNum }