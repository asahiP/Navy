import { Navy } from '../main'

test('Navy.any.required', () => {
  expect(Navy.any().required().validate()).toBeFalsy()
  expect(Navy.any().required().validate(null)).toBeFalsy()
  expect(Navy.any().required().validate(undefined)).toBeFalsy()

  expect(Navy.any().required().validate(1)).toBeTruthy()
  expect(Navy.any().required().validate('1')).toBeTruthy()
  expect(Navy.any().required().validate(true)).toBeTruthy()
  expect(Navy.any().required().validate(false)).toBeTruthy()
  expect(Navy.any().required().validate([])).toBeTruthy()
  expect(Navy.any().required().validate({})).toBeTruthy()
  expect(Navy.any().required().validate(new Date())).toBeTruthy()
})

test('Navy.any.empty', () => {
  expect(Navy.any().empty().validate()).toBeTruthy()
  expect(Navy.any().empty().validate(null)).toBeTruthy()
  expect(Navy.any().empty().validate(undefined)).toBeTruthy()
  
  expect(Navy.any().empty().validate('')).toBeFalsy()
  expect(Navy.any().empty().validate([])).toBeFalsy()
  expect(Navy.any().empty().validate({})).toBeFalsy()
  expect(Navy.any().empty().validate(1)).toBeFalsy()
  expect(Navy.any().empty().validate('1')).toBeFalsy()
  expect(Navy.any().empty().validate(true)).toBeFalsy()
  expect(Navy.any().empty().validate(false)).toBeFalsy()
  expect(Navy.any().empty().validate(new Date())).toBeFalsy()
})

test('Navy.any.equal', () => {
  expect(Navy.any().equal(1).validate(1)).toBeTruthy()
  expect(Navy.any().equal('1').validate('1')).toBeTruthy()
  expect(Navy.any().equal([]).validate([])).toBeTruthy()
  expect(Navy.any().equal(true).validate(true)).toBeTruthy()
  expect(Navy.any().equal({}).validate({})).toBeTruthy()
  expect(Navy.any().equal(NaN).validate(NaN)).toBeTruthy()

  expect(Navy.any().equal([[1], [2], [[3], [4]]]).validate([[1], [2], [[3], [4]]])).toBeTruthy()
  expect(Navy.any().equal([{ a: [1, [2]] }]).validate([{ a: [1, [2]] }])).toBeTruthy()
  expect(Navy.any().equal([{ a: { b: [{ c: [{ d: [] }] }] } }]).validate([{ a: { b: [{ c: [{ d: [] }] }] } }])).toBeTruthy()
  
  expect(Navy.any().equal({ a: '123' }).validate({ a: '123' })).toBeTruthy()
  expect(Navy.any().equal({ a: '123', b: { c: [] } }).validate({ a: '123', b: { c: [] } })).toBeTruthy()
  expect(Navy.any().equal({ a: '123', b: { c: [{ d: { e: {} } }] } }).validate({ a: '123', b: { c: [{ d: { e: {} } }] } })).toBeTruthy()
})

test('Navy.any.truthy', () => {
  expect(Navy.any().truthy().validate()).toBeFalsy()
  expect(Navy.any().truthy().validate('')).toBeFalsy()
  
  expect(Navy.any().truthy().validate([])).toBeTruthy()
  expect(Navy.any().truthy().validate(1)).toBeTruthy()
  expect(Navy.any().truthy().validate('1')).toBeTruthy()
  expect(Navy.any().truthy().validate([''])).toBeTruthy()
  expect(Navy.any().truthy().validate(true)).toBeTruthy()
  expect(Navy.any().truthy().validate({})).toBeTruthy()
  expect(Navy.any().truthy().validate(new Date())).toBeTruthy()
  expect(Navy.any().truthy().validate({ a: true })).toBeTruthy()
})

test('Navy.any.falsy', () => {
  expect(Navy.any().falsy().validate()).toBeTruthy()
  expect(Navy.any().falsy().validate('')).toBeTruthy()
  
  expect(Navy.any().falsy().validate([])).toBeFalsy()
  expect(Navy.any().falsy().validate(1)).toBeFalsy()
  expect(Navy.any().falsy().validate('1')).toBeFalsy()
  expect(Navy.any().falsy().validate([''])).toBeFalsy()
  expect(Navy.any().falsy().validate(true)).toBeFalsy()
  expect(Navy.any().falsy().validate({})).toBeFalsy()
  expect(Navy.any().falsy().validate(new Date())).toBeFalsy()
  expect(Navy.any().falsy().validate({ a: true })).toBeFalsy()
})