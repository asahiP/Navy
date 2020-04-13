![](https://github.com/asahiP/Navy/raw/master/public/logo.png)

---

***A simple data validator for JavaScript***

## Installation

- **npm：**`npm install navy-schema`
- **yarn：**`yarn add navy-schema`

## Example

```javascript
import { Navy } from 'navy-schema'

const schema = Navy.object()
    .keys({
        username: Navy.string()
            .alphanum()
            .min(6)
            .max(18),
        password: Navy.string()
            .regexp(/^[a-z0-9_]{8, 20}$/i),
        repeat_password: Navy.ref('password'),

        access_token: Navy.array()
            .items([
                Navy.String().required(),
                Navy.number().required()
            ])
    })
	.optional({
        birthday: Navy.date().required(),
        email: Navy.string().mail()
    })

const data = {
    username: 'username001',
    password: 'password',
    repeat_password: 'password',
    
    access_token: ['access_token', 1024, 2048]
}
const another = Object.assign({
    birthday: '2020-02-02',
    email: 'example@mail.com'
}, data)

// -> true
schema.validateSync(data)

// -> true
schema.validateSync(another)

// -> false
schema.validateSync({})
```

## API

#### any.required

指定该值任意类型且不为空

#### any.empty

指定该值为 `undefined` 或 `null`

#### any.equal(ref)

指定该值与参照对象完全一致

- `ref` - `any`，参照对象

#### any.truthy

指定该值必须为 `val == true`

#### any.falsy

指定该值必须为 `val == false`

#### number.required

指定该值为 `number` 类型且不为空

#### number.greater(ref)

指定该值为 `number` 类型且大于参照对象

- `ref` - `number`，参照对象

#### number.less(ref)

指定该值为 `number` 类型且小于参照对象

- `ref` - `number`，参照对象

#### number.max(ref)

指定该值为 `number` 类型且小于等于参照对象

- `ref` - `number`，参照对象

#### number.min(ref)

指定该值为 `number` 类型且大于等于参照对象

- `ref` - `number`，参照对象

#### number.equal(ref)

指定该值为 `number` 类型且等于参照对象

- `ref` - `number`，参照对象

#### number.int

指定该值为 `number` 类型且为整数

#### number.multiple(ref)

指定该值为 `number` 类型且为参照对象的倍数

- `ref` - `number`，参照对象

#### number.divisor(ref)

指定该值为 `number` 类型且为参照对象的因数

- `ref` - `number`，参照对象

#### number.positive

指定该值为 `number` 类型且为正数

#### number.negative

指定该值为 `number` 类型且为负数

#### string.required

指定该值为 `string` 类型且不为空

#### string.regexp(ref)

指定该值为 `string` 类型且符合正则表达式

- `ref` - `RegExp`，正则表达式

#### string.includes(ref)

指定该值为 `string` 类型且包含参照对象

- `ref` - `string`，参照对象

#### string.equal(ref)

指定该值为 `string` 类型且与参照对象相等

- `ref` - `string`，参照对象

#### string.max(ref)

指定该值为 `string` 类型且字符串长度小于等于参照对象

- `ref` - `number`，参照对象

#### string.min(ref)

指定该值为 `string` 类型且字符串长度大于等于参照对象

- `ref` - `number`，参照对象

#### string.length(ref)

指定该值为 `string` 类型且字符串长度等于参照对象

- `ref` - `number`，参照对象

#### string.number

指定该值为 `string` 类型且只有数字组成

#### string.alphabet

指定该值为 `string` 类型且只有字母组成

#### string.alphanum

指定该值为 `string` 类型且只有字母和数字组成

#### string.URL

指定该值为 `string` 类型且为合法 `URL` 地址

#### string.mail

指定该值为 `string` 类型且为合法电子邮箱

#### string.phone

指定该值为 `string` 类型且符合**中华人民共和国**手机号段规则

#### string.IDCard

指定该值为 `string` 类型且符合**中华人民共和国**身份证号码验证规则

#### date.required

指定该值为 `ISOString`、`number` 或 `Date` 类型且不为空

#### date.after(ref)

指定该值为 `ISOString`、`number` 或 `Date` 类型且日期在参照对象之后

- `ref` -  `ISOString`、`number` 或 `Date` ，参照对象

#### date.before(ref)

指定该值为 `ISOString`、`number` 或 `Date` 类型且日期在参照对象之前

- `ref` -  `ISOString`、`number` 或 `Date` ，参照对象

#### date.at(ref)

指定该值为 `ISOString`、`number` 或 `Date` 类型且日期等于参照对象

- `ref` -  `ISOString`、`number` 或 `Date` ，参照对象

#### date.max(ref)

指定该值为 `ISOString`、`number` 或 `Date` 类型且日期在参照对象之前（包含参照对象）

- `ref` -  `ISOString`、`number` 或 `Date` ，参照对象

#### date.min(ref)

指定该值为 `ISOString`、`number` 或 `Date` 类型且日期在参照对象之后（包含参照对象）

- `ref` -  `ISOString`、`number` 或 `Date` ，参照对象

#### array.required

指定该值为 `array` 类型且不为空

#### array.max(ref)

指定该值为 `array` 类型且数组长度小于等于参照对象

- `ref` - `number` ，参照对象

#### array.min(ref)

指定该值为 `array` 类型且数组长度大于等于参照对象

- `ref` - `number` ，参照对象

#### array.length(ref)

指定该值为 `array` 类型且数组长度等于参照对象

- `ref` - `number` ，参照对象

#### array.items(ref)

指定该值为 `array` 类型且数组内的值符合参照数组中的任意规则

- `ref` - `schema[]` ，值为 `Navy` 实例的数组

#### array.only(ref)

指定该值为 `array` 类型且数组内的值符合参照对象规则

- `ref` - `schema` ，`Navy` 实例

#### object.required

指定该值为 `object` 类型且不为空

#### object.keys(ref)

指定该值为 `object` 类型且键值符合参照对象规则

- `ref` - `object<string, schema>` ，参照对象

```javascript
/** keys 和 optional 方法会根据调用顺序覆盖冲突的键值 */
```

#### object.optional(ref)

指定该值为 `object` 类型，该值可以为空或符合对象规则

- `ref` - `object<string, schema>` ，参照对象

```javascript
/** keys 和 optional 方法会根据调用顺序覆盖冲突的键值 */
```

#### ref(key, ancestor)

创建一个值的引用对象，其他 `Navy` 实例可以使用引用对象作为参照对象。这个方法只能在 `object` 中使用

- `key` - `string`，需要引用的键名
- `ancestor` - `number`，向父对象偏移的次数，每有一代 `object` 则偏移量加一


## License

[MIT](https://github.com/asahiP/Navy/blob/master/LICENSE)