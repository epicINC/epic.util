import { DateTimeParse } from './globalization/datetimeParse'



type langs = 'zh-cn'





class DateTimeUtilityImpl {

	ensure(data: string | Date) : Date {
		if (typeof(data) !== 'string') return data
		return new Date(data)
	}

	parseExact(s: string, format: string) : Date {
		return DateTimeParse.parseExact(s, format)
	}

  format(data: string | Date, format: string, lan: langs = 'zh-cn') {
    const dt = this.ensure(data)
    const local = locals[lan]
    if (local.shortSpecifier[format]) format = local.shortSpecifier[format]
    // @ts-ignore
    return format.replace(/((y+)|(M+)|(d+)|(h+)|(H+)|(m+)|(s+)|(t+)|(z+)|(f+)|(F+))/g, (substring: string, ...args: any[]) => {
      const len = substring.length
      switch (substring[0]) {
        case 'y':
          if (len > 3) return pad(dt.getFullYear(), len)
          return pad(dt.getFullYear() % 100, len)
        case 'M':
          if (len === 1) return dt.getMonth() + 1
          if (len === 2) return pad(dt.getMonth() + 1, 2)
          if (len === 3) return local.abbmonths[dt.getMonth()]
          if (len === 4) return local.months[dt.getMonth()]
        case 'd':
          if (len === 1) return dt.getDate()
          if (len === 2) return pad(dt.getDate(), 2)
          if (len === 3) return local.abbweeks[dt.getDay()]
          if (len === 4) return local.weeks[dt.getDay()]
        case 'h':
          if (len === 1) return dt.getHours() % 12
          if (len === 2) return pad(dt.getHours() % 12, 2)
        case 'H':
          if (len === 1) return dt.getHours()
          if (len === 2) return pad(dt.getHours(), 2)
        case 'm':
          if (len === 1) return dt.getMinutes()
          if (len === 2) return pad(dt.getMinutes(), 2)
        case 's':
          if (len === 1) return dt.getSeconds()
          if (len === 2) return pad(dt.getSeconds(), 2)
        case 't':
          if (len === 1) return local.abbampmdesignator[dt.getHours() > 12 ? 1 : 0]
          if (len === 2) return local.ampmdesignator[dt.getHours() > 12 ? 1 : 0]
        case 'z':
          let
            timezoneOffset = dt.getTimezoneOffset(),
            negative : string
          if (timezoneOffset > 0 )
            negative = '-'
          else {
            negative = '+'
            timezoneOffset *= -1
          }
          if (len === 1) return negative + CalcTimeoffsetHour(timezoneOffset)
          if (len === 2) return negative + pad(CalcTimeoffsetHour(timezoneOffset), 2)
          if (len === 3) return negative + pad(CalcTimeoffsetHour(timezoneOffset), 2) + ':' + pad(CalcTimeoffsetMinute(timezoneOffset % 60), 2)
        case 'f':
          if (len === 1) return Math.floor(dt.getMilliseconds() / 100)
          if (len === 2) return pad(Math.floor(dt.getMilliseconds() / 10), 2)
          if (len === 3) return pad(Math.floor(dt.getMilliseconds()), 3)
        case 'F':
          if (len === 1) return ZeroOrEmpty(dt.getMilliseconds() / 100, 1)
          if (len === 2) return ZeroOrEmpty(dt.getMilliseconds() / 10, 2)
          if (len === 3) return ZeroOrEmpty(dt.getMilliseconds(), 3)
        case 'g':
        case 'G':
            // period or era
            return ''
        default:
          break
      }
      return substring
    })
  }
}



const locals = {

	'zh-cn': {

		abbampmdesignator: ['晨', '夕'],
		ampmdesignator: ['上午', '下午'],

		abbmonths: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
		months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],

		abbweeks: ['日', '一', '二', '三', '四', '五', '六'],
		shortWeeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		year: '年',
		month: '月',
		day: '日',

		bc: '公元前',
		ad: '公元',

		shortSpecifier: {
			'd': 'yyyy/M/d',
			'D': `yyyy年M月d日`
		}
	}
}



function pad(text: number, length: number) {
	return text.toString().padStart(length, '0')
}


function CalcTimeoffsetHour(value: number) {
	return Math.floor(value / 60)
}
function CalcTimeoffsetMinute(value: number) {
	return Math.floor(value % 60)
}

function ZeroOrEmpty(value: number, length: number) {
	if (value === 0) return ''
	return pad(Math.floor(value), length)

}
/*
const StandardDateandTimeFormatSpecifier = {
	'd': 'yyyy/M/d'
}
*/

export const DateTimes = new DateTimeUtilityImpl



// const date = new Date('2021-03-04 00:00:00')
// console.log(DateTimes.format(date, 'yyyy-MM-dd HH:mm:ss'))
// console.log(DateTimes.format(date, 'D'))