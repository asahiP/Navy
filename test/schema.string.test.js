import Navy from '../main'

test('Navy.string.required', () => {
  expect(Navy.string().required().validateSync()).toBeFalsy()
  expect(Navy.string().required().validateSync([])).toBeFalsy()
  expect(Navy.string().required().validateSync({})).toBeFalsy()
  expect(Navy.string().required().validateSync(true)).toBeFalsy()
  expect(Navy.string().required().validateSync(1)).toBeFalsy()
  
  expect(Navy.string().required().validateSync('')).toBeTruthy()
  expect(Navy.string().required().validateSync('1')).toBeTruthy()
})

test('Navy.string.regexp', () => {
  expect(Navy.string().regexp(/^\d+$/).validateSync('asdasdasd')).toBeFalsy()
  expect(Navy.string().regexp(/^\d+$/).validateSync('1231231231')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.regexp.bind(schema, '1')).toThrow()
  expect(schema.regexp.bind(schema, 1)).toThrow()
  expect(schema.regexp.bind(schema, [])).toThrow()
  expect(schema.regexp.bind(schema, {})).toThrow()
  expect(schema.regexp.bind(schema, true)).toThrow()
  expect(schema.regexp.bind(schema, null)).toThrow()
  expect(schema.regexp.bind(schema, undefined)).toThrow()

  schema.regexp(/^\d+$/)

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.includes', () => {
  expect(Navy.string().includes('123').validateSync('asdasdasd')).toBeFalsy()
  expect(Navy.string().includes('123').validateSync('1231231231')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.includes.bind(schema, /123/)).toThrow()
  expect(schema.includes.bind(schema, 1)).toThrow()
  expect(schema.includes.bind(schema, [])).toThrow()
  expect(schema.includes.bind(schema, {})).toThrow()
  expect(schema.includes.bind(schema, true)).toThrow()
  expect(schema.includes.bind(schema, null)).toThrow()
  expect(schema.includes.bind(schema, undefined)).toThrow()

  schema.includes('123')

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.equal', () => {
  expect(Navy.string().equal('123').validateSync('asdasdasd')).toBeFalsy()
  expect(Navy.string().equal('123').validateSync('123')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.equal.bind(schema, /123/)).toThrow()
  expect(schema.equal.bind(schema, 1)).toThrow()
  expect(schema.equal.bind(schema, [])).toThrow()
  expect(schema.equal.bind(schema, {})).toThrow()
  expect(schema.equal.bind(schema, true)).toThrow()
  expect(schema.equal.bind(schema, null)).toThrow()
  expect(schema.equal.bind(schema, undefined)).toThrow()

  schema.equal('123')

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.max', () => {
  expect(Navy.string().max(5).validateSync('123456')).toBeFalsy()
  expect(Navy.string().max(5).validateSync('12345')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.max.bind(schema, /123/)).toThrow()
  expect(schema.max.bind(schema, [])).toThrow()
  expect(schema.max.bind(schema, {})).toThrow()
  expect(schema.max.bind(schema, true)).toThrow()
  expect(schema.max.bind(schema, null)).toThrow()
  expect(schema.max.bind(schema, undefined)).toThrow()

  schema.max(5)

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.min', () => {
  expect(Navy.string().min(5).validateSync('1234')).toBeFalsy()
  expect(Navy.string().min(5).validateSync('12345')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.min.bind(schema, /123/)).toThrow()
  expect(schema.min.bind(schema, [])).toThrow()
  expect(schema.min.bind(schema, {})).toThrow()
  expect(schema.min.bind(schema, true)).toThrow()
  expect(schema.min.bind(schema, null)).toThrow()
  expect(schema.min.bind(schema, undefined)).toThrow()

  schema.min(5)

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.length', () => {
  expect(Navy.string().length(5).validateSync('1234')).toBeFalsy()
  expect(Navy.string().length(5).validateSync('123456')).toBeFalsy()
  expect(Navy.string().length(5).validateSync('12345')).toBeTruthy()

  let schema = Navy.string()
  expect(schema.length.bind(schema, /123/)).toThrow()
  expect(schema.length.bind(schema, [])).toThrow()
  expect(schema.length.bind(schema, {})).toThrow()
  expect(schema.length.bind(schema, true)).toThrow()
  expect(schema.length.bind(schema, null)).toThrow()
  expect(schema.length.bind(schema, undefined)).toThrow()

  schema.length(5)

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.number', () => {
  expect(Navy.string().number().validateSync('asdasd')).toBeFalsy()
  expect(Navy.string().number().validateSync('asd123')).toBeFalsy()
  expect(Navy.string().number().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().number().validateSync('12345')).toBeTruthy()

  let schema = Navy.string().number()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.alphabet', () => {
  expect(Navy.string().alphabet().validateSync('123123')).toBeFalsy()
  expect(Navy.string().alphabet().validateSync('asd123')).toBeFalsy()
  expect(Navy.string().alphabet().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().alphabet().validateSync('asdasd')).toBeTruthy()

  let schema = Navy.string().alphabet()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.alphanum', () => {
  expect(Navy.string().alphanum().validateSync('123123')).toBeFalsy()
  expect(Navy.string().alphanum().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().alphanum().validateSync('asdasd')).toBeFalsy()
  expect(Navy.string().alphanum().validateSync('asd123')).toBeTruthy()

  let schema = Navy.string().alphanum()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.URL', () => {
  expect(Navy.string().URL().validateSync('123123')).toBeFalsy()
  expect(Navy.string().URL().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().URL().validateSync('asdasd')).toBeFalsy()
  expect(Navy.string().URL().validateSync('asd123')).toBeFalsy()
  expect(Navy.string().URL().validateSync('https://github.com/asahiP/Navy')).toBeTruthy()

  let schema = Navy.string().URL()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.mail', () => {
  expect(Navy.string().mail().validateSync('123123')).toBeFalsy()
  expect(Navy.string().mail().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().mail().validateSync('asdasd')).toBeFalsy()
  expect(Navy.string().mail().validateSync('asd123')).toBeFalsy()
  expect(Navy.string().mail().validateSync('https://github.com/asahiP/Navy')).toBeFalsy()
  expect(Navy.string().mail().validateSync('asahi0749@gmail.com')).toBeTruthy()

  let schema = Navy.string().mail()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.phone', () => {
  expect(Navy.string().phone().validateSync('123123')).toBeFalsy()
  expect(Navy.string().phone().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().phone().validateSync('asdasd')).toBeFalsy()
  expect(Navy.string().phone().validateSync('asd123')).toBeFalsy()
  expect(Navy.string().phone().validateSync('https://github.com/asahiP/Navy')).toBeFalsy()
  expect(Navy.string().phone().validateSync('asahi0749@gphone.com')).toBeFalsy()
  expect(Navy.string().phone().validateSync('13200000000')).toBeTruthy()

  let schema = Navy.string().phone()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string.IDCard', () => {
  expect(Navy.string().IDCard().validateSync('123123')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('谢谢')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('asdasd')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('asd123')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('https://github.com/asahiP/Navy')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('asahi0749@gIDCard.com')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('13200000000')).toBeFalsy()
  expect(Navy.string().IDCard().validateSync('220202202002020022')).toBeTruthy()
  expect(Navy.string().IDCard().validateSync('14062319821229451X')).toBeTruthy()

  let schema = Navy.string().IDCard()

  expect(schema.validateSync(1)).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync({})).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()
})

test('Navy.string', () => {
  let schema = Navy.string()
    .alphanum()
    .max(20)
    .min(8)


  expect(schema.validateSync('12312312311')).toBeFalsy()
  expect(schema.validateSync('asdasdasdas')).toBeFalsy()
  expect(schema.validateSync('asda3211asd')).toBeTruthy()
})