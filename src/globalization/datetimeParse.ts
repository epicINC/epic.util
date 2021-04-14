import { Convert } from '../convert'
import { DTString } from './dtString'


type DateTimeResult = {
	year: number
	month: number
	day: number
	hour: number
	minute: number
	second: number
	millisecond: number
}

export class DateTimeParse {


	/**
	 * 
	 * @param s 
	 * @param format 
	 * @returns 
	 * ref: https://referencesource.microsoft.com/#mscorlib/system/globalization/datetimeparse.cs,a6f76647667f9f16
	 */
	 static parseExact(s: string, format: string) : Date {
		const result: DateTimeResult = {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0, millisecond: 0}
		if (!this.doStrictParse(s, format, result)) return new Date
		return new Date(result.year, result.month && (result.month - 1), result.day, result.hour, result.minute, result.second, result.millisecond)
	}

	private static doStrictParse(s: string, format: string, result: DateTimeResult) : boolean{
	
		const sDT = new DTString(s)
		const formatDT = new DTString(format)
		while(formatDT.next()) {
			if (!this.parseByFormat(sDT, formatDT, result)) return false
		}
		return true
	}

	private static parseByFormat(s: DTString, format: DTString, result: DateTimeResult) : boolean {
		let tokenLen: number
		const start = format.index
		switch (format.current) {
			case 'y':	
				tokenLen = format.repeatCount()
				result.year = Convert.toNumber(s.value.substr(start, tokenLen))
				break
			case 'M':	
				tokenLen = format.repeatCount()
				result.month = Convert.toNumber(s.value.substr(start, tokenLen))
				break
			case 'd':	
				tokenLen = format.repeatCount()
				result.day = Convert.toNumber(s.value.substr(start, tokenLen))
				break
			case 'h':	
				tokenLen = format.repeatCount()
				result.hour = Convert.toNumber(s.value.substr(start, tokenLen))
				break
			case 'm':	
				tokenLen = format.repeatCount()
				result.minute = Convert.toNumber(s.value.substr(start, tokenLen))
				break
			case 's':	
				tokenLen = format.repeatCount()
				result.second = Convert.toNumber(s.value.substr(start, tokenLen))
				break
			case 'f':	
				tokenLen = format.repeatCount()
				result.second = Convert.toNumber(s.value.substr(start, tokenLen))
				break
		}
		return true
	}
	
}



