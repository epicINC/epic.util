import { Enumerable } from './enumerable'


class DataUtil {



	async attachWithDataSource<T, K, V>(source: T[], keySelector: Func<[T], K>, dataSource: Func<[K[]], Promise<V[]>>) : Promise<V[]>
	async attachWithDataSource<T, K, V, R>(source: T[], keySelector: Func<[T], K>, dataSource: Func<[K[]], Promise<V[]>>, resultSelector: (e: T, v: V) => R, comparer: (e: T, v: V) => boolean) : Promise<R[]>
	async attachWithDataSource<T, K, V, R>(source: T[], keySelector: Func<[T], K>, dataSource: Func<[K[]], Promise<V[]>>, resultSelector?: (e: T, v: V) => R, comparer?: (e: T, v: V) => boolean) : Promise<R[] | V[]> {
		let k = source.map(keySelector)
		if (!k.length) return []
		const v = await dataSource(k)
		if (!resultSelector && !comparer) return v
		return this.attach(source, v, resultSelector, comparer)
	}


	async attach<T, S, R>(first: T[], second: S[], resultSelector: (e: T, s: S) => R, comparer: Func<[T, S], boolean>) {
		return first.reduce((r, e) => {
			const v = second.find((s => comparer(e, s)))
			if (v) r.push(resultSelector(e, v))
			return r
		}, [])
	}


}