import { Navy } from '../main'

test('Navy.any.required', () => {
  expect(Navy.any().required().validateSync()).toBeFalsy()
  expect(Navy.any().required().validateSync(null)).toBeFalsy()
  expect(Navy.any().required().validateSync(undefined)).toBeFalsy()

  expect(Navy.any().required().validateSync(1)).toBeTruthy()
  expect(Navy.any().required().validateSync('1')).toBeTruthy()
  expect(Navy.any().required().validateSync(true)).toBeTruthy()
  expect(Navy.any().required().validateSync(false)).toBeTruthy()
  expect(Navy.any().required().validateSync([])).toBeTruthy()
  expect(Navy.any().required().validateSync({})).toBeTruthy()
  expect(Navy.any().required().validateSync(new Date())).toBeTruthy()
})

test('Navy.any.empty', () => {
  expect(Navy.any().empty().validateSync()).toBeTruthy()
  expect(Navy.any().empty().validateSync(null)).toBeTruthy()
  expect(Navy.any().empty().validateSync(undefined)).toBeTruthy()
  
  expect(Navy.any().empty().validateSync('')).toBeFalsy()
  expect(Navy.any().empty().validateSync([])).toBeFalsy()
  expect(Navy.any().empty().validateSync({})).toBeFalsy()
  expect(Navy.any().empty().validateSync(1)).toBeFalsy()
  expect(Navy.any().empty().validateSync('1')).toBeFalsy()
  expect(Navy.any().empty().validateSync(true)).toBeFalsy()
  expect(Navy.any().empty().validateSync(false)).toBeFalsy()
  expect(Navy.any().empty().validateSync(new Date())).toBeFalsy()
})

test('Navy.any.equal', () => {
  expect(Navy.any().equal(1).validateSync(1)).toBeTruthy()
  expect(Navy.any().equal('1').validateSync('1')).toBeTruthy()
  expect(Navy.any().equal([]).validateSync([])).toBeTruthy()
  expect(Navy.any().equal(true).validateSync(true)).toBeTruthy()
  expect(Navy.any().equal({}).validateSync({})).toBeTruthy()
  expect(Navy.any().equal(NaN).validateSync(NaN)).toBeTruthy()

  expect(Navy.any().equal([[1], [2], [[3], [4]]]).validateSync([[1], [2], [[3], [4]]])).toBeTruthy()
  expect(Navy.any().equal([{ a: [1, [2]] }]).validateSync([{ a: [1, [2]] }])).toBeTruthy()
  expect(Navy.any().equal([{ a: { b: [{ c: [{ d: [] }] }] } }]).validateSync([{ a: { b: [{ c: [{ d: [] }] }] } }])).toBeTruthy()
  
  expect(Navy.any().equal({ a: '123' }).validateSync({ a: '123' })).toBeTruthy()
  expect(Navy.any().equal({ a: '123', b: { c: [] } }).validateSync({ a: '123', b: { c: [] } })).toBeTruthy()
  expect(Navy.any().equal({ a: '123', b: { c: [{ d: { e: {} } }] } }).validateSync({ a: '123', b: { c: [{ d: { e: {} } }] } })).toBeTruthy()
})

test('Navy.any.truthy', () => {
  expect(Navy.any().truthy().validateSync()).toBeFalsy()
  expect(Navy.any().truthy().validateSync('')).toBeFalsy()
  
  expect(Navy.any().truthy().validateSync([])).toBeTruthy()
  expect(Navy.any().truthy().validateSync(1)).toBeTruthy()
  expect(Navy.any().truthy().validateSync('1')).toBeTruthy()
  expect(Navy.any().truthy().validateSync([''])).toBeTruthy()
  expect(Navy.any().truthy().validateSync(true)).toBeTruthy()
  expect(Navy.any().truthy().validateSync({})).toBeTruthy()
  expect(Navy.any().truthy().validateSync(new Date())).toBeTruthy()
  expect(Navy.any().truthy().validateSync({ a: true })).toBeTruthy()
})

test('Navy.any.falsy', () => {
  expect(Navy.any().falsy().validateSync()).toBeTruthy()
  expect(Navy.any().falsy().validateSync('')).toBeTruthy()
  
  expect(Navy.any().falsy().validateSync([])).toBeFalsy()
  expect(Navy.any().falsy().validateSync(1)).toBeFalsy()
  expect(Navy.any().falsy().validateSync('1')).toBeFalsy()
  expect(Navy.any().falsy().validateSync([''])).toBeFalsy()
  expect(Navy.any().falsy().validateSync(true)).toBeFalsy()
  expect(Navy.any().falsy().validateSync({})).toBeFalsy()
  expect(Navy.any().falsy().validateSync(new Date())).toBeFalsy()
  expect(Navy.any().falsy().validateSync({ a: true })).toBeFalsy()
})