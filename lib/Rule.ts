'use strict';

import { Reference } from './Reference'

class Rule {
  public call: Function
  public name: string
  public ref: any
  public hasRef: boolean

  constructor (call: Function, name: string, ref: any) {
    this.call = call
    this.name = name
    this.ref = ref
    this.hasRef = ref instanceof Reference
  }
}

export { Rule }