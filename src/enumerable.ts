
import { Errors } from './errors'

export type IGrouping<K, V> = [K, V[]]
export type IEqualityComparer<T> = Func<[T, T], boolean>




interface IGroupArguments<T, K, V = T, R = T> {
	keySelector: Func<[T], K>
	elementSelector?: Func<[T], V>
	resultSelector?: Func<[K, V[]], R>
	comparer?: IEqualityComparer<K>
}


export class IEnumerable<T> {
	constructor(data: T[]) {
		this.value = data
	}
		private value: T[]

		skip(count: number) {
			return new IEnumerable(Enumerable.skip(this.value, count))
		}
}

export class EqualityComparer {
	static Default<T>() : IEqualityComparer<T> {
		return (x, y) => x === y
	}
}



class EnumerableImpl {


	repeat<T>(element: T, count: number) : T[] {
		if (count < 0) Errors.ArgumentOutOfRange('count').throw()
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

	except<T>(first: T[], second: T[], comparer: IEqualityComparer<T> = EqualityComparer.Default<T>()) {
		if (!first) Errors.ArgumentNull('first').throw()
		if (!second) Errors.ArgumentNull('second').throw()

		first.reduce((r, e) => {
			if (!this.contains(second, e, comparer)) r.push(e)
			return r
		}, [])
	}


	// groupBy<T, K>(source: T[], keySelector: Func<[T], K>) : IGrouping<T, K>
	// groupBy<T, K>(source: T[], keySelector: Func<[T], K>, comparer: IEqualityComparer<K>) : IGrouping<T, K>
	// groupBy<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>) : IGrouping<T, K>
	// groupBy<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, comparer: IEqualityComparer<K>) : IGrouping<T, K>

	// groupBy<T, K, R>(source: T[], keySelector: Func<[T], K>, resultSelector: Func<[K, T[]], R>) : R[]
	// groupBy<T, K, R>(source: T[], keySelector: Func<[T], K>, resultSelector: Func<[K, T[]], R>, comparer: IEqualityComparer<K>) : R[]
	// groupBy<T, K, V = T, R = T>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, resultSelector: Func<[K, V[]], R>) : R[]
	// groupBy<T, K, V = T, R = T>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>, resultSelector: Func<[K, V[]], R>, comparer: IEqualityComparer<K>) : R[]
	// groupBy<T, K, V = T, R = T>(source: T[], keySelector: Func<[T], K>, elementSelector?: Func<[T], V>, resultSelector?: Func<[K, V[]], R>, comparer?: IEqualityComparer<K>) : R[] {

	// groupBy<T, K>(source: T[], {keySelector} : Pick<IGroupArguments<T, K>, 'keySelector'>) : IGrouping<T, K>
	// groupBy<T, K>(source: T[], {keySelector, comparer} : Pick<IGroupArguments<T, K>, 'keySelector' | 'comparer'>) : IGrouping<T, K>
	// groupBy<T, K>(source: T[], {keySelector, elementSelector, comparer} : Pick<IGroupArguments<T, K>, 'keySelector' | 'elementSelector' | 'comparer'>) : IGrouping<T, K>

	// groupBy<T, K, R>(source: T[], {keySelector, resultSelector} : Pick<IGroupArguments<T, K, R>, 'keySelector' | 'resultSelector'>) : R[]
	// groupBy<T, K, R>(source: T[], {keySelector, resultSelector, comparer} : Pick<IGroupArguments<T, K, T, R>, 'keySelector' | 'resultSelector' | 'comparer'>) : R[]
	groupBy<T, K, V, R>(source: T[], {keySelector, elementSelector, resultSelector} : Pick<IGroupArguments<T, K, V, R>, 'keySelector' | 'elementSelector' | 'resultSelector'>) : R[]
	groupBy<T, K, V, R>(source: T[], {keySelector, elementSelector, resultSelector, comparer} : Pick<IGroupArguments<T, K, V, R>, 'keySelector' | 'elementSelector' | 'resultSelector' | 'comparer'>) : R[]
	groupBy<T, K, V, R>(source: T[], {keySelector, elementSelector, resultSelector, comparer}: IGroupArguments<T, K, V, R>) : R[] {
			// elementSelector: Func<[T], V> = v => v as unknown as V, resultSelector: Func<[K, V[]], R> = (k, v) => [k, v] as unknown as R, comparer: IEqualityComparer<K> = EqualityComparer.Default<K>()
		if (!source) Errors.ArgumentNull('source').throw()
		if  (!source.length) return []
		if (!comparer) comparer = EqualityComparer.Default<K>()
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

	min<T>(source: T[]) : T
	min<T, R>(source: T[], selector: Func<[T], R>) : R
	min<T, R>(source: T[], selector?: Func<[T], R>) : R | T {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) 0
		if (source.length === 1) source[0]
		if (!selector) return source.reduce((a, e) => a > e ? e : a, source[0])
		return source.reduce((a, e) => {
			const i = selector(e)
			return a > i ? i : a
		}, selector(source[0]))
	}

	max<T>(source: T[]) : T
	max<T, R>(source: T[], selector: Func<[T], R>) : R
	max<T, R>(source: T[], selector?: Func<[T], R>) : R | T {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) 0
		if (source.length === 1) source[0]
		if (!selector) return source.reduce((a, e) => e > a ? e : a, source[0])
		return source.reduce((a, e) => {
			const i = selector(e)
			return i > a ? i : a
		}, selector(source[0]))
	}

