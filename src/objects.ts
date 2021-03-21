
class ObjectUtilityImpl {


  pick<T, K extends keyof T>(data: T, ...keys: K[]): Pick<T, K> {
    return this.picker<T, K>(...keys)(data)
  }

  picker<T, K extends keyof T = keyof T>(...keys: K[]) {
    return (val: T)  =>
      keys.reduce((result, key) => {
        if (key in val) result[key] = val[key]
        return result
      }, {} as Pick<T, K>)
  }


  omit<T, K extends keyof any>(data: T, ...keys: K[]): Omit<T, K> {
    return this.omiter<T, K>(...keys)(data)
  }

  omiter<T, K extends keyof any = keyof any>(...keys: K[]) {
    return (val: T)  =>
    Object['fromEntries'](Object.entries(val).filter(([key]) => !keys.includes(key as K))) as Omit<T, K>
  }


}

export const Objects = new ObjectUtilityImpl()

