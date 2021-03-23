

class MapsUtilityImpl {
  reduce<K, V, R>(map: Map<K, V>, fn: Func<[R, [V, K], number, Map<K, V>], R>, initialValue: R) {
    let i = 0
    map.forEach((v, k, map) => initialValue = fn(initialValue, [v, k], i++, map))
    return initialValue
  }
}


export const Maps = new MapsUtilityImpl