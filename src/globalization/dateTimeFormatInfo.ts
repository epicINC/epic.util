import { Errors } from '../errors'

export enum DayOfWeek {
	/** 表示星期日 */
	Sunday = 0,
	/** 表示星期一 */
	Monday = 1,
	/** 表示星期二 */
	Tuesday = 2,
	/** 表示星期三 */
	Wednesday = 3,
	/** 表示星期四 */
	Thursday = 4,
	/** 表示星期五 */
	Friday = 5,
	/** 表示星期六 */
	Saturday = 6,
}



export class DateTimeFormatInfo {
	#isReadOnly: boolean = false
	#abbreviatedDayNames: string[]
	#dayNames: string[]
	#shortestDayNames: string[]
	#abbreviatedMonthGenitiveNames: string[]
	#abbreviatedMonthNames: string[]
	#monthNames: string[]
	#monthGenitiveNames: string[]
	#eraNames: string[]
	#amDesignator: string
	#pmDesignator: string
	#dateSeparator: string
	#timeSeparator: string
	#firstDayOfWeek: DayOfWeek

	#fullDateTimePattern: string
	#longDatePattern: string
	#longTimePattern: string
	#monthDayPattern: string
	#rfc1123Pattern: string
	#shortDatePattern: string
	#shortTimePattern: string
	#sortableDateTimePattern: string
	#universalSortableDateTimePattern: string
	#yearMonthPattern: string

	constructor(value: Partial<DateTimeFormatInfo>) {
		Object.entries(value).forEach(([k, v]) => this[`#${k}`] = v)
		Reflect.set(this, '#isReadOnly', true)
	}


	/** 是否只读 */
	get isReadOnly() : boolean {
		return this.#isReadOnly
	}

	/** 一周的第一天 */
	get firstDayOfWeek() : DayOfWeek {
		return this.#firstDayOfWeek
	}
	set firstDayOfWeek(value: DayOfWeek) {
		if (!value) Errors.ArgumentNull('firstDayOfWeek')
		if (this.isReadOnly) Errors.InvalidOperation('firstDayOfWeek')
		this.#firstDayOfWeek = value
	}

	/** 周天缩写，长度7 */
	get abbreviatedDayNames() : string[] {
		return this.#abbreviatedDayNames
	}
	set abbreviatedDayNames(value: string[]) {
		if (!value) Errors.ArgumentNull('abbreviatedDayNames')
		if (value.length !== 7) Errors.Argument('abbreviatedDayNames.length')
		if (this.isReadOnly) Errors.InvalidOperation('abbreviatedDayNames')
		this.#abbreviatedDayNames = value
	}

		/** 周缩写，长度7 */
		get dayNames() : string[] {
			return this.#dayNames
		}
		set dayNames(value: string[]) {
			if (!value) Errors.ArgumentNull('dayNames')
			if (value.length !== 7) Errors.Argument('dayNames.length')
			if (this.isReadOnly) Errors.InvalidOperation('dayNames')
			this.#dayNames = value
		}

		/** 周最简写 */
		get shortestDayNames() : string[] {
			return this.#shortestDayNames
		}
		set shortestDayNames(value: string[]) {
			if (!value) Errors.ArgumentNull('shortestDayNames')
			if (this.isReadOnly) Errors.InvalidOperation('shortestDayNames')
			this.#shortestDayNames = value
		}

	/** 月份缩写, 长度13 */
	get abbreviatedMonthGenitiveNames() : string[] {
		return this.#abbreviatedMonthGenitiveNames
	}
	set abbreviatedMonthGenitiveNames(value: string[]) {
		if (!value) Errors.ArgumentNull('abbreviatedMonthGenitiveNames')
		if (value.length !== 13) Errors.Argument('abbreviatedMonthGenitiveNames.length')
		if (this.isReadOnly) Errors.InvalidOperation('abbreviatedMonthGenitiveNames')
		this.#abbreviatedMonthGenitiveNames = value
	}
	/** 纪元名称 */
	get eraNames() : string[] {
		return this.#eraNames
	}
	set eraNames(value: string[]) {
		if (!value) Errors.ArgumentNull('eraNames')
		if (value.length !== 2) Errors.Argument('eraNames.length')
		if (this.isReadOnly) Errors.InvalidOperation('eraNames')
		this.#eraNames = value
	}
	
	/** 月份缩写 */
	get abbreviatedMonthNames() : string[] {
		return this.#abbreviatedMonthNames
	}
	set abbreviatedMonthNames(value: string[]) {
		if (!value) Errors.ArgumentNull('abbreviatedMonthNames')
		if (value.length !== 13) Errors.Argument('abbreviatedMonthNames.length')
		if (this.isReadOnly) Errors.InvalidOperation('abbreviatedMonthNames')
		this.#abbreviatedMonthNames = value
	}

	/** 月份全名 */
	get monthNames() : string[] {
		return this.#monthNames
	}
	set monthNames(value: string[]) {
		if (!value) Errors.ArgumentNull('monthNames')
		if (value.length !== 13) Errors.Argument('monthNames.length')
		if (this.isReadOnly) Errors.InvalidOperation('monthNames')
		this.#monthNames = value
	}

	/** 月日格式 */
	get monthGenitiveNames() : string[] {
		return this.#monthGenitiveNames
	}
	set monthGenitiveNames(value: string[]) {
		if (!value) Errors.ArgumentNull('monthGenitiveNames')
		if (value.length !== 13) Errors.Argument('monthNames.length')
		if (this.isReadOnly) Errors.InvalidOperation('monthGenitiveNames')
		this.#monthGenitiveNames = value
	}

