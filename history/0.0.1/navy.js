function Navy () {
  let rules = []

  this._addRules = (ops) => rules.push(ops)
  this._getRules = () => [...rules]
}
/**
 * @param {array} ops - [data, rule, [matchedText, misMatchedText]]
 */
function rule (ops) {
  this._addRules(ops)

  return this
}

function judge () {
  let queue = this._getRules()
  let results = []

  queue.forEach((op) => {
    results.push(getJudge(op))
  })

  return [...results]
}

Navy.prototype = {
  rule,
  judge,
}


function getJudge (op) {
  let [data, rule, text] = op

  if (!isArr(text)) throw new TypeError('The message argument must be a Array')

  let [matchedText, mismatchedText] = text
  let incorrectRule = status('incorrect rule', mismatchedText, rule)

  switch (true) {
    case isStr(rule): {
      let typeKey = /^((Required|Empty|True|False)\s*)|((Number|String|Date)\s+)/i
      let type = rule.match(typeKey)
      if (isEmpty(type)) return incorrectRule

      type = type[0]
      switch (type.toLowerCase().replace(/\s/g, '')) {
        case 'required': {
          if (!isEmpty(data)) {
            let n_rules = split(rule.slice(type.length), ',')

            const FN_MAP = {
              'number': isNum,
              'string': isStr,
            }

            if (n_rules.length) {
              for (let i = 0, len = n_rules.length; i < len; i++) {
                let fn = n_rules[i]
                if (!FN_MAP[fn.toLowerCase()](data)) {
                  return status('mismatched', mismatchedText, rule)
                }
              }
            }

            return status ('matched', matchedText, rule)
          } else {
            return status('mismatched', mismatchedText, rule)
          }
        }
        case 'empty': {
          if (isEmpty(data)) {
            return status ('matched', matchedText, rule)
          } else {
            return status('mismatched', mismatchedText, rule)
          }
        }
        case 'true': {
          if (isTrue(data)) {
            return status ('matched', matchedText, rule)
          } else {
            return status('mismatched', mismatchedText, rule)
          }
        }
        case 'false': {
          if (isFalse(data)) {
            return status ('matched', matchedText, rule)
          } else {
            return status('mismatched', mismatchedText, rule)
          }
        }
        case 'number': {
          if (!isNum(data)) {
            return status(
              `data type must be a Number, but get a ${typeString(data)}`,
              mismatchedText,
              rule,
            )
          }

          let n_data = new NavyNum(data)

          return fireFN(n_data, rule, type.length, matchedText, mismatchedText, incorrectRule)
        }
        case 'string': {
          if (!isStr(data)) {
            return status(
              `data type must be a String, but get a ${typeString(data)}`,
              mismatchedText,
              rule,
            )
          }

          let n_data = new NavyStr(data)

          return fireFN(n_data, rule, type.length, matchedText, mismatchedText, incorrectRule)
        }
        case 'date': {
          if (!isNum(new Date(data).getTime())) {
            return status(
              `The value must be a Date Object, a string value representing a date or a Number, but get ${data}`,
              mismatchedText,
              rule,
            )
          }

          let n_data = new NavyDate(data)

          return fireFN(n_data, rule, type.length, matchedText, mismatchedText, incorrectRule)
        }
      }
    }
    case isArr(rule): {
      if (isArr(data)) {
        let result = data.map(d => getJudge([d, rule[0], text]))
          .filter(({ status }) => status === 'matched')

        return result.length === data.length
          ? status('matched', matchedText, rule)
          : status('mismatched', mismatchedText, rule)
      } else {
        return status(
          `data type must be a Array, but get a ${typeString(data)}`,
          mismatchedText,
          rule,
        )
      }
    }
    case isObj(rule): {
      if (isObj(data)) {
        let keys = Object.keys(rule)

        let result = keys.map(key => getJudge([data[key], rule[key], text]))
          .filter(({ status }) => status === 'matched')
        
        return result.length === keys.length
          ? status('matched', matchedText, rule)
          : status('mismatched', mismatchedText, rule)
      } else {
        return status(
          `data type must be a Object, but get a ${typeString(data)}`,
          mismatchedText,
          rule,
        )
      }
    }
    default: {
      return incorrectRule
    }
  }
}

function fireFN (n_data, rule, typeLen, matchedText, mismatchedText, incorrectRule) {
  let n_rules = split(rule.slice(typeLen), ',')

  for (let i = 0, len = n_rules.length; i < len; i++) {
    let key_value = n_rules[i]
    let [key, value] = split(key_value, ':')
    let convertedValue = split(value, '|').map(str => {
      let regExp = /^`.+`$/

      return regExp.test(str)
        ? str.slice(1, -1)
        : parseFloat(str)
    })

    key = key.toLowerCase()
    if (!(key in n_data)) return incorrectRule
    if (!n_data[key](...convertedValue)) {
      return status(
        'mismatched',
        mismatchedText,
        rule,
      )
    }
  }
  return status('matched', matchedText, rule)
}

