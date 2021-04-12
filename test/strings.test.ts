import { Strings } from '../src'


describe('Strings toCharArray', () => {

	test('without param', () => {
		const actual = Strings.toCharArray('1234')
		const expected = [ '1', '2', '3', '4' ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})


	test('with param', () => {
		const actual = Strings.toCharArray('1234', 2, 1)
		const expected = ['3' ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})

})



describe('Strings trimStart', () => {

	test('without trimStart#1', () => {
		const actual = Strings.trimStart('1234')
		const expected = '1234'
		expect(actual).toStrictEqual(expected)
	})

	test('without trimStart#2', () => {
		const actual = Strings.trimStart(` 	
		1234`)
		const expected = '1234'
		expect(actual).toStrictEqual(expected)
	})

	test('with trimStart#1', () => {
		const actual = Strings.trimStart('1234', '0')
		const expected = '1234'
		expect(actual).toStrictEqual(expected)
	})


	test('with trimStart#2', () => {
		const actual = Strings.trimStart('1234', '21')
		const expected = '34'
		expect(actual).toStrictEqual(expected)
	})

})



describe('Strings trimEnd', () => {

	test('without trimEnd#1', () => {
		const actual = Strings.trimEnd('1234')
		const expected = '1234'
		expect(actual).toStrictEqual(expected)
	})

	test('without trimEnd#2', () => {
		const actual = Strings.trimEnd(`1234 	
		`)
		const expected = '1234'
		expect(actual).toStrictEqual(expected)
	})

	test('with trimEnd#1', () => {
		const actual = Strings.trimEnd('1234', '0')
		const expected = '1234'
		expect(actual).toStrictEqual(expected)
	})


	test('with trimEnd#2', () => {
		const actual = Strings.trimEnd('1234', '43')
		const expected = '12'
		expect(actual).toStrictEqual(expected)
	})

})