![](https://github.com/asahiP/Navy/raw/master/public/logo.png)

---

<h3 style="text-align: center">A data scheme verification package</h3>
<br>

## Rules

| Class  |       Rule       |             Description              |             Example             |        Match         |
| :----: | :--------------: | :----------------------------------: | :-----------------------------: | :------------------: |
| Public | `Required[type]` |  不能为空，[type]为空则不做类型检查  | `Required` or `Required string` |      `"String"`      |
|   -    |     `Empty`      |               必须为空               |             `Empty`             |        `null`        |
|   -    |      `True`      |       必须为真，且类型为布尔值       |             `True`              |        `true`        |
|   -    |     `Flase`      |       必须为假，且类型为布尔值       |             `Flase`             |       `false`        |
| Number |      `more`      |              必须大于N               |        `Number more: 10`        |         `11`         |
|   -    |      `less`      |              必须小于N               |        `Number less: 10`        |         `9`          |
|   -    |     `equal`      |              必须等于N               |       `Number equal: 10`        |         `10`         |
|   -    |    `between`     |         必须介于min\|max之间         |     `Number between: 5|10`      |         `7`          |
|   -    |     `phone`      |         必须为合法中国手机号         |         `Number phone`          |    `13000000000`     |
|   -    |      `int`       |              必须为整数              |          `Number int`           |         `10`         |
|   -    |     `float`      |             必须为浮点数             |         `Number float`          |        `10.1`        |
|   -    |    `multiple`    |            必须为N的倍数             |      `Number multiple: 10`      |         `20`         |
|   -    |    `divisor`     |            必须为N的因数             |      `Number divisor: 10`       |         `5`          |
|   -    |    `positive`    |              必须为正数              |        `Number positive`        |         `10`         |
|   -    |    `negative`    |              必须为负数              |        `Number negative`        |        `-10`         |
| String |     `regexp`     |             必须匹配正则             |   `String regexp:  [regExp]`    |          -           |
|   -    |    `includes`    |            必须包含字符串            |   `String includes: [string]`   |          -           |
|   -    |     `equal`      |               必须相等               |    `String equal: [string]`     |          -           |
|   -    |     `minLen`     |         字符串长度必须大于N          |       `String minLen: 5`        |      `'asahip'`      |
|   -    |     `maxLen`     |         字符串长度必须小于N          |       `String maxLen: 5`        |       `'luke'`       |
|   -    |      `len`       |         字符串长度必须等于N          |         `String len: 5`         |       `asahi`        |
|   -    |    `between`     | 字符串长度必须介于minLen\|maxLen之间 |      `String between: 5|7`      |       `asahip`       |
|   -    |     `number`     |             必须为纯数字             |         `String number`         |       `'1024'`       |
|   -    |      `uri`       |            必须为合法URI             |          `String uri`           |    `'github.com'`    |
|   -    |      `mail`      |          必须为合法邮箱地址          |          `String mail`          | `'example@mail.com'` |
|   -    |     `phone`      |         必须为合法中国手机号         |         `String phone`          |   `'13000000000'`    |
|  Date  |     `after`      |           必须在指定日期后           |       `Date after: [...]`       |          -           |
|   -    |     `before`     |           必须在指定日期前           |      `Date before: [...]`       |          -           |
|   -    |    `between`     |         必须介于指定日期之间         |   `Date between: [...]|[...]`   |          -           |
|        |       `at`       |            必须在指定日期            |        `Date at: [...]`         |          -           |
| Array  |        -         |           继承上述所有规则           |                -                |          -           |
| Object |        -         |           继承上述所有规则           |                -                |          -           |

## Grammar

```javascript
 /**
  * 规则语法:
  * [数据类型][空格][规则名][:][规则参数]
  * [规则名]与[规则参数]之间用分号[:]连接
  * [规则]与[规则]之间用与运算符[,]连接
  * 所有关键字忽视大小写
  * 
  * 数字: Number [rule]: [value]
  * 字符串: String [rule]: [numberValue], [rule]: [`stringValue`], [rule]: [`regexpValue`]
  * 日期: Date [rule]: [numberValue], [rule]: [`stringValue`]
  */
```

## License

[MIT][https://github.com/asahiP/Navy/blob/master/LICENSE]