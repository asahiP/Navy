'use strict';

class Reference {
  public key: string
  public ancestor: number

  constructor (key: string, ancestor = 0) {
    if (ancestor < 0 || ancestor % 1 !== 0) {
      throw new TypeError('ancestor 必须为正整数')
    }
    
    this.key = key
    this.ancestor = ancestor
  }
}

export { Reference }