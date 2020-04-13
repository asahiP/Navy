import { Navy } from '../main'

test('Navy.date.required', () => {
  expect(Navy.date().required().validateSync()).toBeFalsy()
  expect(Navy.date().required().validateSync([])).toBeFalsy()
  expect(Navy.date().required().validateSync({})).toBeFalsy()
  expect(Navy.date().required().validateSync(true)).toBeFalsy()
  expect(Navy.date().required().validateSync(null)).toBeFalsy()
  expect(Navy.date().required().validateSync(undefined)).toBeFalsy()
  expect(Navy.date().required().validateSync('asdasdad')).toBeFalsy()
  
  expect(Navy.date().required().validateSync('2020-02-02')).toBeTruthy()
  expect(Navy.date().required().validateSync(20200202)).toBeTruthy()
  expect(Navy.date().required().validateSync(new Date())).toBeTruthy()
})

test('Navy.date.after', () => {
  expect(Navy.date().after('2020-02-02').validateSync('2020-02-02')).toBeFalsy()
  expect(Navy.date().after('2020-02-02').validateSync('2020-02-01')).toBeFalsy()
  expect(Navy.date().after('2020-02-02').validateSync('2020-02-03')).toBeTruthy()
  expect(Navy.date().after(20200202).validateSync(20200202)).toBeFalsy()
  expect(Navy.date().after(20200202).validateSync(20200201)).toBeFalsy()
  expect(Navy.date().after(20200202).validateSync(20200203)).toBeTruthy()
  expect(Navy.date().after(new Date('2020-02-02')).validateSync(new Date('2020-02-03'))).toBeTruthy()

  let schema = Navy.date()
  expect(schema.after.bind(schema, [])).toThrow()
  expect(schema.after.bind(schema, {})).toThrow()
  expect(schema.after.bind(schema, true)).toThrow()
  expect(schema.after.bind(schema, null)).toThrow()
  expect(schema.after.bind(schema, undefined)).toThrow()

  schema.after('2020-02-02')

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.date.before', () => {
  expect(Navy.date().before('2020-02-02').validateSync('2020-02-02')).toBeFalsy()
  expect(Navy.date().before('2020-02-02').validateSync('2020-02-03')).toBeFalsy()
  expect(Navy.date().before('2020-02-02').validateSync('2020-02-01')).toBeTruthy()
  expect(Navy.date().before(20200202).validateSync(20200202)).toBeFalsy()
  expect(Navy.date().before(20200202).validateSync(20200203)).toBeFalsy()
  expect(Navy.date().before(20200202).validateSync(20200201)).toBeTruthy()
  expect(Navy.date().before(new Date('2020-02-02')).validateSync(new Date('2020-02-03'))).toBeFalsy()

  let schema = Navy.date()
  expect(schema.before.bind(schema, [])).toThrow()
  expect(schema.before.bind(schema, {})).toThrow()
  expect(schema.before.bind(schema, true)).toThrow()
  expect(schema.before.bind(schema, null)).toThrow()
  expect(schema.before.bind(schema, undefined)).toThrow()

  schema.before('2020-02-02')

  // expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.date.at', () => {
  expect(Navy.date().at('2020-02-02').validateSync('2020-02-03')).toBeFalsy()
  expect(Navy.date().at('2020-02-02').validateSync('2020-02-01')).toBeFalsy()
  expect(Navy.date().at('2020-02-02').validateSync('2020-02-02')).toBeTruthy()
  expect(Navy.date().at(20200202).validateSync(20200203)).toBeFalsy()
  expect(Navy.date().at(20200202).validateSync(20200201)).toBeFalsy()
  expect(Navy.date().at(20200202).validateSync(20200202)).toBeTruthy()
  expect(Navy.date().at(new Date('2020-02-02')).validateSync(new Date('2020-02-02'))).toBeTruthy()

  let schema = Navy.date()
  expect(schema.at.bind(schema, [])).toThrow()
  expect(schema.at.bind(schema, {})).toThrow()
  expect(schema.at.bind(schema, true)).toThrow()
  expect(schema.at.bind(schema, null)).toThrow()
  expect(schema.at.bind(schema, undefined)).toThrow()

  schema.at('2020-02-02')

  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.date.max', () => {
  expect(Navy.date().max('2020-02-02').validateSync('2020-02-03')).toBeFalsy()
  expect(Navy.date().max('2020-02-02').validateSync('2020-02-01')).toBeTruthy()
  expect(Navy.date().max('2020-02-02').validateSync('2020-02-02')).toBeTruthy()
  expect(Navy.date().max(20200202).validateSync(20200203)).toBeFalsy()
  expect(Navy.date().max(20200202).validateSync(20200201)).toBeTruthy()
  expect(Navy.date().max(20200202).validateSync(20200202)).toBeTruthy()
  expect(Navy.date().max(new Date('2020-02-02')).validateSync(new Date('2020-02-02'))).toBeTruthy()

  let schema = Navy.date()
  expect(schema.max.bind(schema, [])).toThrow()
  expect(schema.max.bind(schema, {})).toThrow()
  expect(schema.max.bind(schema, true)).toThrow()
  expect(schema.max.bind(schema, null)).toThrow()
  expect(schema.max.bind(schema, undefined)).toThrow()

  schema.max('2020-02-02')

  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.date.min', () => {
  expect(Navy.date().min('2020-02-02').validateSync('2020-02-01')).toBeFalsy()
  expect(Navy.date().min('2020-02-02').validateSync('2020-02-03')).toBeTruthy()
  expect(Navy.date().min('2020-02-02').validateSync('2020-02-02')).toBeTruthy()
  expect(Navy.date().min(20200202).validateSync(20200201)).toBeFalsy()
  expect(Navy.date().min(20200202).validateSync(20200203)).toBeTruthy()
  expect(Navy.date().min(20200202).validateSync(20200202)).toBeTruthy()
  expect(Navy.date().min(new Date('2020-02-02')).validateSync(new Date('2020-02-02'))).toBeTruthy()

  let schema = Navy.date()
  expect(schema.min.bind(schema, [])).toThrow()
  expect(schema.min.bind(schema, {})).toThrow()
  expect(schema.min.bind(schema, true)).toThrow()
  expect(schema.min.bind(schema, null)).toThrow()
  expect(schema.min.bind(schema, undefined)).toThrow()

  schema.min('2020-02-02')

  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})