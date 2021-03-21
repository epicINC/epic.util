
class EnumUtilityImpl {

  private keysMap = new Map<Record<string, number | string>, Map<string,  string | number>>()
  private valuesMap = new Map<Record<string, number|string>, Map<string | number, string[]>>()


	all<TEnum extends Record<string, string | number>>(enumeration: TEnum, ...values: (string | number)[]) : boolean {
    const result = this.valueObject(enumeration)
    return values.every(e => result.has(e))
  }
  
  any<TEnum extends Record<string, string | number>>(enumeration: TEnum, ...values: (string | number)[]) : boolean {
    const result = this.valueObject(enumeration)
    return values.some(e => result.has(e))
	}

  private keyObject<TEnum extends Record<string, string | number>>(enumeration: TEnum) : Map<string, string | number> {
    if (this.keysMap.has(enumeration)) return this.keysMap.get(enumeration) as Map<string, string | number>
    const result = new Map(Object.entries(enumeration))
    result.forEach((v) => { typeof v === 'number' && result.delete(v.toString()) })
    this.keysMap.set(enumeration, result)
    return result
  }

  private valueObject<TEnum extends Record<string, string | number>>(enumeration: TEnum): Map<string | number, (keyof TEnum)[]> {
    let result = this.valuesMap.get(enumeration)
    if (result) return result
    result = new Map()
    this.keyObject(enumeration).forEach((val, key) => {
      if (result.has(val))
        result.get(val).push(key)
      else
        result.set(val, [key])
    })

    this.valuesMap.set(enumeration, result)
    return result
  }

  keys<TEnum extends Record<string, string | number>, >(enumeration: TEnum, ...values: (string | number)[]) : (keyof TEnum)[] {
    if (!values.length) return Array.from(this.keyObject(enumeration).keys())
    const result = this.valueObject(enumeration)
    return values.flatMap(e => result.get(e) ?? [])
  }
  

  values<TEnum extends Record<string, string | number>>(enumeration: TEnum, ...keys: string[]): (string | number)[] {
    const result = this.keyObject(enumeration)
    if (!keys.length) return Array.from(result.values())
    return keys.reduce((acc, e) => {
      if (result.has(e)) acc.push(result.get(e))
      return acc
    }, [])
  }



}

export const Enums = new EnumUtilityImpl



// console.log('flags enum test:')
// console.log('keyObject', EnumOperator.keyObject(TestEnum1))
// console.log('keys', EnumOperator.keys(TestEnum1, TestEnum1.Insert | TestEnum1.Update))
// console.log('keys', EnumOperator.keys(TestEnum1, TestEnum1.Test))
// console.log('allKeys', EnumOperator.allKeys(TestEnum1, TestEnum1.Insert | TestEnum1.Update))
// console.log('allValues', EnumOperator.allValues(TestEnum1, TestEnum1.Insert | TestEnum1.Update))

// enum TestEnum2 {
//   Insert = '1',
//   Update = '1',
//   Delete = 'tDelete',
//   Modify = 'tModify'
// }

// console.log('text enum test:')
// console.log(EnumOperator.keys(TestEnum2, TestEnum2.Insert))
// console.log(EnumOperator.allKeys(TestEnum2, TestEnum2.Update))
// console.log(EnumOperator.allValues(TestEnum2, TestEnum2.Modify))


//  enum InvoiceBaseType {
// 	Common = 1 << 0,	// 普通
// 	Special = 1 << 1,	// 专票
// 	Paper = 1 << 2,		// 纸质
//   Electronic = 1 << 3,		// 电子

// 	Detail = 1 << 4,		// 是否带详情
//   Manual = 1 << 5     // 是否手工开票
// }
//  enum InvoiceType {

// 	PaperCommon = InvoiceBaseType.Paper | InvoiceBaseType.Common,		// 普通纸质 5
// 	PaperSpecial = InvoiceBaseType.Paper | InvoiceBaseType.Special,		// 专票纸质 6
// 	ECommon = InvoiceBaseType.Electronic | InvoiceBaseType.Common,		// 普通电子 9
// 	// ESpecial = InvoiceBaseType.Electronic | InvoiceBaseType.Special,		// 专票电子
// }

// console.log(EnumOperator.keys(InvoiceType, 38))