function status (
  status,
  text,
  rule,
) {
  return {
    status,
    text,
    rule,
  }
}

function isEmpty (arg) {
  return arg === null
    || arg === undefined
    || ((isStr(arg) || isArr(arg)) && arg.length === 0)
    || (isObj(arg) && Object.keys(arg).length === 0)
}
function is (arg) {
  return (arg === null || arg === undefined)
    ? null
    : arg.constructor
}
function isObj (arg) {
  return is(arg) === Object
}
function isArr (arg) {
  return is(arg) === Array
}
function isNum (arg) {
  return is(arg) === Number && !isNaN(arg)
}
function isStr (arg) {
  return is(arg) === String
}
function isTrue (arg) {
  return is(arg) === Boolean && arg
}
function isFalse (arg) {
  return is(arg) === Boolean && !arg
}
function isPosi (arg) {
  return isNum(arg) && arg > 0
}
function isNega (arg) {
  return isNum(arg) && arg < 0
}
function isPhone (arg) {
  /** 
   * Time：2019 / 10 / 13
   * Source：https://zh.wikipedia.org/wiki/中国内地移动终端通讯号段
   */
  let regExp =
    /^(\+86)?(13[0-9]|14(5|7|9)|15([0-3]|[5-9])|166|17([1-3]|[5-8])|18[0-9]|19(1|[8-9]))\d{8}$/
  
  return regExp.test(arg)
}
function typeString (obj) {
  return isEmpty(obj)
    ? 'null'
    : Object.prototype.toString.call(obj).slice(8, -1)
}
function split (str, mark) {
  let result = []

  if (str) {
    let start = 0
    let len = str.length
    let exceArr = []
    for (let i = 0; i < len; i++) {
      if (str[i] === '`') {
        exceArr.push(i)
      }
    }
    for (let i = 0; i < len; i++) {
      if (str[i] === mark) {
        if (i < exceArr[0] || i > exceArr[1] || exceArr.length === 0) {
          let j = 1
          while (str[i + j] === ' ') {
            j++
          }
    
          result.push(str.slice(start, i))
          
          start = i + j
          i = exceArr[1]
  
          exceArr = exceArr.slice(2)
        }
      }
    }
    result.push(str.slice(start, len))
  }

  return result.filter(str => str)
}


function NavyNum (value) {
  this.value = value
}

NavyNum.prototype = {
  more (num) {
    return this.value > num
  },
  less (num) {
    return this.value < num
  },
  equal (num) {
    return this.value === num
  },
  between (min, max) {
    let { value } = this
    return value >= min && value <= max
  },
  phone () {
    return isPhone(this.value)
  },
  int () {
    return this.value % 1 === 0
  },
  float () {
    return this.value % 1 !== 0
  },
  multiple (num) {
    let { value } = this
    return (value / num) % 1 === 0
  },
  divisor (num) {
    let { value } = this
    return (num / value) % 1 === 0
  },
  positive () {
    return isPosi(this.value)
  },
  negative () {
    return isNega(this.value)
  }
}

function NavyStr (value) {
  this.value = value
}

NavyStr.prototype = {
  regexp (str) {
    if (!/^\/.+\/(g|i|m|s|u|y)*$/.test(str)) {
      return false
    }

    let regExpArr = str.split(/\/(g|i|m|s|u|y)*$/)
    let regExp = new RegExp(regExpArr[0].slice(1), regExpArr[1])
    return regExp.test(this.value)
  },
  includes (str) {
    return this.value.includes(str)
  },
  equal (str) {
    return this.value === str
  },
  minlen (str) {
    let len = parseInt(str)
    
    return this.value.length > len
  },
  maxlen (str) {
    let len = parseInt(str)
    
    return this.value.length < len
  },
  len (str) {
    let len = parseInt(str)
    
    return this.value.length === len
  },
  between (minStr, maxStr) {
    let min = parseInt(minStr)
    let max = parseInt(maxStr)
    let { length } = this.value

    return length >= min && length <= max
  },
  number () {
    let regExp = /[^\d]/g
    
    return !regExp.test(this.value)
  },
  uri () {
    let regExp =
      /^(https?:\/\/)?(\w+\.)?\w+\.[a-z]{2,}(\/.*)?$/i
    
    return regExp.test(this.value)
  },
  mail () {
    let regExp = 
      /^([a-zA-Z0-9_\-.\u4e00-\u9fa5]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,8})$/
    return regExp.test(this.value)
  },
  phone () {
    return isPhone(this.value)
  }
}


function NavyDate (value) {
  this.value = new Date(value).getTime()
}

NavyDate.prototype = {
  after (date) {
    let time = new Date(date).getTime()
    return this.value > time
  },
  before (date) {
    let time = new Date(date).getTime()

    return this.value < time
  },
  between (after, before) {
    let beforeTime = new Date(before).getTime()
    let afterTime = new Date(after).getTime()
    let { value } = this

    return value >= afterTime && value <= beforeTime
  },
  at (date) {
    let time = new Date(date).getTime()

    return this.value === time
  }
}

export default Navy