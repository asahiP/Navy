import { Navy } from '../main'

test('Navy.string.required', () => {
  expect(Navy.string().required().validate()).toBeFalsy()
  expect(Navy.string().required().validate([])).toBeFalsy()
  expect(Navy.string().required().validate({})).toBeFalsy()
  expect(Navy.string().required().validate(true)).toBeFalsy()
  expect(Navy.string().required().validate(1)).toBeFalsy()
  
  expect(Navy.string().required().validate('')).toBeTruthy()
  expect(Navy.string().required().validate('1')).toBeTruthy()
})

test('Navy.string.regexp', () => {
  expect(Navy.string().regexp(/^\d+$/).validate('asdasdasd')).toBeFalsy()
  expect(Navy.string().regexp(/^\d+$/).validate('1231231231')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.regexp.bind(schema, '1')).toThrow()
  expect(schema.regexp.bind(schema, 1)).toThrow()
  expect(schema.regexp.bind(schema, [])).toThrow()
  expect(schema.regexp.bind(schema, {})).toThrow()
  expect(schema.regexp.bind(schema, true)).toThrow()
  expect(schema.regexp.bind(schema, null)).toThrow()
  expect(schema.regexp.bind(schema, undefined)).toThrow()

  schema.regexp(/^\d+$/)

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.includes', () => {
  expect(Navy.string().includes('123').validate('asdasdasd')).toBeFalsy()
  expect(Navy.string().includes('123').validate('1231231231')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.includes.bind(schema, /123/)).toThrow()
  expect(schema.includes.bind(schema, 1)).toThrow()
  expect(schema.includes.bind(schema, [])).toThrow()
  expect(schema.includes.bind(schema, {})).toThrow()
  expect(schema.includes.bind(schema, true)).toThrow()
  expect(schema.includes.bind(schema, null)).toThrow()
  expect(schema.includes.bind(schema, undefined)).toThrow()

  schema.includes('123')

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.equal', () => {
  expect(Navy.string().equal('123').validate('asdasdasd')).toBeFalsy()
  expect(Navy.string().equal('123').validate('123')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.equal.bind(schema, /123/)).toThrow()
  expect(schema.equal.bind(schema, 1)).toThrow()
  expect(schema.equal.bind(schema, [])).toThrow()
  expect(schema.equal.bind(schema, {})).toThrow()
  expect(schema.equal.bind(schema, true)).toThrow()
  expect(schema.equal.bind(schema, null)).toThrow()
  expect(schema.equal.bind(schema, undefined)).toThrow()

  schema.equal('123')

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.max', () => {
  expect(Navy.string().max(5).validate('123456')).toBeFalsy()
  expect(Navy.string().max(5).validate('12345')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.max.bind(schema, /123/)).toThrow()
  expect(schema.max.bind(schema, [])).toThrow()
  expect(schema.max.bind(schema, {})).toThrow()
  expect(schema.max.bind(schema, true)).toThrow()
  expect(schema.max.bind(schema, null)).toThrow()
  expect(schema.max.bind(schema, undefined)).toThrow()

  schema.max(5)

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.min', () => {
  expect(Navy.string().min(5).validate('1234')).toBeFalsy()
  expect(Navy.string().min(5).validate('12345')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.min.bind(schema, /123/)).toThrow()
  expect(schema.min.bind(schema, [])).toThrow()
  expect(schema.min.bind(schema, {})).toThrow()
  expect(schema.min.bind(schema, true)).toThrow()
  expect(schema.min.bind(schema, null)).toThrow()
  expect(schema.min.bind(schema, undefined)).toThrow()

  schema.min(5)

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.length', () => {
  expect(Navy.string().length(5).validate('1234')).toBeFalsy()
  expect(Navy.string().length(5).validate('123456')).toBeFalsy()
  expect(Navy.string().length(5).validate('12345')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.length.bind(schema, /123/)).toThrow()
  expect(schema.length.bind(schema, [])).toThrow()
  expect(schema.length.bind(schema, {})).toThrow()
  expect(schema.length.bind(schema, true)).toThrow()
  expect(schema.length.bind(schema, null)).toThrow()
  expect(schema.length.bind(schema, undefined)).toThrow()

  schema.length(5)

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.number', () => {
  expect(Navy.string().number().validate('asdasd')).toBeFalsy()
  expect(Navy.string().number().validate('asd123')).toBeFalsy()
  expect(Navy.string().number().validate('谢谢')).toBeFalsy()
  expect(Navy.string().number().validate('12345')).toBeTruthy()

  let schema = Navy.string().number()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.alphabet', () => {
  expect(Navy.string().alphabet().validate('123123')).toBeFalsy()
  expect(Navy.string().alphabet().validate('asd123')).toBeFalsy()
  expect(Navy.string().alphabet().validate('谢谢')).toBeFalsy()
  expect(Navy.string().alphabet().validate('asdasd')).toBeTruthy()

  let schema = Navy.string().alphabet()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.alphanum', () => {
  expect(Navy.string().alphanum().validate('123123')).toBeFalsy()
  expect(Navy.string().alphanum().validate('谢谢')).toBeFalsy()
  expect(Navy.string().alphanum().validate('asdasd')).toBeFalsy()
  expect(Navy.string().alphanum().validate('asd123')).toBeTruthy()

  let schema = Navy.string().alphanum()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.URL', () => {
  expect(Navy.string().URL().validate('123123')).toBeFalsy()
  expect(Navy.string().URL().validate('谢谢')).toBeFalsy()
  expect(Navy.string().URL().validate('asdasd')).toBeFalsy()
  expect(Navy.string().URL().validate('asd123')).toBeFalsy()
  expect(Navy.string().URL().validate('https://github.com/asahiP/Navy')).toBeTruthy()

  let schema = Navy.string().URL()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.mail', () => {
  expect(Navy.string().mail().validate('123123')).toBeFalsy()
  expect(Navy.string().mail().validate('谢谢')).toBeFalsy()
  expect(Navy.string().mail().validate('asdasd')).toBeFalsy()
  expect(Navy.string().mail().validate('asd123')).toBeFalsy()
  expect(Navy.string().mail().validate('https://github.com/asahiP/Navy')).toBeFalsy()
  expect(Navy.string().mail().validate('example@mail.com')).toBeTruthy()

  let schema = Navy.string().mail()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.phone', () => {
  expect(Navy.string().phone().validate('123123')).toBeFalsy()
  expect(Navy.string().phone().validate('谢谢')).toBeFalsy()
  expect(Navy.string().phone().validate('asdasd')).toBeFalsy()
  expect(Navy.string().phone().validate('asd123')).toBeFalsy()
  expect(Navy.string().phone().validate('https://github.com/asahiP/Navy')).toBeFalsy()
  expect(Navy.string().phone().validate('example@mail.com')).toBeFalsy()
  expect(Navy.string().phone().validate('13200000000')).toBeTruthy()

  let schema = Navy.string().phone()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string.IDCard', () => {
  expect(Navy.string().IDCard().validate('123123')).toBeFalsy()
  expect(Navy.string().IDCard().validate('谢谢')).toBeFalsy()
  expect(Navy.string().IDCard().validate('asdasd')).toBeFalsy()
  expect(Navy.string().IDCard().validate('asd123')).toBeFalsy()
  expect(Navy.string().IDCard().validate('https://github.com/asahiP/Navy')).toBeFalsy()
  expect(Navy.string().IDCard().validate('example@mail.com')).toBeFalsy()
  expect(Navy.string().IDCard().validate('13200000000')).toBeFalsy()
  expect(Navy.string().IDCard().validate('220202202002020022')).toBeTruthy()
  expect(Navy.string().IDCard().validate('14062319821229451X')).toBeTruthy()

  let schema = Navy.string().IDCard()

  expect(schema.validate(1)).toBeFalsy()
  expect(schema.validate([])).toBeFalsy()
  expect(schema.validate({})).toBeFalsy()
  expect(schema.validate(true)).toBeFalsy()
  expect(schema.validate(null)).toBeFalsy()
  expect(schema.validate(undefined)).toBeFalsy()
})

test('Navy.string', () => {
  let schema = Navy.string()
    .alphanum()
    .max(20)
    .min(8)


  expect(schema.validate('12312312311')).toBeFalsy()
  expect(schema.validate('asdasdasdas')).toBeFalsy()
  expect(schema.validate('asda3211asd')).toBeTruthy()
})