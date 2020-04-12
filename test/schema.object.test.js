import Navy from '../main'

test('Navy.object.required', () => {
  expect(Navy.object().required().validateSync()).toBeFalsy()
  expect(Navy.object().required().validateSync([])).toBeFalsy()
  expect(Navy.object().required().validateSync(true)).toBeFalsy()
  expect(Navy.object().required().validateSync(null)).toBeFalsy()
  expect(Navy.object().required().validateSync(undefined)).toBeFalsy()
  expect(Navy.object().required().validateSync('asdasdad')).toBeFalsy()
  expect(Navy.object().required().validateSync(1)).toBeFalsy()
  
  expect(Navy.object().required().validateSync({})).toBeTruthy()
})

test('Navy.object.keys', () => {
  let schema = Navy.object()
  expect(schema.keys.bind(schema, '1')).toThrow()
  expect(schema.keys.bind(schema, [])).toThrow()
  expect(schema.keys.bind(schema, true)).toThrow()
  expect(schema.keys.bind(schema, null)).toThrow()
  expect(schema.keys.bind(schema, undefined)).toThrow()

  schema.keys({
    a: Navy.number().required(),
    b: Navy.string().required(),
    c: Navy.any().required()
  })

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()

  expect(schema.validateSync({ a: 123, b: '123', c: {} })).toBeTruthy()
})

test('Navy.object.optional', () => {
  let schema = Navy.object()
  expect(schema.optional.bind(schema, '1')).toThrow()
  expect(schema.optional.bind(schema, [])).toThrow()
  expect(schema.optional.bind(schema, true)).toThrow()
  expect(schema.optional.bind(schema, null)).toThrow()
  expect(schema.optional.bind(schema, undefined)).toThrow()

  schema.optional({
    a: Navy.number().required(),
    b: Navy.string().required(),
    c: Navy.any().required()
  })

  expect(schema.validateSync('1')).toBeFalsy()
  expect(schema.validateSync([])).toBeFalsy()
  expect(schema.validateSync(true)).toBeFalsy()
  expect(schema.validateSync(null)).toBeFalsy()
  expect(schema.validateSync(undefined)).toBeFalsy()

  expect(schema.validateSync({ a: 123, b: '123', c: {} })).toBeTruthy()
  expect(schema.validateSync({ a: 123 })).toBeTruthy()
  expect(schema.validateSync({ b: '123'})).toBeTruthy()
  expect(schema.validateSync({ c: {} })).toBeTruthy()
  expect(schema.validateSync({ a: 123, b: '123' })).toBeTruthy()
  expect(schema.validateSync({ b: '123', c: {} })).toBeTruthy()
  expect(schema.validateSync({ a: 123, c: {} })).toBeTruthy()
})

test('Navy.object', () => {
  let schema = Navy.object()
  
  schema.keys({
    name: Navy.string().alphabet(),
    age: Navy.number().int().max(200).min(1),
    birthday: Navy.date().required(),

    username: Navy.string().alphanum().min(8).max(20),
    password: Navy.string().alphanum().min(8).max(20),
    repeatpass: Navy.ref('password'),
  })
  .optional({
    sex: Navy.string().required()
  })

  let date = {
    name: 'Luke',
    age: 20,
    birthday: '2020-02-02',

    username: 'username1',
    password: 'password1',
    repeatpass: 'password1'
  }

  expect(schema.validateSync(date)).toBeTruthy()
  expect(schema.validateSync(Object.assign(date, {
    sex: 'man'
  }))).toBeTruthy()

  schema.optional({
    birthday: Navy.date().required()
  })

  expect(schema.validateSync({
    name: 'Luke',
    age: 20,

    username: 'username1',
    password: 'password1',
    repeatpass: 'password1'
  })).toBeTruthy()
})

test('Navy.ref', () => {
  let schema = Navy.object()
  
  schema.keys({
    a: Navy.number().max(20).min(10),
    b: Navy.string().length(Navy.ref('a')),

    c: Navy.number().less(Navy.ref('a')),
    d: Navy.date().required(),

    e: Navy.date().after(Navy.ref('d')),
    
    f: Navy.ref('a'),
    g: Navy.array().only(Navy.ref('f')),
    h: {
      i: Navy.array().items([Navy.ref('f', 1)]),
      j: {
        k: Navy.ref('g', 2),
        l: Navy.array().only(Navy.number().less(Navy.ref('c', 2))),
        m: Navy.array().items([Navy.number().less(Navy.ref('c', 2))]),
        n: Navy.array().items([Navy.array().items([Navy.number().less(Navy.ref('c', 2))])]),
        o: Navy.object().keys({
          p: Navy.array().only(Navy.object().keys({
            q: Navy.ref('a', 4)
          }))
        }),
        r: {
          s: Navy.array().only(Navy.object().keys({
            t: Navy.ref('a', 4)
          }))
        },
        w: Navy.ref('h.j.o.p', 3)
      },
      v: Navy.ref('j.r.s')
    },
    u: Navy.ref('h.j.o.p')
  })

  expect(schema.validateSync({
    a: 10,
    b: '1234567890',

    c: 9,
    d: '2020-02-02',

    e: '2020-02-03',

    f: 10,
    g: [10, 10, 10, 10],
    h: {
      i: [10, 10, 10, 10],
      j: {
        k: [10, 10, 10, 10],
        l: [8, 8, 8, 8],
        m: [8, 8, 8, 8],
        n: [[8], [8], [8]],
        o: {
          p: [{
            q:10
          }]
        },
        r: {
          s: [{
            t:10
          }]
        },
        w: [{
          q:10
        }]
      },
      v: [{
        t:10
      }]
    },
    u: [{
      q:10
    }]
  })).toBeTruthy()
})