	orderBy<T, K>(source: T[], keySelector: Func<[T], K>) : T[]
	orderBy<T, K>(source: T[], keySelector: Func<[T], K>, comparer: Func<[K, K], number>) : T[]
	orderBy<T, K>(source: T[], keySelector?: Func<[T], K>, comparer?: Func<[K, K], number>) : T[] {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!source.length) return source
		if (!comparer) return source.sort((x, y) => keySelector(x) > keySelector(y) ? 1 : -1)
		return source.sort((x, y) => comparer(keySelector(x), keySelector(y)))
	}

	orderByDescending<T, K>(source: T[], keySelector: Func<[T], K>) : T[]
	orderByDescending<T, K>(source: T[], keySelector: Func<[T], K>, comparer: Func<[K, K], number>) : T[]
	orderByDescending<T, K>(source: T[], keySelector: Func<[T], K>, comparer?: Func<[K, K], number>) : T[] {
		return this.orderBy(source, keySelector, comparer).reverse()
	}

	range(start: number, count: number) {
		if (count < 0) Errors.ArgumentOutOfRange('count').throw()
		const result = new Array<number>(count)
		for(let i = 0; i < count; i++)
			result[i] = i + start
		return result
	}

	reverse<T>(source: T[]) {
		if (!source) Errors.ArgumentNull('source').throw()
		return source.reverse()
	}

	select<T, R>(source: T[], selector: Func<[T, number], R>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!selector) Errors.ArgumentNull('selector').throw()
		return source.map(selector)
	}

	selectMany<T, R>(source: T[], selector: Func<[T, number], R[]>) : R[]
	selectMany<T, V, R>(source: T[], collectionSelector: Func<[T, number], V[]>, resultSelector: Func<[T, V], R>) : R[]
	selectMany<T, V, R>(source: T[], collectionSelector?: Func<[T, number], V[]>, resultSelector?: Func<[T, V], R>, selector?: Func<[T, number], R[]>) : R[] {
		if (!source) Errors.ArgumentNull('source').throw()
		if (arguments.length === 2) {
			selector = collectionSelector as unknown as Func<[T, number], R[]>
			if (!selector) Errors.ArgumentNull('selector').throw()
		} else {
			if (!collectionSelector) Errors.ArgumentNull('collectionSelector').throw()
			if (!resultSelector) Errors.ArgumentNull('resultSelector').throw()
			selector = (e, i) => collectionSelector(e, i).map(k => resultSelector(e, k))
		}

		return source.reduce((r, e, i) => {
			r.push(...selector(e, i))
			return r
		}, [])
	}

	sequenceEqual<T>(first: T[], second: T[]) : boolean
	sequenceEqual<T>(first: T[], second: T[], comparer: IEqualityComparer<T>) : boolean
	sequenceEqual<T>(first: T[], second: T[], comparer: IEqualityComparer<T> = EqualityComparer.Default<T>()) : boolean {
		if (!first) Errors.ArgumentNull('first').throw()
		if (!second) Errors.ArgumentNull('second').throw()
		if (first.length !== second.length) return false
		if (first.length === 0) return true

		for(let i = 0; i < first.length; i++)
			if (!comparer(first[i], second[i])) return false
		
		return true
		
	}

	skip<T>(source: T[], count: number) {
		if (!source) Errors.ArgumentNull('source').throw()
		return source.slice(count)
	}

	skipLast<T>(source: T[], count: number) {
		if (!source) Errors.ArgumentNull('source').throw()
		return source.slice(source.length - count)
	}

	skipWhile<T>(source: T[], predicate: Func<[T, number], boolean>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!predicate) Errors.ArgumentNull('predicate').throw()
		return source.reduce((r, e, i) => {
			if (!predicate(e, i)) r.push(e)
			return r
		}, [])
	}

	take<T>(source: T[], count: number) {
		if (!source) Errors.ArgumentNull('source').throw()
		return source.slice(0, count)
	}

	takeLast<T>(source: T[], count: number) {
		if (!source) Errors.ArgumentNull('source').throw()
		return source.slice(source.length - count)
	}

	takeWhile<T>(source: T[], predicate: Func<[T, number], boolean>) {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!predicate) Errors.ArgumentNull('predicate').throw()

		const result = []
		for(let i = 0; i < source.length; i++) {
			if (!predicate(source[i], i)) break
			result.push(source[i])
		}
		return result
	}

	thenBy() {
		throw new Error()
	}

	thenByDescending() {
		throw new Error()
	}

	toDictionary<T, K>(source: T[], keySelector: Func<[T], K>) : Map<K, T>
	toDictionary<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector: Func<[T], V>) : Map<K, V>
	toDictionary<T, K, V>(source: T[], keySelector: Func<[T], K>, elementSelector?: Func<[T], V>) : Map<K, V> {
		if (!source) Errors.ArgumentNull('source').throw()
		if (!keySelector) Errors.ArgumentNull('keySelector').throw()
		if (arguments.length === 2)
		elementSelector = e => e as unknown as V
		else
			if (!elementSelector) Errors.ArgumentNull('elementSelector').throw()
		let k: K
		return source.reduce((r, e) => {
			k = keySelector(e)
			if (k === null || k === undefined) Errors.ArgumentNull('keySelector').throw()
			if (r.has(k)) Errors.Argument('keySelector').throw()
			r.set(k, elementSelector(e))
			return r
		}, new Map())
	}

	union<T>(first: T[], second: T[]) : T[]
	union<T>(first: T[], second: T[], comparer: IEqualityComparer<T>) : T[]
	union<T>(first: T[], second: T[], comparer?: IEqualityComparer<T>) : T[] {
		if (!first) Errors.ArgumentNull('first').throw()
		if (!second) Errors.ArgumentNull('second').throw()
		if (!comparer) return Array.from(new Set([...first, ...second]))

		const fn: Func<[T[], T], T[]> = (r, e) => {
			if (!Enumerable.contains(r, e, comparer)) r.push(e)
			return r
		}
		const result = first.reduce(fn, [])
		return second.reduce(fn, result)
	}

	zip<T, S>(first: T[], second: S[]) : (T | S)[]
	zip<T, S, R>(first: T[], second: S[], resultSelector: Func<[T, S], R>) : R[]
	zip<T, S, R>(first: T[], second: S[], resultSelector?: Func<[T, S], R>) : R[] | (T | S)[] {
		if (!first) Errors.ArgumentNull('first').throw()
		if (!second) Errors.ArgumentNull('second').throw()
		if (arguments.length === 2)
			resultSelector = (x, y) => ({...x, ...y}) as unknown as R
		else
			if (!resultSelector) Errors.ArgumentNull('resultSelector').throw()
		
		return first.reduce((r, e, i) => {
			if (i < second.length) r.push(resultSelector(e, second[i]))
			return r
		}, [])
		
	}

	intersect<T>(first: T[], second: T[], comparer?: IEqualityComparer<T>) : T[] {
		if (!first) Errors.ArgumentNull('first').throw()
		if (!second) Errors.ArgumentNull('second').throw()

		return first.reduce((r, e) => {
			if (Enumerable.contains(second, e, comparer)) r.push(e)
			return r
		}, [])
	}
}


export const Enumerable = new EnumerableImpl()


// console.log(actual, )
// console.log(actual, expected)