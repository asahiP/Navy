'use strict';

import { Rule } from './Rule'

class Schema {
  protected __rules__: Rule[] = []
  protected __parent__ = null
  protected __value__ = undefined
  protected __hooks__ = { passed: {}, failed: {} }

  __setParent__ (parent) {
    this.__parent__ = parent
  }
  __getParent__ () {
    return this.__parent__
  }

  validate (val: any) {}
}

export { Schema }