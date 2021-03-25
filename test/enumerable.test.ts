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



describe('Enumerable groupBy', () => {
	const pets = [
		{ name: "Barley", age: 8.3 },
		{ name: "Boots", age: 4.9 },
		{ name: "Whiskers", age: 1.5 },
		{ name: "Daisy", age: 4.3 } 
	]
	

	test('groupBy', () => {
		const actual = Enumerable.groupBy(pets, 
			pet => Math.floor(pet.age),
			pet => pet.age,
			(baseAge, ages) => ({key: baseAge, count: ages.length, min: Enumerable.min(ages), max: Enumerable.max(ages)})
		)

		const expected = [
			{ key: 8, count: 1, min: 8.3, max: 8.3 },
			{ key: 4, count: 2, min: 4.3, max: 4.9 },
			{ key: 1, count: 1, min: 1.5, max: 1.5 }
		]

		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})



})