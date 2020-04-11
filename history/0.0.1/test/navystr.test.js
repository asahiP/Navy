function isEmpty (arg) {
  return arg === null || arg === undefined
}
function is (arg) {
  return isEmpty(arg)
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
function isDate (arg) {
  return is(arg) === Date
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
   * 号段正则编写时间：2019 / 10 / 13
   * 号段来源：https://zh.wikipedia.org/wiki/中国内地移动终端通讯号段
   */
  let regExp =
    /^(\+86)?(13[0-9]|14(5|7|9)|15([0-3]|[5-9])|166|17([1-3]|[5-8])|18[0-9]|19(1|[8-9]))\d{8}$/
  
  return regExp.test(arg)
}


function NavyStr (value) {
  if (!isStr(value)) throw new TypeError('The value must be a String')

  this.value = value
}

NavyStr.prototype = {
  regexp (re) {
    return re.test(this.value)
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
  number (str) {
    let regExp = /[^\d]/g
    
    return !regExp.test(str)
  },
  uri (str) {
    let regExp =
      /^(https?:\/\/)?(\w+\.)?\w+\.[a-z]{2,}(\/.*)?$/i
    
    return regExp.test(str)
  },
  mail (str) {
    let regExp = 
      /^([a-zA-Z0-9_\-.\u4e00-\u9fa5]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,8})$/
    return regExp.test(str)
  },
  phone (str) {
    return isPhone(str)
  }
}

test('NavyStr类', () => {
  function errClass () {
    new NavyStr(123)
  }
  expect(errClass).toThrow()

  let str = new NavyStr('abcdefg')

  expect(str.regexp(/[a-z]+/)).toBeTruthy()
  expect(str.includes('abc')).toBeTruthy()
  expect(str.equal('abcdefg')).toBeTruthy()
  expect(str.minlen('5')).toBeTruthy()
  expect(str.minlen('5.5')).toBeTruthy()
  expect(str.minlen(5)).toBeTruthy()
  expect(str.minlen(5.5)).toBeTruthy()
  expect(str.maxlen(8)).toBeTruthy()
  expect(str.maxlen(7)).toBeFalsy()
  expect(str.len(7)).toBeTruthy()
  expect(str.between(5, 7)).toBeTruthy()
  expect(str.number(str.value)).toBeFalsy()
  expect(str.uri(str.value)).toBeFalsy()
  expect(str.uri('http://google.com')).toBeTruthy()
  expect(str.mail('example@mail.com')).toBeTruthy()
  expect(str.phone('13200000000')).toBeTruthy()
})