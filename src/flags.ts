import { Maps } from './maps'



class FlagEnumUtilityImpl {

  private keysMap = new Map<Record<string, number>, Map<string, number>>()
  private valuesMap = new Map<Record<string, number>, Map<number, string[]>>()
  private comboMap = new Map<Record<string, number>, Map<number, string[]>>()

  private keyObject<TEnum extends Record<string, number>>(enumeration: TEnum): Map<string, number> {
    if (this.keysMap.has(enumeration)) return this.keysMap.get(enumeration)
    const result = new Map(Object.entries(enumeration))
    result.forEach((v) => typeof v === 'number' && result.delete(v.toString()))
    this.keysMap.set(enumeration, result)
    return result
  }

  private valueObject<TEnum extends Record<string, number>>(enumeration: TEnum): Map<number, string[]> {
    let result = this.valuesMap.get(enumeration)
    if (result) return result
    result = new Map()
    this.keyObject(enumeration).forEach((val, key) => result.get(val)?.push(key) ?? result.set(val, [key]))
    this.valuesMap.set(enumeration, result)
    return result
  }

  private comboObject<TEnum extends Record<string, number | string>>(enumeration: TEnum) {
    let result = this.comboMap.get(enumeration as Record<string, number>)
    if (result) return result
    result = this.valueObject(enumeration as Record<string, number>)
    
    const recursive = (map: Map<number, string[]>, check: number) => {
      return Maps.reduce(map, (accumulator, [v, k]) => {
        if (check !== k && (check & k) === k) {
          accumulator.push(...v)
          if ((k & (k -1)) !== 0) accumulator.push(...recursive(map, k))
        }
        return accumulator
      }, [] as string[])
    }

    result = Maps.reduce(result, (accumulator, [, k]) => {
      if ((k & (k -1)) !== 0)
        accumulator.set(k, Array.from(new Set(recursive(result, k))))
      return accumulator
    }, new Map())
    this.comboMap.set(enumeration as Record<string, number>, result)
    return result
  }




  all<TEnum extends number = number>(src: TEnum) : boolean
  all<TEnum extends number = number>(src: TEnum, val: number) : boolean
  all<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]) : boolean
  all<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]): boolean {
    if (!values.length) return false
    if (values.length === 1) return (src & values[0]) === values[0]
    return values.every(e => (src & e) === e)
  }
  
  any<TEnum extends number = number>(src: TEnum) : boolean
  any<TEnum extends number = number>(src: TEnum, val: number) : boolean
  any<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]) : boolean
  any<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]): boolean {
    if (!values.length) return false
    if (values.length === 1) return (src & values[0]) !== 0
    return values.some(e => (src & e) !== 0)
	}


  add<TEnum extends number = number>(src: TEnum) : TEnum
  add<TEnum extends number = number>(src: TEnum, val: number) : number
  add<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]) : number
  add<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]) : number {
    if (!values.length) return src
    if (values.length === 1) return src | values[0]
    return values.reduce((accumulator, e) => accumulator | e, src)
	}

  remove<TEnum extends number = number>(src: TEnum) : TEnum
  remove<TEnum extends number = number>(src: TEnum, val: number) : number
  remove<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]) : number
	remove<TEnum extends number = number>(src: TEnum , ...values: (number | TEnum)[]) : number {
    if (!values.length) return src
    if (values.length === 1) return src & ~values[0]
    return values.reduce((accumulator, e) => accumulator & ~e, src)
	}

  reverse<TEnum extends number = number>(src: TEnum) : TEnum
  reverse<TEnum extends number = number>(src: TEnum, val: number) : number
  reverse<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]) : number
  reverse<TEnum extends number = number>(src: TEnum, ...values: (number | TEnum)[]): number {
    if (!values.length) return src
    if (values.length === 1) return src ^ values[0]
    return values.reduce((accumulator, e) => accumulator ^ e, src)
  }


  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum): (keyof TEnum)[]
  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum, value: number): (keyof TEnum)[]
  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum, ...values: number[]) : (keyof TEnum)[][]
  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum, ...values: number[]) : (keyof TEnum)[][] | (keyof TEnum)[] {
    if (!values.length) return Array.from(this.keyObject(enumeration as Record<string, number>).keys())

    const map = this.valueObject(enumeration as Record<string, number>)

    const result = values.map(e => {
      if (map.has(e)) return map.get(e)
      const removes: string[] = []
      const ret = Maps.reduce(map, (accumulator, [v, k]) => {
        if ((e & k) === k) {
          if ((k & (k - 1)) !== 0)
            removes.push(...this.comboObject(enumeration as Record<string, number>).get(k))
          v.forEach(e => accumulator.add(e))
        }
        return accumulator
      }, new Set<string>())
      if (removes.length) removes.forEach(e => ret.delete(e))
      return Array.from(ret)
    })
    return values.length === 1 ? result[0] : result
  }


}

export const FlagEnums = new FlagEnumUtilityImpl

