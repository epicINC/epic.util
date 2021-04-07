
class ObjectUtilityImpl {


  pick<T, K extends keyof T>(data: T, keys: K[]): Pick<T, K> {
    return this.picker<T, K>(keys)(data)
  }

  picker<T, K extends keyof T>(keys: K[]) : Func<[T], Pick<T, K>> {
    return (data: T)  => Object.fromEntries(keys.map(e => [e, data[e]])) as Pick<T, K>
  }


  omit<T, K extends keyof any>(data: T, ...keys: K[]): Omit<T, K> {
    return this.omiter<T, K>(...keys)(data)
  }

  omiter<T, K extends keyof any = keyof any>(...keys: K[]) : Func<[T], Omit<T, K>> {
    return (val: T)  =>  Object.fromEntries(Object.entries(val).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>
  }


}

export const Objects = new ObjectUtilityImpl()

