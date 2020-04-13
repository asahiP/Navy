import { Navy } from '../main'

test('Navy.number.required', () => {
  expect(Navy.number().required().validateSync()).toBeFalsy()
  expect(Navy.number().required().validateSync('1')).toBeFalsy()
  expect(Navy.number().required().validateSync([])).toBeFalsy()
  expect(Navy.number().required().validateSync({})).toBeFalsy()
  expect(Navy.number().required().validateSync(true)).toBeFalsy()

  expect(Navy.number().required().validateSync(1)).toBeTruthy()
  expect(Navy.number().required().validateSync(1.1)).toBeTruthy()
  expect(Navy.number().required().validateSync(-1.1)).toBeTruthy()
})

test('Navy.number.greater', () => {
  expect(Navy.number().greater(5).validateSync(5)).toBeFalsy()
  expect(Navy.number().greater(5).validateSync(4)).toBeFalsy()

  expect(Navy.number().greater(5).validateSync(6)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.greater.bind(schema, '1')).toThrow()
  expect(schema.greater.bind(schema, [])).toThrow()
  expect(schema.greater.bind(schema, {})).toThrow()
  expect(schema.greater.bind(schema, true)).toThrow()
  expect(schema.greater.bind(schema, null)).toThrow()
  expect(schema.greater.bind(schema, undefined)).toThrow()

  schema.greater(5)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.less', () => {
  expect(Navy.number().less(5).validateSync(5)).toBeFalsy()
  expect(Navy.number().less(5).validateSync(6)).toBeFalsy()

  expect(Navy.number().less(5).validateSync(4)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.less.bind(schema, '1')).toThrow()
  expect(schema.less.bind(schema, [])).toThrow()
  expect(schema.less.bind(schema, {})).toThrow()
  expect(schema.less.bind(schema, true)).toThrow()
  expect(schema.less.bind(schema, null)).toThrow()
  expect(schema.less.bind(schema, undefined)).toThrow()

  schema.less(5)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.max', () => {
  expect(Navy.number().max(5).validateSync(6)).toBeFalsy()
  
  expect(Navy.number().max(5).validateSync(5)).toBeTruthy()
  expect(Navy.number().max(5).validateSync(4)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.max.bind(schema, '1')).toThrow()
  expect(schema.max.bind(schema, [])).toThrow()
  expect(schema.max.bind(schema, {})).toThrow()
  expect(schema.max.bind(schema, true)).toThrow()
  expect(schema.max.bind(schema, null)).toThrow()
  expect(schema.max.bind(schema, undefined)).toThrow()

  schema.max(5)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.min', () => {
  expect(Navy.number().min(5).validateSync(4)).toBeFalsy()
  
  expect(Navy.number().min(5).validateSync(6)).toBeTruthy()
  expect(Navy.number().min(5).validateSync(5)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.min.bind(schema, '1')).toThrow()
  expect(schema.min.bind(schema, [])).toThrow()
  expect(schema.min.bind(schema, {})).toThrow()
  expect(schema.min.bind(schema, true)).toThrow()
  expect(schema.min.bind(schema, null)).toThrow()
  expect(schema.min.bind(schema, undefined)).toThrow()

  schema.min(5)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.equal', () => {
  expect(Navy.number().equal(5).validateSync(4)).toBeFalsy()
  
  expect(Navy.number().equal(5).validateSync(5)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.equal.bind(schema, '1')).toThrow()
  expect(schema.equal.bind(schema, [])).toThrow()
  expect(schema.equal.bind(schema, {})).toThrow()
  expect(schema.equal.bind(schema, true)).toThrow()
  expect(schema.equal.bind(schema, null)).toThrow()
  expect(schema.equal.bind(schema, undefined)).toThrow()

  schema.equal(5)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.int', () => {
  expect(Navy.number().int().validateSync(5.1)).toBeFalsy()
  
  expect(Navy.number().int().validateSync(5)).toBeTruthy()
  expect(Navy.number().int().validateSync(-5)).toBeTruthy()

  let schema = Navy.number().int()

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.multiple', () => {
  expect(Navy.number().multiple(5).validateSync(4)).toBeFalsy()
  
  expect(Navy.number().multiple(5).validateSync(5)).toBeTruthy()
  expect(Navy.number().multiple(5).validateSync(10)).toBeTruthy()
  expect(Navy.number().multiple(5).validateSync(15)).toBeTruthy()
  expect(Navy.number().multiple(5).validateSync(-5)).toBeTruthy()

  let schema = Navy.number().multiple(5)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.divisor', () => {
  expect(Navy.number().divisor(4).validateSync(3)).toBeFalsy()
  
  expect(Navy.number().divisor(4).validateSync(4)).toBeTruthy()
  expect(Navy.number().divisor(4).validateSync(2)).toBeTruthy()
  expect(Navy.number().divisor(4).validateSync(1)).toBeTruthy()
  expect(Navy.number().divisor(4).validateSync(-4)).toBeTruthy()

  let schema = Navy.number().divisor(4)

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.positive', () => {
  expect(Navy.number().positive().validateSync(-3)).toBeFalsy()
  
  expect(Navy.number().positive().validateSync(5)).toBeTruthy()
  expect(Navy.number().positive().validateSync(5.5)).toBeTruthy()

  let schema = Navy.number().positive()

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number.negative', () => {
  expect(Navy.number().negative().validateSync(5)).toBeFalsy()
  
  expect(Navy.number().negative().validateSync(-5)).toBeTruthy()
  expect(Navy.number().negative().validateSync(-5.5)).toBeTruthy()

  let schema = Navy.number().negative()

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.number', () => {
  let schema = Navy.number()
    .int()
    .positive()
    .max(10)
    .min(0)
    .multiple(2)

  expect(schema.validateSync(2)).toBeTruthy()
  expect(schema.validateSync(4)).toBeTruthy()
  expect(schema.validateSync(6)).toBeTruthy()
  expect(schema.validateSync(8)).toBeTruthy()
  expect(schema.validateSync(10)).toBeTruthy()

  expect(schema.validateSync(11)).toBeFalsy()
  expect(schema.validateSync(1.1)).toBeFalsy()
  expect(schema.validateSync(-1)).toBeFalsy()
})