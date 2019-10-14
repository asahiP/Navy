
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

function NavyDate (value) {
  let tmp

  try {
    if (isNum(value) || isStr(value) || isDate(value)) {
      tmp = new Date(value).getTime()
      if (!isNum(tmp)) throw ''
    } else {
      throw ''
    }
    this.value = tmp
  } catch (e) {
    throw new TypeError('The value must be a Date Object, a string value representing a date or a Number')
  }
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

test('NavyDate类', () => {
  function errClass () {
    let date = new NavyDate(false)
  }
  expect(errClass).toThrow()

  let date = new NavyDate('2019-09-18 00:00:00')

  expect(date.after('2019-09-17 00:00:00')).toBeTruthy()
  expect(date.before('2019-09-19 00:00:00')).toBeTruthy()
  expect(date.between('2019-09-17 00:00:00', '2019-09-19 00:00:00')).toBeTruthy()
  expect(date.at('2019-09-18 00:00:00')).toBeTruthy()

  expect(date.after(date.value - 1000)).toBeTruthy()
  expect(date.before(date.value + 1000)).toBeTruthy()
  expect(date.between(date.value - 1000, date.value + 1000)).toBeTruthy()
  expect(date.at(date.value)).toBeTruthy()
})