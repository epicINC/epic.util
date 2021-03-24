import { Errors } from './errors'

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

	contains<T>(source: T[], value: T, comparer?: Func<[T, T], boolean>) {
		if (!source) Errors.ArgumentNull().throw()
		if (!comparer) return source.includes(value)
		return source.some(e => comparer(e, value))
	}

	distinct<T>(source: T[], comparer?: Func<[T, T], boolean>) {
		if (!source) Errors.ArgumentNull().throw()
		if (!comparer) return Array.from(new Set(source))
		return source.reduce((r, e) => {
			if (!this.contains(r, e, comparer)) r.push(e)
			return r
		}, [])
	}

	average<T extends number>(source: T[]) : number
	average<T>(source: T[], selector: Func<[T], number>) : number
	average<T>(source: T[], selector?: Func<[T], number>) {
		if (!source) Errors.ArgumentNull().throw()
		if (!source.length) return 0
		if (!selector) selector = e => e as unknown as number
		return this.sum(source, selector) / source.length
	}


	sum<T extends number>(source: T[]) : T
	sum<T>(source: T[], selector: Func<[T], number>) : number
	sum<T>(source: T[], selector?: Func<[T], number>) : number {
		if (!source) Errors.ArgumentNull().throw()
		if (!source.length) return 0
		if (!selector) selector = e => e as unknown as number
		return source.reduce((r, e) => r + (selector(e) ?? 0), 0)
	}

}

export const Enumerable = new EnumerableImpl()

