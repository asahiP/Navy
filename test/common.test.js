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

test('is函数', () => {
  expect(is()).toBeNull()
  expect(is(null)).toBeNull()
  expect(is(undefined)).toBeNull()
  expect(is(1)).toBe(Number)
  expect(is('1')).toBe(String)
  expect(is(true)).toBe(Boolean)
  expect(is(false)).toBe(Boolean)
  expect(is({})).toBe(Object)
  expect(is([])).toBe(Array)
  expect(is(new Date)).toBe(Date)

  expect(isEmpty()).toBeTruthy()
  expect(isEmpty(undefined)).toBeTruthy()
  expect(isEmpty(null)).toBeTruthy()

  expect(isObj({})).toBeTruthy()
  expect(isArr([])).toBeTruthy()
  expect(isNum(1)).toBeTruthy()
  expect(isStr('1')).toBeTruthy()
  expect(isDate(new Date())).toBeTruthy()
  expect(isTrue(true)).toBeTruthy()
  expect(isFalse(false)).toBeTruthy()

  expect(isObj()).toBeFalsy()
  expect(isObj(null)).toBeFalsy()
  expect(isObj(undefined)).toBeFalsy()

  expect(isTrue(1)).toBeFalsy()
  expect(isTrue({})).toBeFalsy()
  expect(isTrue([])).toBeFalsy()
  expect(isTrue('1')).toBeFalsy()

  expect(isFalse(0)).toBeFalsy()
  expect(isFalse(null)).toBeFalsy()
  expect(isFalse(undefined)).toBeFalsy()
  expect(isNum(null)).toBeFalsy()
  expect(isNum(undefined)).toBeFalsy()

  expect(isPosi(1)).toBeTruthy()
  expect(isPosi(-1)).toBeFalsy()
  expect(isNega(-1)).toBeTruthy()
  expect(isNega(1)).toBeFalsy()

  expect(isPosi('1')).toBeFalsy()
  expect(isNega('1')).toBeFalsy()
})