declare namespace Interface {
  interface Rule {
    call: Function
    name: string
    ref: any
    hasRef: boolean
    val: any
  }
  
  interface Reference {
    key: string
    ancestor: number
  }
  
  type Navy_instance = Schema_ANY | Schema_NUM | Schema_STR | Schema_DATE | Schema_ARR | Schema_OBJ | Reference
  
  interface Schema {
    validate (data: any): Promise<Rule[]>
    validateSync (data: any): boolean
  }
  
  interface Schema_ANY extends Schema {
    required (): this
    empty (): this
    equal (ref: any): this
    truthy (): this
    falsy (): this
  }
  
  interface Schema_NUM extends Schema {
    required (): this
    greater (ref: number | Reference): this
    less (ref: number | Reference): this
    max (ref: number | Reference): this
    min (ref: number | Reference): this
    equal (ref: number | Reference): this
    int (ref: number | Reference): this
    multiple (ref: number | Reference): this
    divisor (ref: number | Reference): this
    positive (): this
    negative (): this
  }
  
  interface Schema_STR extends Schema {
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
  
  type legalDate = string | number | Date
  
  interface Schema_DATE extends Schema {
    required (): this
    after (ref: legalDate | Reference): this
    before (ref: legalDate | Reference): this
    at (ref: legalDate | Reference): this
    max (ref: legalDate | Reference): this
    min (ref: legalDate | Reference): this
  }
  
  interface Schema_ARR extends Schema {
    required (): this
    max (ref: number | Reference): this
    min (ref: number | Reference): this
    length (ref: number | Reference): this
    items (ref: Navy_instance[]): this
    only (ref: Navy_instance): this
  }
  
  interface Schema_OBJ_Rule {
    [key: string]: Navy_instance
  }
  
  interface Schema_OBJ extends Schema {
    required (): this
    keys (ref: Schema_OBJ_Rule): this
    optional (ref: Schema_OBJ_Rule): this
  }
}

declare const Navy: {
  any (): Interface.Schema_ANY
  number (): Interface.Schema_NUM
  string (): Interface.Schema_STR
  date (): Interface.Schema_DATE
  array (): Interface.Schema_ARR
  object (): Interface.Schema_OBJ
  ref (key: string, ancestor?: number): Interface.Reference
}

export { Navy }