import Navy from '../navy'

test('通用', () => {
  let navy = new Navy()

  navy
    .rule(['', 'required', ['', '不能为空']])
    .rule([[], 'required', ['', '不能为空']])
    .rule([{}, 'required', ['', '不能为空']])
    .rule([null, 'required', ['', '不能为空']])
    .rule([undefined, 'required', ['', '不能为空']])
    .rule(['', 'empty', ['不能为空']])
    .rule([[], 'empty', ['不能为空']])
    .rule([{}, 'empty', ['不能为空']])
    .rule([null, 'empty', ['不能为空']])
    .rule([undefined, 'empty', ['不能为空']])
    .rule([true, 'true', ['不能为空']])
    .rule([true, 'false', ['', '不能为空']])

  let results = navy.judge()

  results.forEach((result) => {
    expect(result.text).toBe('不能为空')
  })

})

test('数字', () => {
  let navy = new Navy()

  navy
    .rule([1024, 'Required number', ['成功']])
    .rule([1024, 'Number more: 1025', ['', '成功']])
    .rule([1024, 'Number less: 2048', ['成功']])
    .rule([1024, 'Number more: 1000, less: 2048', ['成功']])
    .rule([1024, 'Number equal: 1024', ['成功']])
    .rule([1024, 'Number between: 1000|2048', ['成功']])
    .rule([1024, 'Number phone: 13200000000', ['', '成功']])
    .rule([1024, 'Number int: 传参测试', ['成功']])
    .rule([1024.2048, 'Number float: 传参测试', ['成功']])
    .rule([1024, 'Number multiple: 512', ['成功']])
    .rule([1024, 'Number divisor: 2048', ['成功']])
    .rule([1024, 'Number positive: 传参测试', ['成功']])
    .rule([-1024, 'Number negative: 传参测试', ['成功']])

  let results = navy.judge()

  results.forEach((result) => {
    expect(result.text).toBe('成功')
  })
})

test('字符串', () => {
  let navy = new Navy()

  navy
    .rule(['asahip', 'Required string', ['成功']])
    .rule(['asahip', 'Required', ['成功']])
    .rule(['asahip', 'String regexp: `/asahip/`', ['成功']])
    .rule(['ASAHIP', 'String regexp: `/asahip/i`', ['成功']])
    .rule(['ASAHIP', 'String regexp: `/[a-z]{6}/i`', ['成功']])
    .rule(['ASAHIP', 'String includes: `ASAHIP`', ['成功']])
    .rule(['ASAHIP', 'String includes: `A`', ['成功']])
    .rule(['ASAHIP', 'String includes: `AHI`', ['成功']])
    .rule(['ASAHIP', 'String equal: `ASAHIP`', ['成功']])
    .rule(['ASAHIP', 'String minLen: 5', ['成功']])
    .rule(['ASAHIP', 'String minLen: 5, maxLen: 7', ['成功']])
    .rule(['ASAHIP', 'String  maxLen: 7', ['成功']])
    .rule(['ASAHIP', 'String maxLen: 7', ['成功']])
    .rule(['ASAHIP', 'String maxLen: `7|8`', ['成功']])
    .rule(['ASAHIP', 'String len: 6', ['成功']])
    .rule(['ASAHIP', 'String between: 5|6', ['成功']])
    .rule(['ASAHIP', 'String between: 5|7', ['成功']])
    .rule(['01234', 'String number: 5|7', ['成功']])
    .rule(['01234', 'String number: 传参测试', ['成功']])
    .rule(['https://www.v2ex.com/', 'String uri: 传参测试', ['成功']])
    .rule(['https://www.google.com/', 'String uri: ', ['成功']])
    .rule(['https://github.com/', 'String uri', ['成功']])
    .rule(['example@mail.com', 'String mail', ['成功']])
    .rule(['13200000000', 'String phone', ['成功']])

  let results = navy.judge()

  results.forEach((result) => {
    expect(result.text).toBe('成功')
  })
})

