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


describe('Enumerable selectMany ', () => {
	test('', () => {
		const petOwners =
		[ { name: 'Higa, Sidney', pets: ['Scruffy', 'Sam']},
			{ name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar']},
			{ name: 'Price, Vernette', pets: ['Scratches', 'Diesel']},
			{ name: 'Hines, Patrick', pets: ['Dusty']}
		]
		const actual = Enumerable.selectMany(petOwners,
			e => e.pets,
			(e, k) => ({petOwner: e, petName: k})
		)
		.filter(e => e.petName.startsWith('S'))
		.map(e => ({owner: e.petOwner.name, pet: e.petName}))

		const expected = [
			{ owner: 'Higa, Sidney', pet: 'Scruffy' },
			{ owner: 'Higa, Sidney', pet: 'Sam' },
			{ owner: 'Ashkenazi, Ronen', pet: 'Sugar' },
			{ owner: 'Price, Vernette', pet: 'Scratches' }
		]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))

	})

})

describe('Enumerable skip ', () => {

	test('skip', () => {
		const grades = [ 59, 82, 70, 56, 92, 98, 85 ]
		const actual = Enumerable.skip(Enumerable.orderByDescending(grades, e => e), 3)
		const expected = [ 82, 70, 59, 56 ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})
	
})



describe('Enumerable skipWhile ', () => {

	test('skipWhile', () => {
		const grades = [ 59, 82, 70, 56, 92, 98, 85 ]
		const actual = Enumerable.skipWhile(Enumerable.orderByDescending(grades, e => e), e => e >= 80)
		const expected = [ 70, 59, 56 ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})


	test('skipWhile width index', () => {
		const amounts = [ 5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500 ]
		const actual = Enumerable.skipWhile(amounts, (e, i) => e > i * 1000)
		const expected = [ 4000, 1500, 5500 ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})
	
})





describe('Enumerable skipWhile ', () => {

	test('takeWhile', () => {
		const fruits = [ "apple", "banana", "mango", "orange", "passionfruit", "grape" ]
		const actual = Enumerable.takeWhile(fruits, e => "orange" !== e)
		const expected = [ 'apple', 'banana', 'mango' ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})


	test('takeWhile width index', () => {
		const fruits = [ "apple", "passionfruit", "banana", "mango", "orange", "blueberry", "grape", "strawberry" ]
		const actual = Enumerable.takeWhile(fruits, (e, i) => e.length >= i)
		const expected = [ 'apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry' ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})
	
})

