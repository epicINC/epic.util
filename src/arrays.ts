

class ArrayUtilityImpl {

	toDictionary<T, K extends IndexableType>(source: T[], keySelector: Func<[T], K>, result?: Dictionary<K, T>) {
		return source.reduce((r, e) => {
			r[keySelector(e)] = e
			return r
		}, result ?? Object.create(null) as Dictionary<K, T>)
	}

	toMap<T, K>(source: T[], keySelector: Func<[T], K>, result?: Map<K, T>) {
		return source.reduce((r, e) => r.set(keySelector(e), e), result ?? new Map<K, T>())
	}



}

export const Arrays = new ArrayUtilityImpl()

