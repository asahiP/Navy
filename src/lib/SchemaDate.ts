'use strict';

import { Schema } from './Schema'
import { Rule } from './Rule'
import { Reference } from './Reference'
import {
  MSG_PARAM_NOT_DATE, MSG_REF_NOT_DATE
} from './message'

const legalDateAssert = (val: any, msg: any) => {
  if (!required(null, val) && !(val instanceof Reference)) {
    throw new TypeError(msg)
  }
}

function required (ref: any, val: any) {
  const valType = typeof val
  return (valType === 'string' || valType === 'number' || val instanceof Date) && !isNaN(new Date(val).getTime())
}

function after (ref: any, val: any) {
  legalDateAssert(ref, MSG_REF_NOT_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return required(null, val) && valTime > refTime
}
function before (ref: any, val: any) {
  legalDateAssert(ref, MSG_REF_NOT_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return required(null, val) && valTime < refTime
}
function at (ref: any, val: any) {
  legalDateAssert(ref, MSG_REF_NOT_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return required(null, val) && valTime === refTime
}
function max (ref: any, val: any) {
  legalDateAssert(ref, MSG_REF_NOT_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return required(null, val) && valTime <= refTime
}
function min (ref: any, val: any) {
  legalDateAssert(ref, MSG_REF_NOT_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return required(null, val) && valTime >= refTime
}

type LegalDate = string | number | Date

class SchemaDate extends Schema {
  required () {
    this.__rules__.push(new Rule(required, 'required', null))

    return this
  }
  after (ref: LegalDate | Reference) {
    legalDateAssert(ref, MSG_PARAM_NOT_DATE)

    this.__rules__.push(new Rule(after, 'after', ref))

    return this
  }
  before (ref: LegalDate | Reference) {
    legalDateAssert(ref, MSG_PARAM_NOT_DATE)

    this.__rules__.push(new Rule(before, 'before', ref))

    return this
  }
  at (ref: LegalDate | Reference) {
    legalDateAssert(ref, MSG_PARAM_NOT_DATE)

    this.__rules__.push(new Rule(at, 'at', ref))

    return this
  }
  max (ref: LegalDate | Reference) {
    legalDateAssert(ref, MSG_PARAM_NOT_DATE)

    this.__rules__.push(new Rule(max, 'max', ref))

    return this
  }
  min (ref: LegalDate | Reference) {
    legalDateAssert(ref, MSG_PARAM_NOT_DATE)

    this.__rules__.push(new Rule(min, 'min', ref))

    return this
  }
}

export { SchemaDate }