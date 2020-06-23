import { Reference } from './src/lib/Reference'

type Status = 'passed' | 'failed'
type Hook = (ref: any, val: any) => void
type LegalDate = string | number | Date

type AnyName = 'required' | 'empty' | 'equal' | 'truthy' | 'falsy'
type NumName = 'required' | 'greater' | 'less' | 'max' | 'min' | 'equal' | 'int' | 'multiple'| 'divisor' | 'positive' | 'negative'
type ArrName = 'required' | 'max' | 'min' | 'length' | 'items' | 'only'
type DateName = 'required' | 'after' | 'before' | 'at' | 'max' | 'min'
type ObjName = 'required' | 'keys' | 'optional'
type StrName = 'required' | 'regexp' | 'includes' | 'equal' | 'max' | 'min' | 'length' | 'number'| 'alphabet' | 'alphanum' | 'URL' | 'mail' | 'phone' | 'IDCard'

interface Schema {
  effect (status: string, name: string, hook: Function): this
  validate (val: any): boolean
}
interface SchemaMap {
  [key: string]: SchemaSubclass | Reference
}
type SchemaSubclass = SchemaAny | SchemaNum | SchemaStr | SchemaDate | SchemaArr | SchemaObj

interface SchemaAny extends Schema {
  effect (status: Status, name: AnyName, hook: Hook): this
  required (): this
  empty (): this
  equal (ref: any): this
  truthy (): this
  falsy (): this
}

interface SchemaNum extends Schema {
  effect (status: Status, name: NumName, hook: Hook): this
  required (): this
  greater (ref: number | Reference): this
  less (ref: number | Reference): this
  max (ref: number | Reference): this
  min (ref: number | Reference): this
  equal (ref: number | Reference): this
  int (): this
  multiple (ref: number | Reference): this
  divisor (ref: number | Reference): this
  positive (): this
  negative (): this
}

interface SchemaStr extends Schema {
  effect (status: Status, name: StrName, hook: Hook): this
  required (): this
  regexp (ref: RegExp | Reference): this
  includes (ref: string | Reference): this
  equal (ref: string | Reference): this
  max (ref: number | Reference): this
  min (ref: number | Reference): this
  length (ref: number | Reference): this
  number (): this
  alphabet (): this
  alphanum (): this
  URL (): this
  mail (): this
  phone (): this
  IDCard (): this
}

interface SchemaDate extends Schema {
  effect (status: Status, name: DateName, hook: Hook): this
  required (): this
  after (ref: LegalDate | Reference): this
  before (ref: LegalDate | Reference): this
  at (ref: LegalDate | Reference): this
  max (ref: LegalDate | Reference): this
  min (ref: LegalDate | Reference): this
}

interface SchemaArr extends Schema {
  effect (status: Status, name: ArrName, hook: Hook): this
  required (): this
  max (ref: number | Reference): this
  min (ref: number | Reference): this
  length (ref: number | Reference): this
  items (ref: Array<SchemaSubclass | Reference>): this
  only (ref: SchemaSubclass | Reference): this
}

interface SchemaObj extends Schema {
  effect (status: Status, name: ObjName, hook: Hook): this
  required (): this
  keys (ref: SchemaMap): this
  optional (ref: SchemaMap): this
}

declare const Navy: {
  any (): SchemaAny
  number (): SchemaNum
  string (): SchemaStr
  date (): SchemaDate
  array (): SchemaArr
  object (): SchemaObj
  ref (key: string, ancestor?: number): Reference
}

export { Navy }