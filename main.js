const MSG_PARAM_NUM = 'The parameter must be a number or a reference'
const MSG_REF_NUM = 'The reference value must be a number'
const MSG_PARAM_REGEXP = 'The parameter must be a regexp or a reference'
const MSG_REF_REGEXP = 'The reference value must be a regexp'
const MSG_PARAM_STR = 'The parameter must be a string or a reference'
const MSG_REF_STR = 'The reference value must be a string'
const MSG_PARAM_DATE = 'The parameter must be a number, an ISOString, a date or a reference'
const MSG_REF_DATE = 'The reference value must be a number, an ISOString or a date'
const MSG_PARAM_ARR = 'The parameter must be an array'
const MSG_NOT_NAVY_ARR = 'The parameter must be an array containing only Navy instance'
const MSG_NOT_NAVY_OBJ = 'The parameter must be an key-value containing only Navy instance'
const MSG_PARAM_OBJ = 'The parameter must be an object'
const MSG_OBJ_ONLY = 'You can only use Navy.ref() in Navy.object()'
const MSG_NOT_REF = 'The reference value could not be another reference'

/** Class Area */
function Schema () {
  this.__rules = []
  this.__parent = null
  this.__value = undefined
}

Schema.prototype.validate = validate
Schema.prototype.validateSync = validateSync

function Rule (call, name, ref) {
  this.call = call
  this.name = name
  this.ref = ref
  this.hasRef = instanceOf(ref, Reference)
}

function Reference (key, ancestor) {
  this.key = key
  this.ancestor = ancestor
}

function Schema_ANY () {
  Schema.call(this)
}

Schema_ANY.prototype = Object.create(Schema.prototype)
Object.assign(Schema_ANY.prototype, {
  constructor: Schema_ANY,

  required: function () {
    this.__rules.push(new Rule(isRequired, 'required', null))

    return this
  },
  empty: function () {
    this.__rules.push(new Rule(isEmpty, 'empty', null))

    return this
  },
  equal: function (ref) {
    this.__rules.push(new Rule(deepCompare, 'equal', ref))

    return this
  },
  truthy: function () {
    this.__rules.push(new Rule(isTruthy, 'truthy', null))

    return this
  },
  falsy: function () {
    this.__rules.push(new Rule(isFalsy, 'falsy', null))

    return this
  }
})

function Schema_NUM () {
  Schema.call(this)
}

Schema_NUM.prototype = Object.create(Schema.prototype)
Object.assign(Schema_NUM.prototype, {
  constructor: Schema_NUM,

  required: function () {
    this.__rules.push(new Rule(num_required, 'required', null))

    return this
  },
  greater: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_greater, 'greater', ref))

    return this
  },
  less: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_less, 'less', ref))

    return this
  },
  max: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_max, 'max', ref))

    return this
  },
  min: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_min, 'min', ref))

    return this
  },
  equal: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_equal, 'equal', ref))

    return this
  },
  int: function (ref) {
    this.__rules.push(new Rule(num_int, 'int', null))

    return this
  },
  multiple: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_multiple, 'multiple', ref))

    return this
  },
  divisor: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(num_divisor, 'divisor', ref))

    return this
  },
  positive: function (ref) {
    this.__rules.push(new Rule(num_positive, 'positive', null))

    return this 
  },
  negative: function (ref) {
    this.__rules.push(new Rule(num_negative, 'negative', null))

    return this 
  },
})

/** Schema_NUM Methods Area */
function num_required (ref, val) {
  return isNum(val)
}
function num_greater (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && val > ref
}
function num_less (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && val < ref
}
function num_max (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && val <= ref
}
function num_min (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && val >= ref
}
function num_equal (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && ref === val
}
function num_int (ref, val) {
  return isNum(val) && (val % 1 === 0)
}
function num_multiple (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && (val / ref % 1 === 0)
}
function num_divisor (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isNum(val) && (ref / val % 1 === 0)
}
function num_positive (ref, val) {
  return isNum(val) && val > 0
}
function num_negative (ref, val) {
  return isNum(val) && val < 0
}



function Schema_STR () {
  Schema.call(this)
}

