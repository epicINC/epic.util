
import { Errors } from './errors'

export type IGrouping<K, V> = [K, V[]]
export type IEqualityComparer<T> = Func<[T, T], boolean>

interface IGroupArguments<T, K, V, R> {
	keySelector: Func<[T], K>
	elementSelector?: Func<[T], V>
	resultSelector?: Func<[K, V[]], R>
	comparer?: IEqualityComparer<K>
}


class EnumerableImpl {


	repeat<T>(element: T, count: number) : T[] {
		if (count < 0) Errors.ArgumentOutOfRange().throw()
		const result = new Array<T>(count)
		for(let i = 0; i < count; i++)
			result.push(element)
		return result
	}

	concat<T>(first: T[], second: T[]) : T[] {
		return [...first, ...second]
	}

	contains<T>(source: T[], value: T, comparer?: IEqualityComparer<T>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!comparer) return source.includes(value)
		return source.some(e => comparer(e, value))
	}

	count<T>(source: T[], predicate?: Func<[T], boolean>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!predicate) return source.length
		return source.reduce((r, e) => predicate(e) ? r++ : r, 0)
	}

	empty<T>() {
		return new Array<T>()
	}

	except<T>(first: T[], second: T[], comparer: IEqualityComparer<T> = (x, y) => x === y) {
		if (!first) Errors.ArgumentNull('first').throw()
		if (!second) Errors.ArgumentNull('second').throw()

		first.reduce((r, e) => {
			if (!this.contains(second, e, comparer)) r.push(e)
			return r
		}, [])
	}


	
	// groupBy<T, K>(source: T[], keySelector: Func<[T], K>) : IGrouping<K, T>[] 
	// groupBy<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>) : IGrouping<K, V>[] 
	// groupBy<T, K, R>(source: T[], keySelector: Func<[T], K>, resultSelector: Func<[K, T[]], R>, comparer: IEqualityComparer<T>) : R[] 
	// groupBy<T, K, V, R>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, comparer: IEqualityComparer<T>) : R[] 
	// groupBy<T, K, V, R>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, resultSelector: Func<[K, V[]], R>) : R[] 
	// groupBy<T, K, V, R>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, resultSelector: Func<[K, V[]], R>,  comparer: IEqualityComparer<T>) : R[] 

	// groupBy<T, K>(source: T[], keySelector: Func<[T], K>) : IGrouping<T, K>
	// groupBy<T, K>(source: T[], keySelector: Func<[T], K>, comparer: IEqualityComparer<K>) : IGrouping<T, K>
	// groupBy<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>) : IGrouping<T, K>
	// groupBy<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, comparer: IEqualityComparer<K>) : IGrouping<T, K>
	// groupBy<T, K, R>(source: T[], keySelector: Func<[T], K>, resultSelector: Func<[K, T[]], R>) : R[]
	// groupBy<T, K, R>(source: T[], keySelector: Func<[T], K>, resultSelector: Func<[K, T[]], R>, comparer: IEqualityComparer<K>) : R[]
	// groupBy<T, K, V, R>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, resultSelector: Func<[K, V[]], R>) : R[]
	// groupBy<T, K, V, R>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, resultSelector: Func<[K, V[]], R>, comparer: IEqualityComparer<K>) : R[]
	// groupBy<T, K, V, R>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V> = v => v as unknown as V, resultSelector: Func<[K, V[]], R> = (k, v) => [k, v] as unknown as R, comparer: IEqualityComparer<K> = (x, y) => x === y) : R[] {
		groupBy<T, K, V, R>(source: T[], {keySelector}: IGroupArguments<T, K, V, R>) : R[]
		groupBy<T, K, V, R>(source: T[], {keySelector, elementSelector, resultSelector, comparer}: IGroupArguments<T, K, V, R>) : R[] {
		if (!source) Errors.ArgumentNull('source').throw()
		if  (!source.length) return []
		return source.reduce((a, e) => {
			const k = keySelector(e)
			let i = a.find(([ik]) => comparer(ik, k))
			if (!i) a.push(i = [k, []])
			i[1].push(elementSelector(e))
			return a
		}, []).map(([k, v]) => (resultSelector(k, v)))
	}


	/**
	 * 
	 * @param source 
	 * @param comparer 
	 * @returns 
	 * @description new Map([Entry])
	 */
	distinct<T>(source: T[], comparer?: IEqualityComparer<T>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!comparer) return Array.from(new Set(source))
		return source.reduce((r, e) => {
			if (!this.contains(r, e, comparer)) r.push(e)
			return r
		}, [])
	}

	average<T extends number>(source: T[]) : number
	average<T>(source: T[], selector: Func<[T], number>) : number
	average<T>(source: T[], selector?: Func<[T], number>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) return 0
		if (!selector) selector = e => e as unknown as number
		return this.sum(source, selector) / source.length
	}


	sum<T extends number>(source: T[]) : T
	sum<T>(source: T[], selector: Func<[T], number>) : number
	sum<T>(source: T[], selector?: Func<[T], number>) : number {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) return 0
		if (!selector) selector = e => e as unknown as number
		return source.reduce((r, e) => r + (selector(e) ?? 0), 0)
	}

	min<T>(source: T[]) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) 0
		if (source.length === 1) source[0]
		return source.reduce((a, e) => a > e ? e : a, source[0])
	}

	max<T>(source: T[]) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) 0
		if (source.length === 1) source[0]
		return source.reduce((a, e) => e > a ? e : a, source[0])
	}
}

export const Enumerable = new EnumerableImpl()

const pets = [
	{ name: "Barley", age: 8.3 },
	{ name: "Boots", age: 4.9 },
	{ name: "Whiskers", age: 1.5 },
	{ name: "Daisy", age: 4.3 } 
]
		const actual = Enumerable.groupBy(pets, 
			pet => Math.floor(pet.age),
			pet => pet.age,
			(baseAge, ages) => ({key: baseAge, count: ages.length, min: Enumerable.min(ages), max: Enumerable.max(ages)})
		)


	console.log(actual)