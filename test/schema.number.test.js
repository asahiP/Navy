import { Navy } from '../main'

test('Navy.number.required', () => {
  expect(Navy.number().required().validate()).toBeFalsy()
  expect(Navy.number().required().validate('1')).toBeFalsy()
  expect(Navy.number().required().validate([])).toBeFalsy()
  expect(Navy.number().required().validate({})).toBeFalsy()
  expect(Navy.number().required().validate(true)).toBeFalsy()

  expect(Navy.number().required().validate(1)).toBeTruthy()
  expect(Navy.number().required().validate(1.1)).toBeTruthy()
  expect(Navy.number().required().validate(-1.1)).toBeTruthy()
})

test('Navy.number.greater', () => {
  expect(Navy.number().greater(5).validate(5)).toBeFalsy()
  expect(Navy.number().greater(5).validate(4)).toBeFalsy()

  expect(Navy.number().greater(5).validate(6)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.greater.bind(schema, '1')).toThrow()
  expect(schema.greater.bind(schema, [])).toThrow()
  expect(schema.greater.bind(schema, {})).toThrow()
  expect(schema.greater.bind(schema, true)).toThrow()
  expect(schema.greater.bind(schema, null)).toThrow()
  expect(schema.greater.bind(schema, undefined)).toThrow()

  schema.greater(5)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.less', () => {
  expect(Navy.number().less(5).validate(5)).toBeFalsy()
  expect(Navy.number().less(5).validate(6)).toBeFalsy()

  expect(Navy.number().less(5).validate(4)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.less.bind(schema, '1')).toThrow()
  expect(schema.less.bind(schema, [])).toThrow()
  expect(schema.less.bind(schema, {})).toThrow()
  expect(schema.less.bind(schema, true)).toThrow()
  expect(schema.less.bind(schema, null)).toThrow()
  expect(schema.less.bind(schema, undefined)).toThrow()

  schema.less(5)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.max', () => {
  expect(Navy.number().max(5).validate(6)).toBeFalsy()
  
  expect(Navy.number().max(5).validate(5)).toBeTruthy()
  expect(Navy.number().max(5).validate(4)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.max.bind(schema, '1')).toThrow()
  expect(schema.max.bind(schema, [])).toThrow()
  expect(schema.max.bind(schema, {})).toThrow()
  expect(schema.max.bind(schema, true)).toThrow()
  expect(schema.max.bind(schema, null)).toThrow()
  expect(schema.max.bind(schema, undefined)).toThrow()

  schema.max(5)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.min', () => {
  expect(Navy.number().min(5).validate(4)).toBeFalsy()
  
  expect(Navy.number().min(5).validate(6)).toBeTruthy()
  expect(Navy.number().min(5).validate(5)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.min.bind(schema, '1')).toThrow()
  expect(schema.min.bind(schema, [])).toThrow()
  expect(schema.min.bind(schema, {})).toThrow()
  expect(schema.min.bind(schema, true)).toThrow()
  expect(schema.min.bind(schema, null)).toThrow()
  expect(schema.min.bind(schema, undefined)).toThrow()

  schema.min(5)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.equal', () => {
  expect(Navy.number().equal(5).validate(4)).toBeFalsy()
  
  expect(Navy.number().equal(5).validate(5)).toBeTruthy()

  let schema = Navy.number()
  expect(schema.equal.bind(schema, '1')).toThrow()
  expect(schema.equal.bind(schema, [])).toThrow()
  expect(schema.equal.bind(schema, {})).toThrow()
  expect(schema.equal.bind(schema, true)).toThrow()
  expect(schema.equal.bind(schema, null)).toThrow()
  expect(schema.equal.bind(schema, undefined)).toThrow()

  schema.equal(5)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.int', () => {
  expect(Navy.number().int().validate(5.1)).toBeFalsy()
  
  expect(Navy.number().int().validate(5)).toBeTruthy()
  expect(Navy.number().int().validate(-5)).toBeTruthy()

  let schema = Navy.number().int()

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.multiple', () => {
  expect(Navy.number().multiple(5).validate(4)).toBeFalsy()
  
  expect(Navy.number().multiple(5).validate(5)).toBeTruthy()
  expect(Navy.number().multiple(5).validate(10)).toBeTruthy()
  expect(Navy.number().multiple(5).validate(15)).toBeTruthy()
  expect(Navy.number().multiple(5).validate(-5)).toBeTruthy()

  let schema = Navy.number().multiple(5)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.divisor', () => {
  expect(Navy.number().divisor(4).validate(3)).toBeFalsy()
  
  expect(Navy.number().divisor(4).validate(4)).toBeTruthy()
  expect(Navy.number().divisor(4).validate(2)).toBeTruthy()
  expect(Navy.number().divisor(4).validate(1)).toBeTruthy()
  expect(Navy.number().divisor(4).validate(-4)).toBeTruthy()

  let schema = Navy.number().divisor(4)

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.positive', () => {
  expect(Navy.number().positive().validate(-3)).toBeFalsy()
  
  expect(Navy.number().positive().validate(5)).toBeTruthy()
  expect(Navy.number().positive().validate(5.5)).toBeTruthy()

  let schema = Navy.number().positive()

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number.negative', () => {
  expect(Navy.number().negative().validate(5)).toBeFalsy()
  
  expect(Navy.number().negative().validate(-5)).toBeTruthy()
  expect(Navy.number().negative().validate(-5.5)).toBeTruthy()

  let schema = Navy.number().negative()

  expect(schema.validate('1')).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.number', () => {
  let schema = Navy.number()
    .int()
    .positive()
    .max(10)
    .min(0)
    .multiple(2)

  expect(schema.validate(2)).toBeTruthy()
  expect(schema.validate(4)).toBeTruthy()
  expect(schema.validate(6)).toBeTruthy()
  expect(schema.validate(8)).toBeTruthy()
  expect(schema.validate(10)).toBeTruthy()

  expect(schema.validate(11)).toBeFalsy()
  expect(schema.validate(1.1)).toBeFalsy()
  expect(schema.validate(-1)).toBeFalsy()
})