Schema_STR.prototype = Object.create(Schema.prototype)
Object.assign(Schema_STR.prototype, {
  constructor: Schema_STR,

  required: function () {
    this.__rules.push(new Rule(str_required, 'required', null))

    return this
  },
  regexp: function (ref) {
    typeAssert(ref, RegExp, MSG_PARAM_REGEXP)

    this.__rules.push(new Rule(str_regexp, 'regexp', ref))

    return this
  },
  includes: function (ref) {
    typeAssert(ref, String, MSG_PARAM_STR)

    this.__rules.push(new Rule(str_includes, 'includes', ref))

    return this
  },
  equal: function (ref) {
    typeAssert(ref, String, MSG_PARAM_STR)

    this.__rules.push(new Rule(str_equal, 'equal', ref))

    return this
  },
  max: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(str_max, 'max', ref))

    return this
  },
  min: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(str_min, 'min', ref))

    return this
  },
  length: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(str_length, 'length', ref))

    return this
  },
  number: function (ref) {
    this.__rules.push(new Rule(str_number, 'number', null))

    return this
  },
  alphabet: function (ref) {
    this.__rules.push(new Rule(str_alphabet, 'alphabet', null))

    return this
  },
  alphanum: function (ref) {
    this.__rules.push(new Rule(str_alphanum, 'alphanum', null))

    return this
  },
  URL: function (ref) {
    this.__rules.push(new Rule(str_URL, 'URL', null))

    return this
  },
  mail: function (ref) {
    this.__rules.push(new Rule(str_mail, 'mail', null))

    return this
  },
  phone: function (ref) {
    this.__rules.push(new Rule(str_phone, 'phone', null))

    return this
  },
  IDCard: function (ref) {
    this.__rules.push(new Rule(str_IDCard, 'IDCard', null))

    return this
  }
})



/** Schema_STR Methods Area */
function str_required (ref, val) {
  return isStr(val)
}
function str_regexp (ref, val) {
  typeAssert(ref, RegExp, MSG_REF_REGEXP)

  return isStr(val) && ref.test(val)
}
function str_includes (ref, val) {
  typeAssert(ref, String, MSG_REF_STR)

  return isStr(val) && val.includes(ref)
}
function str_equal (ref, val) {
  typeAssert(ref, String, MSG_REF_STR)

  return isStr(val) && val === ref
}
function str_max (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isStr(val) && val.length <= ref
}
function str_min (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isStr(val) && val.length >= ref
}
function str_length (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isStr(val) && val.length === ref
}
function str_number (ref, val) {
  return isStr(val) && /^\d+$/.test(val)
}
function str_alphabet (ref, val) {
  return isStr(val) && /^[a-zA-Z]+$/.test(val)
}
function str_alphanum (ref, val) {
  return isStr(val) && /^[a-zA-Z\d]+$/.test(val) && /\d/.test(val) && /[a-zA-Z]/.test(val)
}
function str_URL (ref, val) {
  return isStr(val) && /^(https?:\/\/)?(\w+\.)?\w+\.[a-z]{2,}(\/.*)?$/i.test(val)
}
function str_mail (ref, val) {
  return isStr(val) && /^([a-z0-9_\-.\u4e00-\u9fa5]+)@([a-z0-9_\-.]+)\.([a-z]{2,8})$/i.test(val)
}
function str_phone (ref, val) {
  /** 
   * Time：2019 / 10 / 13
   * Source：https://zh.wikipedia.org/wiki/中国内地移动终端通讯号段
   * Description: 仅匹配中国大陆手机号码
   */
  
  return isStr(val) && /^(\+86)?(13[0-9]|14(5|7|9)|15([0-3]|[5-9])|166|17([1-3]|[5-8])|18[0-9]|19(1|[8-9]))\d{8}$/.test(val)
}
function str_IDCard (ref, val) {
  return isStr(val) && /^[1-9]\d{16}(\d|x)$/i.test(val) && isLegalIDCard(val)
}



function Schema_DATE () {
  Schema.call(this)
}

Schema_DATE.prototype = Object.create(Schema.prototype)
Object.assign(Schema_DATE.prototype, {
  constructor: Schema_DATE,

  required: function () {
    this.__rules.push(new Rule(date_required, 'required', null))

    return this
  },
  after: function (ref) {
    legalDateAssert(ref, MSG_PARAM_DATE)

    this.__rules.push(new Rule(date_after, 'after', ref))

    return this
  },
  before: function (ref) {
    legalDateAssert(ref, MSG_PARAM_DATE)

    this.__rules.push(new Rule(date_before, 'before', ref))

    return this
  },
  at: function (ref) {
    legalDateAssert(ref, MSG_PARAM_DATE)

    this.__rules.push(new Rule(date_at, 'at', ref))

    return this
  },
  max: function (ref) {
    legalDateAssert(ref, MSG_PARAM_DATE)

    this.__rules.push(new Rule(date_max, 'max', ref))

    return this
  },
  min: function (ref) {
    legalDateAssert(ref, MSG_PARAM_DATE)

    this.__rules.push(new Rule(date_min, 'min', ref))

    return this
  },
})


