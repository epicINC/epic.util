import { Enumerable } from '../src'


const tests = {
	numbers: [1, 2, 3],
	numbersWithFalsy: [1, 2, null, 3],
	objects: [{a: 1}, {a: 2}, {a: 3}],
	objectsWithFalsy: [{a: 1}, {a: 2}, null, {a: 3}]
}


describe('Enumerable sum', () => {

	test('number', () => {
		expect(Enumerable.sum(tests.numbers)).toBe(6)
	})


	test('number falsy', () => {
		expect(Enumerable.sum(tests.numbersWithFalsy)).toBe(6)
	})


	test('object', () => {
		expect(Enumerable.sum(tests.objects, e => e?.a)).toBe(6)
	})


	test('object falsy', () => {
		expect(Enumerable.sum(tests.objectsWithFalsy, e => e?.a)).toBe(6)
	})

})