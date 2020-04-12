import Navy from '../main'

test('Navy.array.required', () => {
  expect(Navy.array().required().validateSync()).toBeFalsy()
  // expect(Navy.array().required().validateSync([])).toBeFalsy()
  expect(Navy.array().required().validateSync({})).toBeFalsy()
  expect(Navy.array().required().validateSync(true)).toBeFalsy()
  expect(Navy.array().required().validateSync(null)).toBeFalsy()
  expect(Navy.array().required().validateSync(undefined)).toBeFalsy()
  expect(Navy.array().required().validateSync('asdasdad')).toBeFalsy()
  
  expect(Navy.array().required().validateSync([])).toBeTruthy()
  expect(Navy.array().required().validateSync([1])).toBeTruthy()
  expect(Navy.array().required().validateSync(['1'])).toBeTruthy()
})

test('Navy.array.max', () => {
  expect(Navy.array().max(5).validateSync([1, 2, 3, 4, 5, 6])).toBeFalsy()

  expect(Navy.array().max(5).validateSync([1, 2, 3, 4, 5])).toBeTruthy()
  expect(Navy.array().max(5).validateSync([1, 2, 3, 4])).toBeTruthy()

  let schema = Navy.array()
  expect(schema.max.bind(schema, '1')).toThrow()
  expect(schema.max.bind(schema, [])).toThrow()
  expect(schema.max.bind(schema, {})).toThrow()
  expect(schema.max.bind(schema, true)).toThrow()
  expect(schema.max.bind(schema, null)).toThrow()
  expect(schema.max.bind(schema, undefined)).toThrow()

  schema.max(5)

  expect(schema.validateSync('1')).toBeFalsy()
  // expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.array.min', () => {
  expect(Navy.array().min(5).validateSync([1, 2, 3, 4])).toBeFalsy()
  
  expect(Navy.array().min(5).validateSync([1, 2, 3, 4, 5])).toBeTruthy()
  expect(Navy.array().min(5).validateSync([1, 2, 3, 4, 5, 6])).toBeTruthy()

  let schema = Navy.array()
  expect(schema.min.bind(schema, '1')).toThrow()
  expect(schema.min.bind(schema, [])).toThrow()
  expect(schema.min.bind(schema, {})).toThrow()
  expect(schema.min.bind(schema, true)).toThrow()
  expect(schema.min.bind(schema, null)).toThrow()
  expect(schema.min.bind(schema, undefined)).toThrow()

  schema.min(5)

  expect(schema.validateSync('1')).toBeFalsy()
  // expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.array.length', () => {
  expect(Navy.array().length(5).validateSync([1, 2, 3, 4])).toBeFalsy()
  expect(Navy.array().length(5).validateSync([1, 2, 3, 4, 5, 6])).toBeFalsy()
  
  expect(Navy.array().length(5).validateSync([1, 2, 3, 4, 5])).toBeTruthy()

  let schema = Navy.array()
  expect(schema.length.bind(schema, '1')).toThrow()
  expect(schema.length.bind(schema, [])).toThrow()
  expect(schema.length.bind(schema, {})).toThrow()
  expect(schema.length.bind(schema, true)).toThrow()
  expect(schema.length.bind(schema, null)).toThrow()
  expect(schema.length.bind(schema, undefined)).toThrow()

  schema.length(5)

  expect(schema.validateSync('1')).toBeFalsy()
  // expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.array.items', () => {
  let schema = Navy.array()
  expect(schema.items.bind(schema, '1')).toThrow()
  expect(schema.items.bind(schema, [])).toThrow()
  expect(schema.items.bind(schema, {})).toThrow()
  expect(schema.items.bind(schema, true)).toThrow()
  expect(schema.items.bind(schema, null)).toThrow()
  expect(schema.items.bind(schema, undefined)).toThrow()

  schema.items([
    Navy.number().max(10).min(5),
    Navy.string().required()
  ])
  .max(5)
  .min(2)

  expect(schema.validateSync(['1'])).toBeFalsy()
  expect(schema.validateSync([4, 4])).toBeFalsy()
  expect(schema.validateSync([11, 11])).toBeFalsy()

  expect(schema.validateSync([5, 5, 5])).toBeTruthy()
  expect(schema.validateSync(['1', '1', '1'])).toBeTruthy()
  expect(schema.validateSync([5, '1', '1'])).toBeTruthy()
})

test('Navy.array.only', () => {
  let schema = Navy.array()
  expect(schema.only.bind(schema, '1')).toThrow()
  expect(schema.only.bind(schema, [])).toThrow()
  expect(schema.only.bind(schema, {})).toThrow()
  expect(schema.only.bind(schema, true)).toThrow()
  expect(schema.only.bind(schema, null)).toThrow()
  expect(schema.only.bind(schema, undefined)).toThrow()

  schema.only(Navy.number().max(10).min(5))

  expect(schema.validateSync(['1'])).toBeFalsy()
  expect(schema.validateSync([4, 4])).toBeFalsy()
  expect(schema.validateSync([11, 11])).toBeFalsy()
  expect(schema.validateSync([5, '1', '1'])).toBeFalsy()

  expect(schema.validateSync([5, 5, 5])).toBeTruthy()
})