/** Schema_DATE Methods Area */
function date_required (ref, val) {
  return isRequired(null, val) && !instanceOf(val, Boolean) && !isNaN(new Date(val).getTime())
}
function date_after (ref, val) {
  legalDateAssert(ref, MSG_REF_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return date_required(null, val) && valTime > refTime
}
function date_before (ref, val) {
  legalDateAssert(ref, MSG_REF_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return date_required(null, val) && valTime < refTime
}
function date_at (ref, val) {
  legalDateAssert(ref, MSG_REF_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return date_required(null, val) && valTime === refTime
}
function date_max (ref, val) {
  legalDateAssert(ref, MSG_REF_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return date_required(null, val) && valTime <= refTime
}
function date_min (ref, val) {
  legalDateAssert(ref, MSG_REF_DATE)

  let refTime = new Date(ref).getTime()
  let valTime = new Date(val).getTime()

  return date_required(null, val) && valTime >= refTime
}



function Schema_ARR () {
  Schema.call(this)
}

Schema_ARR.prototype = Object.create(Schema.prototype)
Object.assign(Schema_ARR.prototype, {
  constructor: Schema_ARR,

  required: function () {
    this.__rules.push(new Rule(arr_required, 'required', null))

    return this
  },
  max: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(arr_max, 'max', ref))

    return this
  },
  min: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(arr_min, 'min', ref))

    return this
  },
  length: function (ref) {
    typeAssert(ref, Number, MSG_PARAM_NUM)

    this.__rules.push(new Rule(arr_length, 'length', ref))

    return this
  },
  items: function (ref) {
    let duplicate = []
    
    if (isArr(ref)) {
      if (ref.length === 0) {
        throw new TypeError('At least one Navy instance must be included')
      }
      
      duplicate = ref.concat()
      for (let [key, item] of duplicate.entries()) {
        if (instanceOf(item, Reference)) {
          let child = new Schema_ANY().equal(item)
          child.__parent = this
          duplicate[key] = child
        } else if (!isNavyType(item)) {
          throw new TypeError(MSG_NOT_NAVY_ARR)
        } else {
          item.__parent = this
        }
      }
    } else {
      throw new TypeError(MSG_PARAM_ARR)
    }

    this.__rules.push(new Rule(arr_items, 'items', duplicate))

    return this
  },
  only: function (ref) {
    let duplicate = ref
    if (instanceOf(duplicate, Reference)) {
      duplicate = new Schema_ANY().equal(ref)
    } else if (!isNavyType(ref)) {
      throw new TypeError('The parameter must be a Navy instance')
    }

    duplicate.__parent = this
    this.__rules.push(new Rule(arr_only, 'only', duplicate))

    return this
  }
})


