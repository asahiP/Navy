const MSG_PARAM_NOT = (str: TemplateStringsArray) => `参数值必须为 ${str[0]} 类型或者 Navy.ref`
const MSG_REF_NOT = (str: TemplateStringsArray) => `Navy.ref 的值必须为 ${str[0]}`

const MSG_PARAM_NOT_NUM = MSG_PARAM_NOT`Number`
const MSG_REF_NOT_NUM = MSG_REF_NOT`Number`

const MSG_PARAM_NOT_REGEXP = MSG_PARAM_NOT`Regexp`
const MSG_REF_NOT_REGEXP = MSG_REF_NOT`Regexp`

const MSG_PARAM_NOT_STR = MSG_PARAM_NOT`String`
const MSG_REF_NOT_STR = MSG_REF_NOT`String`

const MSG_PARAM_NOT_DATE = MSG_PARAM_NOT`Number、ISOString、Date`
const MSG_REF_NOT_DATE = MSG_REF_NOT`Number、ISOString、Date`

const MSG_PARAM_NOT_ARR = '参数值必须为 Array 类型'

const MSG_NOT_NAVY_ARR = '参数值必须为一个包含 Navy instance 的 Array'
const MSG_NOT_NAVY_OBJ = '参数值必须为一个类型为 { [key: string]: Navy instance } 的 Object'

const MSG_PARAM_NOT_OBJ = MSG_PARAM_NOT`Object`

const MSG_OBJ_ONLY = '你只能在 Navy.object 中使用 Navy.ref'
const MSG_REF_ONCE = 'Navy.ref 的值不能为另一个 Navy.ref'

export {
  MSG_PARAM_NOT_NUM, MSG_REF_NOT_NUM,
  MSG_PARAM_NOT_REGEXP, MSG_REF_NOT_REGEXP,
  MSG_PARAM_NOT_STR, MSG_REF_NOT_STR,
  MSG_PARAM_NOT_DATE, MSG_REF_NOT_DATE,
  MSG_PARAM_NOT_ARR,
  MSG_NOT_NAVY_ARR, MSG_NOT_NAVY_OBJ,
  MSG_PARAM_NOT_OBJ,
  MSG_OBJ_ONLY, MSG_REF_ONCE
}