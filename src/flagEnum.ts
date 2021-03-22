

class MapsUtilityImpl {
  static reduce<K, V, R>(map: Map<K, V>, fn: Func<[R, [V, K], number, Map<K, V>], R>, initialValue: R) {
    let i = 0
    map.forEach((v, k, map) => initialValue = fn(initialValue, [v, k], i++, map))
    return initialValue
  }
}


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

  comboObject<TEnum extends Record<string, number | string>>(enumeration: TEnum) {
    let result = this.comboMap.get(enumeration as Record<string, number>)
    if (result) return result
    result = this.valueObject(enumeration as Record<string, number>)
    
    const recursive = (map: Map<number, string[]>, check: number) => {
      return MapsUtilityImpl.reduce(map, (accumulator, [v, k]) => {
        if (check !== k && (check & k) === k) {
          accumulator.push(...v)
          if ((k & (k -1)) !== 0) accumulator.push(...recursive(map, k))
        }
        return accumulator
      }, [] as string[])
    }

    result = MapsUtilityImpl.reduce(result, (accumulator, [, k]) => {
      if ((k & (k -1)) !== 0)
        accumulator.set(k, Array.from(new Set(recursive(result, k))))
      return accumulator
    }, new Map())
    this.comboMap.set(enumeration as Record<string, number>, result)
    return result
  }


  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum): (keyof TEnum)[]
  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum, value: number): (keyof TEnum)[]
  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum, ...values: number[]) : (keyof TEnum)[][]
  keys<TEnum extends Record<string, number | string>>(enumeration: TEnum, ...values: number[]) : (keyof TEnum)[][] | (keyof TEnum)[] {
    if (!values.length) return Array.from(this.keyObject(enumeration as Record<string, number>).keys())

    const map = this.valueObject(enumeration as Record<string, number>)

    const result = values.map(e => {
      if (map.has(e)) return map.get(e)
      return MapsUtilityImpl.reduce(map, (accumulator, [v, k]) => {
        if ((e & k) === k) {
          if ((k & (k - 1)) !== 0) {
            console.log(k, this.comboObject(enumeration as Record<string, number>).get(k))
            this.comboObject(enumeration as Record<string, number>).get(k)
          } else
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

