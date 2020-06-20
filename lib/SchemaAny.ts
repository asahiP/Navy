'use strict';

import { Schema } from './Schema'
import { Rule } from './Rule'
import { deepCompare } from './utils'

function isEmpty (ref, val: any): boolean {
  return val === null || val === undefined
}

function isRequired (ref, val: any): boolean {
  return !isEmpty(ref, val)
}

function isTruthy (ref, val: any): boolean {
  return new Boolean(val).valueOf() === true
}

function isFalsy (ref, val: any): boolean {
  return new Boolean(val).valueOf() === false
}

type Name = 'required' | 'empty' | 'equal' | 'truthy' | 'falsy'

class SchemaAny extends Schema {
  effect (status: Status, name: Name, hook: Hook) {
    this.__hooks__[status][name] = hook

    return this
  }
  required () {
    this.__rules__.push(new Rule(isRequired, 'required', null))

    return this
  }
  empty () {
    this.__rules__.push(new Rule(isEmpty, 'empty', null))

    return this
  }
  equal (ref: any) {
    this.__rules__.push(new Rule(deepCompare, 'equal', ref))

    return this
  }
  truthy () {
    this.__rules__.push(new Rule(isTruthy, 'truthy', null))

    return this
  }
  falsy () {
    this.__rules__.push(new Rule(isFalsy, 'falsy', null))

    return this
  }
}

export { SchemaAny }