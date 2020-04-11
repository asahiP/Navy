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
  return is(arg) === Number
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

function NavyNum (value) {
  if (!isNum(value)) throw new TypeError('The value must be a Number')

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
  phone (num) {
    return isPhone(num)
  },
  int (num) {
    return num % 1 === 0
  },
  float (num) {
    return num % 1 !== 0
  },
  multiple (num) {
    let { value, int } = this
    return int(value / num)
  },
  divisor (num) {
    let { value, int } = this
    return int(num / value)
  },
  positive (num) {
    return isPosi(num)
  },
  negative (num) {
    return isNega(num)
  }
}

test('navyNum类', () => {
  function errClass () {
    let num = new NavyNum('123')
  }
  expect(errClass).toThrow()

  let num = new NavyNum(1024)

  expect(num.more(999)).toBeTruthy()
  expect(num.less(2048)).toBeTruthy()
  expect(num.equal(1024)).toBeTruthy()
  expect(num.between(999, 2048)).toBeTruthy()
  expect(num.phone()).toBeFalsy()
  expect(num.phone(num.value)).toBeFalsy()
  expect(num.phone(13200000000)).toBeTruthy()
  expect(num.int(num.value)).toBeTruthy()
  expect(num.float(num.value)).toBeFalsy()
  expect(num.multiple(256)).toBeTruthy()
  expect(num.divisor(2048)).toBeTruthy()
  expect(num.positive(num.value)).toBeTruthy()
  expect(num.negative(num.value)).toBeFalsy()
})