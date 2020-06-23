'use strict';

import { Schema } from './Schema'
import { Reference } from './Reference'
import { Rule } from './Rule'
import { typeAssert, isNum } from './utils'
import { MSG_PARAM_NOT_NUM, MSG_REF_NOT_NUM } from './message'



function required (ref: any, val: any) {
  return isNum(val)
}

function greater (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val > ref
}

function less (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val < ref
}

function max (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val <= ref
}

function min (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && val >= ref
}

function equal (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && ref === val
}

function int (ref: any, val: any) {
  return isNum(val) && (val % 1 === 0)
}

function multiple (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && (val / ref % 1 === 0)
}

function divisor (ref: any, val: any) {
  typeAssert(ref, MSG_REF_NOT_NUM, isNum)

  return isNum(val) && (ref / val % 1 === 0)
}

function positive (ref: any, val: any) {
  return isNum(val) && val > 0
}

function negative (ref: any, val: any) {
  return isNum(val) && val < 0
}



class SchemaNum extends Schema {
  required () {
    this.__rules__.push(new Rule(required, 'required', null))

    return this
  }
  greater (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(greater, 'greater', ref))

    return this
  }
  less (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(less, 'less', ref))

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
  equal (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(equal, 'equal', ref))

    return this
  }
  int () {
    this.__rules__.push(new Rule(int, 'int', null))

    return this
  }
  multiple (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(multiple, 'multiple', ref))

    return this
  }
  divisor (ref: number | Reference) {
    typeAssert(ref, MSG_PARAM_NOT_NUM, isNum)

    this.__rules__.push(new Rule(divisor, 'divisor', ref))

    return this
  }
  positive () {
    this.__rules__.push(new Rule(positive, 'positive', null))

    return this 
  }
  negative () {
    this.__rules__.push(new Rule(negative, 'negative', null))

    return this 
  }
}

export { SchemaNum }