/** Schema_ARR Methods Area */
function arr_required (ref, val) {
  return isArr(val)
}
function arr_max (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isArr(val) && val.length <= ref
}
function arr_min (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isArr(val) && val.length >= ref
}
function arr_length (ref, val) {
  typeAssert(ref, Number, MSG_REF_NUM)

  return isArr(val) && val.length === ref
}
function arr_items (ref, val) {
  if (!isArr(val) || val.length === 0) {
    return false
  }

  for (let item of val) {
    let passed = false
    for (let schema of ref) {
      if (schema.validateSync(item)) {
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
function arr_only (ref, val) {
  if (!isArr(val) || val.length === 0) {
    return false
  }

  for (let item of val) {
    if (!ref.validateSync(item)) {
      return false
    }
  }

  return true
}



function Schema_OBJ () {
  Schema.call(this)

  this.__children = {}
  this.__optional = {}
  this.__keys = {}
  this.__hasOpational = false
  this.__hasKeys = false
}

Schema_OBJ.prototype = Object.create(Schema.prototype)
Object.assign(Schema_OBJ.prototype, {
  constructor: Schema_OBJ,

  required: function (ref) {
    this.__rules.push(new Rule(obj_required, 'required', null))

    return this
  },
  keys: function (ref) {
    let duplicate = obj_rebuild.call(this, ref)

    Object.assign(this.__keys, duplicate)

    if (!this.__hasKeys) {
      this.__rules.push(new Rule(obj_keys.bind(this), 'keys', null))
      this.__hasKeys = true
    }

    this.__optional = omit(this.__optional, Object.keys(ref))

    return this
  },
  optional: function (ref) {
    let duplicate = obj_rebuild.call(this, ref)

    Object.assign(this.__optional, duplicate)

    if (!this.__hasOpational) {
      this.__rules.push(new Rule(obj_optional.bind(this), 'optional', null))
      this.__hasOpational = true
    }

    this.__keys = omit(this.__keys, Object.keys(ref))

    return this
  }
})

/** Schema_OBJ Methods Area */
function obj_required (ref, val) {
  return isObj(val)
}
function obj_rebuild (ref) {
  if (!isObj(ref)) {
    throw new TypeError(MSG_PARAM_OBJ)
  }

  let duplicate = Object.assign({}, ref)

  for (let key of Object.keys(duplicate)) {
    let val = duplicate[key]

    if (isObj(val)) {
      let child = new Schema_OBJ().keys(val)

      duplicate[key] = child
      child.__parent = this
      this.__children[key] = child
    } else if (isNavyType(val)) {
      val.__parent = this
    } else if (instanceOf(val, Reference)) {
      let child = new Schema_ANY().equal(val)

      duplicate[key] = child
      child.__parent = this
    } else {
      throw new TypeError(MSG_NOT_NAVY_OBJ)
    }
  }

  return duplicate
}
function obj_keys (ref, val) {
  if (!isObj(val)) {
    return false
  }

  let rules = this.__keys
  let optional = this.__optional
  let refKeys = Object.keys(rules)
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
    let schema = rules[key]
    if (!schema.validateSync(val[key])) {
      return false
    }
  }

  return true
}
function obj_optional (ref, val) {
  if (!isObj(val)) {
    return false
  }

  let rules = this.__optional
  let keys = Object.keys(rules)

  for (let key of keys) {
    let item = val[key]
    let schema = rules[key]
    if (item !== undefined) {
      if (!schema.validateSync(item)) {
        return false
      }
    }
  }

  return true
}



/** Methods Area */
function validate (val) {
  return new Promise((res, rej) => {
    this.__value = val

    let passed = []
    let failed = []

    for (let rule of this.__rules) {
      let result = Object.assign({ val }, rule)

      if (rule.hasRef) {
        let parent = this.__parent
        if (instanceOf(parent, Schema_ARR)) {
          while (!instanceOf(parent, Schema_OBJ) && parent !== null) {
            parent = parent.__parent
          }
          this.__parent = parent
        }
        if (instanceOf(parent, Schema_OBJ)) {
          if (instanceOf(parent.__parent, Schema_ARR)) {
            parent = parent.__parent
            while (!instanceOf(parent, Schema_OBJ) && parent !== null) {
              parent = parent.__parent
            }
            this.__parent = parent
          }
          if (!validateWithRef.apply(this, [rule, val])) {
            return false
          }
        } else {
          throw new TypeError(MSG_OBJ_ONLY)
        }
      } else if (rule.call(rule.ref, val)) {
        passed.push(result)
      } else {
        failed.push(result)
      }
    }

    if (failed.length > 0) {
      rej(failed)
    } else {
      res(passed)
    }
  })
}

function validateSync (val) {
  this.__value = val

  for (let rule of this.__rules) {
    if (rule.hasRef) {
      let parent = this.__parent
      if (instanceOf(parent, Schema_ARR)) {
        while (!instanceOf(parent, Schema_OBJ) && parent !== null) {
          parent = parent.__parent
        }
        this.__parent = parent
      }
      if (instanceOf(parent, Schema_OBJ)) {
        if (instanceOf(parent.__parent, Schema_ARR)) {
          parent = parent.__parent
          while (!instanceOf(parent, Schema_OBJ) && parent !== null) {
            parent = parent.__parent
          }
          this.__parent = parent
        }
        if (!validateWithRef.apply(this, [rule, val])) {
          return false
        }
      } else {
        throw new TypeError(MSG_OBJ_ONLY)
      }
    } else if (!rule.call(rule.ref, val)) {
      return false
    }
  }

  return true
}

function validateWithRef (rule, val) {
  let ref = rule.ref
  let keys = ref.key.split('.')
  let ancestor = ref.ancestor
  let parent = this.__parent
  
  while (ancestor && parent.__parent) {
    parent = parent.__parent
    ancestor--
  }

  let refVal = parent.__value[keys[0]]
  for (let i = 1, kLen = keys.length; i < kLen; i++) {
    if (isObj(refVal)) {
      refVal = refVal[keys[i]]
    } else {
      return false
    }
  }
  if (instanceOf(refVal, Reference)) {
    throw new TypeError(MSG_NOT_REF)
  }
  if (!rule.call(refVal, val)) {
    return false
  }

  return true
}

function isNavyType (val) {
  return instanceOf(val, Schema_ANY)
    || instanceOf(val, Schema_NUM)
    || instanceOf(val, Schema_STR)
    || instanceOf(val, Schema_DATE)
    || instanceOf(val, Schema_ARR)
    || instanceOf(val, Schema_OBJ)
}

function instanceOf (val, instance) {
  return val !== null
    && val !== undefined
    && val.constructor === instance
}

function typeAssert (val, type, msg) {
  if (instanceOf(val, type) || instanceOf(val, Reference));
  else throw new TypeError(msg)
}

function legalDateAssert (val, msg) {
  if (instanceOf(val, Reference)
    || ((instanceOf(val, Number)
        || instanceOf(val, String)
        || instanceOf(val, Date))
      && !isNaN(new Date(val).getTime())));
  else throw new TypeError(msg)
}

function isEmpty (ref, val) {
  return val === null || val === undefined
}

function isRequired (ref, val) {
  return !isEmpty(ref, val)
}

function isTruthy (ref, val) {
  return new Boolean(val).valueOf() === true
}

function isFalsy (ref, val) {
  return new Boolean(val).valueOf() === false
}

function isNum (val) {
  return instanceOf(val, Number)
}

function isStr (val) {
  return instanceOf(val, String)
}

function isArr (val) {
  return instanceOf(val, Array)
}

function isObj (val) {
  return instanceOf(val, Object)
}

function isLegalIDCard (val) {
  /** 
   * Time：2020 / 02 / 06
   * Source：https://zh.wikipedia.org/wiki/中华人民共和国公民身份号码
   * Description: 仅匹配中国大陆身份证号码
   */
  let ais = val.split('').map(val => {
    let n = parseInt(val)

    return isNaN(n)
      ? 10
      : n
  }).reverse()
  let Wis = [...new Array(18).keys()].map(n => Math.pow(2, n) % 11)
  let sum = ais.map((n, index) => n * Wis[index]).reduce((total, num) => total + num)

  return sum % 11 === 1
}

function deepCompare (ref, val) {
  if (isArr(ref)) {
    if (isArr(val)) {
      let rLen = ref.length
      let vLen = val.length

      if (rLen === vLen) {
        for (let i = 0; i < rLen; i++) {
          if (!deepCompare(ref[i], val[i])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (isObj(ref)) {
    if (isObj(val)) {
      let rKeys = Object.keys(ref)
      let vKeys = Object.keys(val)
      let keySet = new Set([...rKeys, ...vKeys])
      let rLen = rKeys.length
      let vLen = vKeys.length
      let kLen = keySet.size

      if (rLen === vLen && rLen === kLen) {
        for (let i = 0; i < rLen; i++) {
          let key = rKeys[i]
          if (!deepCompare(ref[key], val[key])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else if (isNaN(ref)) {
    return isNaN(val)
  }

  return ref === val
}

function omit (obj, uselessKeys) {
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, uselessKeys.includes(key) ? {} : { [key]: obj[key] })
  }, {})
}

const Navy = {
  any: function () {
    return new Schema_ANY()
  },
  number: function () {
    return new Schema_NUM()
  },
  string: function () {
    return new Schema_STR()
  },
  date: function () {
    return new Schema_DATE()
  },
  array: function () {
    return new Schema_ARR()
  },
  object: function () {
    return new Schema_OBJ()
  },
  ref: function (key, ancestor) {
    ancestor = ancestor || 0

    switch (false) {
      case isStr(key):
        throw new TypeError('Parameter[key] must be a string')
      case isNum(ancestor):
      case ancestor >= 0:
      case ancestor % 1 === 0:
        throw new TypeError('Parameter[ancestor] must be a positive integer')
    }

    return new Reference(key, ancestor)
  }
}

export { Navy }