import { Navy } from '../main'

test('Navy.any.effect', () => {
  let t = 0
  Navy.any()
    .equal('123')
    .effect('passed', 'equal', () => t = 1)
    .validate('123')
  expect(t).toBe(1)
})

test('Navy.date.effect', () => {
  let t = 0
  Navy.date()
    .after(10000)
    .effect('passed', 'after', () => t = 1)
    .validate(10001)
  expect(t).toBe(1)
})

test('Navy.num.effect', () => {
  let t = 0
  Navy.number()
    .greater(100)
    .effect('passed', 'greater', () => t = 1)
    .validate(101)
  expect(t).toBe(1)
})

test('Navy.str.effect', () => {
  let t = 0
  Navy.string()
    .phone()
    .effect('passed', 'phone', () => t = 1)
    .validate('13188888888')
  expect(t).toBe(1)
})

test('Navy.arr.effect', () => {
  let t = 0
  let t2 = 0
  Navy.array()
    .length(3)
    .items([
      Navy.number().int()
        .effect('passed', 'int', () => t2 += 1)
    ])
    .effect('passed', 'length', () => t = 1)
    .validate([1, 2, 3])
  expect(t).toBe(1)
  expect(t2).toBe(3)
})

test('Navy.obj.effect', () => {
  let t = 0
  let t2 = 0
  let t3 = 0
  Navy.object()
    .keys({
      a: Navy.string()
        .equal('123')
          .effect('passed', 'equal', () => t = 1),
      b: Navy.number()
          .less(10)
            .effect('passed', 'less', () => t2 = 1)
    })
    .effect('passed', 'keys', () => t3 = 1)
    .validate({
      a: '123',
      b: 9
    })
  expect(t).toBe(1)
  expect(t2).toBe(1)
  expect(t3).toBe(1)
})

test('Navy.effect.repeatedly', () => {
  let t = 0
  let t2 = 0
  let t3 = 0

  Navy.any()
    .equal('123')
      .effect('passed', 'equal', () => t = 1)
      .effect('passed', 'equal', () => t = 2)
      .effect('passed', 'equal', () => t = 3)
    .truthy()
      .effect('passed', 'truthy', () => t2 = 1)
    .required()
      .effect('passed', 'required', () => t3 = 1)
    .validate('123')
  expect(t).toBe(3)
  expect(t2).toBe(1)
  expect(t3).toBe(1)
})

test('Navy.effect.withRef', () => {
  let t = 0

  Navy.object()
    .keys({
      a: Navy.any().equal('123'),
      b: Navy.any().equal(Navy.ref('a'))
          .effect('passed', 'equal', () => t = 1)
    })
    .validate({
      a: '123',
      b: '123'
    })
  expect(t).toBe(1)
})