	/** 上午 */
	get amDesignator() : string {
		return this.#amDesignator
	}
	set amDesignator(value: string) {
		if (!value) Errors.ArgumentNull('amDesignator')
		if (this.isReadOnly) Errors.InvalidOperation('amDesignator')
		this.#amDesignator = value
	}
	
	/** 下午 */
	get pmDesignator() : string {
		return this.#pmDesignator
	}
	set pmDesignator(value: string) {
		if (!value) Errors.ArgumentNull('pmDesignator')
		if (this.isReadOnly) Errors.InvalidOperation('pmDesignator')
		this.#pmDesignator = value
	}
	
	/** 年月日分隔符 */
	get dateSeparator() : string {
		return this.#dateSeparator
	}
	set dateSeparator(value: string) {
		if (!value) Errors.ArgumentNull('dateSeparator')
		if (this.isReadOnly) Errors.InvalidOperation('dateSeparator')
		this.#dateSeparator = value
	}
	
	/** 年月日分隔符 */
	get timeSeparator() : string {
		return this.#timeSeparator
	}
	set timeSeparator(value: string) {
		if (!value) Errors.ArgumentNull('timeSeparator')
		if (this.isReadOnly) Errors.InvalidOperation('timeSeparator')
		this.#timeSeparator = value
	}
	
	/** 长日期时间格式 */
	get fullDateTimePattern() : string {
		return this.#fullDateTimePattern
	}
	set fullDateTimePattern(value: string) {
		if (!value) Errors.ArgumentNull('fullDateTimePattern')
		if (this.isReadOnly) Errors.InvalidOperation('fullDateTimePattern')
		this.#fullDateTimePattern = value
	}

	/** 长日期格式 */
	get longDatePattern() : string {
		return this.#longDatePattern
	}
	set longDatePattern(value: string) {
		if (!value) Errors.ArgumentNull('longDatePattern')
		if (this.isReadOnly) Errors.InvalidOperation('longDatePattern')
		this.#longDatePattern = value
	}

	/** 长时间格式 */
	get longTimePattern() : string {
		return this.#longTimePattern
	}
	set longTimePattern(value: string) {
		if (!value) Errors.ArgumentNull('longTimePattern')
		if (this.isReadOnly) Errors.InvalidOperation('longTimePattern')
		this.#longTimePattern = value
	}

	/** 月日格式 */
	get monthDayPattern() : string {
		return this.#monthDayPattern
	}
	set monthDayPattern(value: string) {
		if (!value) Errors.ArgumentNull('monthDayPattern')
		if (this.isReadOnly) Errors.InvalidOperation('monthDayPattern')
		this.#monthDayPattern = value
	}

	/** (RFC) 1123 规范的时间值 */
	get rfc1123Pattern() : string {
		return this.#rfc1123Pattern
	}
	set rfc1123Pattern(value: string) {
		if (!value) Errors.ArgumentNull('rfc1123Pattern')
		if (this.isReadOnly) Errors.InvalidOperation('rfc1123Pattern')
		this.#rfc1123Pattern = value
	}

	/** 短日期 */
	get shortDatePattern() : string {
		return this.#shortDatePattern
	}
	set shortDatePattern(value: string) {
		if (!value) Errors.ArgumentNull('shortDatePattern')
		if (this.isReadOnly) Errors.InvalidOperation('shortDatePattern')
		this.#shortDatePattern = value
	}

	/** 短时间 */
	get shortTimePattern() : string {
		return this.#shortTimePattern
	}
	set shortTimePattern(value: string) {
		if (!value) Errors.ArgumentNull('shortTimePattern')
		if (this.isReadOnly) Errors.InvalidOperation('shortTimePattern')
		this.#shortTimePattern = value
	}

	/** 年份和月份值的自定义格式字符串 */
	get yearMonthPattern() : string {
		return this.#yearMonthPattern
	}
	set yearMonthPattern(value: string) {
		if (!value) Errors.ArgumentNull('yearMonthPattern')
		if (this.isReadOnly) Errors.InvalidOperation('yearMonthPattern')
		this.#yearMonthPattern = value
	}
	

	/** 可排序数据和时间值的自定义格式字符串  */
	get sortableDateTimePattern() : string {
		return this.#sortableDateTimePattern
	}

	/** ISO 8601 定义的通用的可排序日期和时间字符串的自定义格式字符串  */
	get universalSortableDateTimePattern() : string {
		return this.#universalSortableDateTimePattern
	}



	static ReadOnly(value: DateTimeFormatInfo) {
		value.#isReadOnly = true
		return value
	}

}


export const locals = {
	'zh-cn': new DateTimeFormatInfo({
		isReadOnly: true,
		abbreviatedDayNames: [],
		dayNames: [],
		shortestDayNames: [],
		abbreviatedMonthGenitiveNames: [],
		abbreviatedMonthNames: [],
		monthNames: [],
		monthGenitiveNames: [],
		eraNames: [],
		amDesignator: '',
		pmDesignator: '',
		dateSeparator: '',
		timeSeparator: '',
		firstDayOfWeek: DayOfWeek.Monday,
		fullDateTimePattern: '',
		longDatePattern: '',
		longTimePattern: '',
		monthDayPattern: '',
		rfc1123Pattern: '',
		shortDatePattern: '',
		shortTimePattern: '',
		sortableDateTimePattern: '',
		universalSortableDateTimePattern: '',
		yearMonthPattern: '',
	})
}

console.log(locals['zh-cn'].isReadOnly)