test('日期', () => {
  let navy = new Navy()

  navy
    .rule(['2019-09-18 00:00:00', 'Date after: `2019-09-17 00:00:00`', ['成功']])
    .rule(['2019-09-18 00:00:00', 'Date before: `2019-09-19 00:00:00`', ['成功']])
    .rule(['2019-09-18 00:00:00', 'Date after: `2019-09-17 00:00:00`, before: `2019-09-19 00:00:00`', ['成功']])
    .rule(['2019-09-18 00:00:00', 'Date between: `2019-09-17 00:00:00`|`2019-09-19 00:00:00`', ['成功']])
    .rule(['2019-09-18 00:00:00', 'Date at: `2019-09-18 00:00:00`', ['成功']])
    .rule([10242048, 'Date after: 10240000', ['成功']])
    .rule([10242048, 'Date before: 20481024', ['成功']])
    .rule([10242048, 'Date after: 10240000, before: 20481024', ['成功']])
    .rule([10242048, 'Date after: 10240000,before: 20481024 ', ['成功']])
    .rule([10242048, 'Date between: 10240000|20481024 ', ['成功']])
    .rule([10242048, 'Date at: 10242048', ['成功']])
    .rule([10242048, 'Date at: 10242048', ['成功']])

  let results = navy.judge()

  results.forEach((result) => {
    expect(result.text).toBe('成功')
  })
})

test('数组', () => {
  let navy = new Navy()

  navy
    .rule([Array(10).fill('2019-09-18 00:00:00'), ['Date after: `2019-09-17 00:00:00`'], ['成功']])
    .rule([Array(10).fill('2019-09-18 00:00:00'), ['Date before: `2019-09-19 00:00:00`'], ['成功']])
    .rule([Array(10).fill('2019-09-18 00:00:00'), ['Date after: `2019-09-17 00:00:00`, before: `2019-09-19 00:00:00`'], ['成功']])
    .rule([Array(10).fill('2019-09-18 00:00:00'), ['Date between: `2019-09-17 00:00:00`|`2019-09-19 00:00:00`'], ['成功']])
    .rule([Array(10).fill('2019-09-18 00:00:00'), ['Date at: `2019-09-18 00:00:00`'], ['成功']])
    .rule([Array(10).fill(1024), ['Number more: 512, less: 2048'], ['成功']])
    .rule([Array(10).fill('1024'), ['String number'], ['成功']])
    .rule([Array(10).fill('example@mail.com'), ['String mail'], ['成功']])
    .rule([Array(10).fill('13200000000'), ['String phone'], ['成功']])
    .rule([Array(10).fill('example@mail.com'), ['String phone'], ['', '失败']])

  let results = navy.judge()

  results.slice(0, 9).forEach((result) => {
    expect(result.text).toBe('成功')
  })
  expect(results[9].text).toBe('失败')
})

test('对象', () => {
  let navy = new Navy()
  let obj = {
    name: 'luke',
    age: 24,
    child: [
      {
        name: 'alen',
        age: 10
      },
      {
        name: 'kim',
        age: 15
      }
    ],
    contact: {
      phone: '13200000000',
      mail: 'example@mail.com'
    }
  }
  let op = {
    name: 'Required string',
    age: 'Required number',
    child: [
      {
        name: 'Required string',
        age: 'Required number'
      }
    ],
    contact: {
      phone: 'String phone',
      mail: 'String mail',
    }
  }

  navy
    .rule([obj, op, ['成功']])
    .rule([obj, { child: [ { age: 'Number more: 16' } ] }, ['', '失败']])

  let results = navy.judge()
  expect(results[0].text).toBe('成功')
  expect(results[1].text).toBe('失败')
})

test('错误', () => {
  let navy = new Navy()

  navy
    .rule([1024, 'Number equal: 5', ['', '失败']])
    .rule(['1024', 'String phone', ['成功', '失败']])
    .rule(['1024', 'String len: 5', ['成功', '失败']])
    .rule(['2019-09-18 00:00:00', 'Date after: `2019-09-18 00:00:00`', ['成功', '失败']])
    .rule([
      Array(10).fill({
        child: [
          { name: 24 }
        ]
      }),
      {
        child: [
          { name: 'Required string' }
        ]
      },
      ['成功', '失败']
    ])
    .rule([
      {
        child: [
          { age: 10 }
        ],
        contact: {
          phone: '1024',
          mail: 'example@mail.com'
        }
      },
      {
        child: [
          { age: 'Number less: 11' }
        ],
        contact: {
          phone: 'String phone',
          mail: 'String mail'
        }
      },
      ['成功', '失败']
    ])

  let results = navy.judge()

  results.forEach(result => {
    expect(result.text).toBe('失败')
  })
})