import { Objects } from './objects'

class StringUtilityImpl {

	readonly Whitespace = [
		'\x09',
		'\x0b',
		'\x0c',
		'\x20',
		'\xa0',
		'\xFEFF',
	].join('')

	toCharArray(source: string) : string[]
	toCharArray(source: string, startIndex: number, length: number) : string[]
	toCharArray(source: string, startIndex?: number, length?: number) {
		return Array.from(Objects.isNullOrUndefined(startIndex) ? source : source.substr(startIndex, length))
	}

	trimStart(source: string) : string
	trimStart(source: string, trimChars: string) : string
	trimStart(source: string, trimChars?: string) : string {
		if (!trimChars) return source.trimLeft()
		const set = new Set(this.toCharArray(trimChars))
		let i = 0
		for(; i < source.length; i++) {
			if (!set.has(source[i])) break
		}
		return source.slice(i)
	}

	trimEnd(source: string) : string
	trimEnd(source: string, trimChars: string) : string
	trimEnd(source: string, trimChars?: string) {
		if (!trimChars) return source.trimRight()
		const set = new Set(this.toCharArray(trimChars))

		let i = source.length
		while(i--) {
			if (!set.has(source[i])) break
		}
		return source.slice(0, i + 1)
	}


}


export const Strings = new StringUtilityImpl
