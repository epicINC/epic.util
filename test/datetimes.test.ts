import {DateTimes} from '../src'


describe('Datetime', () => {

	test('format', () => {
		// const date = new Date('2021-03-04')
	})

	test('parseExact', () => {
		const actual = DateTimes.parseExact('2021-03-04 12:13:14', 'yyyy-MM-dd hh:mm:ss')
		const expected = new Date(2021, 2, 4, 12, 13, 14)
		expect(actual).toStrictEqual(expected)
	})


})
