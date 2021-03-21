

class MapsUtilityImpl {
  static reduce<K, V, R>(map: Map<K, V>, fn: Func<[R, [V, K], number, Map<K, V>], R>, initialValue: R) {
    let i = 0
    map.forEach((v, k, map) => initialValue = fn(initialValue, [v, k], i++, map))
    return initialValue
  }
}


class FlagEnumUtilityImpl {

  private keysMap = new Map<Record<string, number>, Map<string,  number>>()
  private valuesMap = new Map<Record<string, number>, Map<number, string[]>>()
  private comboMap = new Map<Record<string, number>, Map<number, string[]>>()

  private keyObject<TEnum extends Record<string, number>>(enumeration: TEnum) : Map<string, number> {
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

  private comboObject<TEnum extends Record<string, number>>(enumeration: TEnum) {
    let result = this.comboMap.get(enumeration)
    if (!result) return result
    return MapsUtilityImpl.reduce(this.valueObject(enumeration), (accumulator, [v, k]) => {
      if (k % 2 === 1) {
        
      }
      return accumulator
    }, new Map())
    

  }


  keys<TEnum extends Record<string, number>>(enumeration: TEnum): (keyof TEnum)[]
  keys<TEnum extends Record<string, number>>(enumeration: TEnum, value: number): (keyof TEnum)[]
  keys<TEnum extends Record<string, number>>(enumeration: TEnum, ...values: number[]) : (keyof TEnum)[][]
  keys<TEnum extends Record<string, number>>(enumeration: TEnum, ...values: number[]) : (keyof TEnum)[][] | (keyof TEnum)[] {
    if (!values.length) return Array.from(this.keyObject(enumeration).keys())

    const map = this.valueObject(enumeration)
    const result = values.map(e => {
      return MapsUtilityImpl.reduce(map, (accumulator, [v, k]) => {
        if ((e & k) === k) {
          if (k % 2 === 1)
          accumulator.push(...v)
        }
        return accumulator
      }, [])
    })
    return values.length === 1 ? result[0] : result
  }




	all<TEnum extends number = number>(src: TEnum, dest: number) : boolean {
		return (src & dest) === dest
  }
  
  any(src: number, dest: number) : boolean {
		return (src & dest) !== 0
	}

	add(src: number , val: number) : number {
		return src | val
	}

	remove(src: number , val: number) : number {
		return src & ~val
	}

	reverse(src: number, val: number) : number {
		return src ^ val
  }



}

export const FlagEnums = new FlagEnumUtilityImpl
