'use strict';

import { Rule } from './Rule'

class Schema {
  protected __rules__: Rule[] = []
  protected __parent__: any = null
  protected __value__: any = undefined
  protected __hooks__: any = { passed: {}, failed: {} }

  __setParent__ (parent: any) {
    this.__parent__ = parent
  }
  __getParent__ () {
    return this.__parent__
  }

  effect (status: string, names: string | string[], hook: Function) {
    [].concat(names).forEach((name: string) => this.__hooks__[status][name] = hook)

    return this
  }

  validate (val: any) {}
}

export { Schema }