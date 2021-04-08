import { Objects } from './objects'

class StringUtilityImpl {



	toCharArray(source: string) : string[]
	toCharArray(source: string, startIndex: number, length: number) : string[]
	toCharArray(source: string, startIndex?: number, length?: number) {
		return Array.from(Objects.isNullOrUndefined(startIndex) ? source : source.substr(startIndex, length))
	}

	trimStart(source: string, ...trimChars: string[]) {
		if (!trimChars.length) return source.trimLeft()

	}


}


export const Strings = new StringUtilityImpl