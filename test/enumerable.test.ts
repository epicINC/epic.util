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
		const actual = Enumerable.groupBy(pets, {
			keySelector: pet => Math.floor(pet.age),
			elementSelector: pet => pet.age,
			resultSelector: (baseAge, ages) => ({key: baseAge, count: ages.length, min: Enumerable.min(ages), max: Enumerable.max(ages)})
		}
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


describe('Enumerable toDictionary ', () => {

	test('with keySelector', () => {
		const packages = [ 
			{ company: "Coho Vineyard", weight: 25.2, trackingNumber: 89453312 },
			{ company: "Lucerne Publishing", weight: 18.7, trackingNumber: 89112755 },
			{ company: "Wingtip Toys", weight: 6.0, trackingNumber: 299456122 },
			{ company: "Adventure Works", weight: 33.8, trackingNumber: 4665518773 }
		 ]
		
		const actual = Enumerable.toDictionary(
			packages,
			e => e.trackingNumber
		)
		const expected = [ 89453312, 89112755, 299456122, 4665518773 ]
		expect(Array.from(actual.keys())).toStrictEqual(expect.arrayContaining(expected))
	})
})




describe('Enumerable union ', () => {

	test('normal', () => {
		const ints1 = [ 5, 3, 9, 7, 5, 9, 3, 7 ]
		const ints2 = [ 8, 3, 6, 4, 4, 9, 1, 0 ]
		const actual = Enumerable.union(ints1, ints2);
		
		const expected = [ 5, 3, 9, 7, 8, 6, 4, 1, 0 ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})

	test('with comparer', () => {
		const store1 = [ { name: "apple", code: 9 }, { name: "orange", code: 4 } ]
		const store2 = [ { name: "apple", code: 9 }, { name: "lemon", code: 12 } ]
		const actual = Enumerable.union(store1, store2, (x, y) => x.code === y.code && x.name === y.name)
		
		const expected = [
			{ name: 'apple', code: 9 },
			{ name: 'orange', code: 4 },
			{ name: 'lemon', code: 12 }
		]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})
})


describe('Enumerable zip ', () => {
	test('with resultSelector', () => {
		const numbers = [ 1, 2, 3, 4 ]
		const words = [ 'one', 'two', 'three' ]
		const actual = Enumerable.zip(numbers, words, (first, second) => first + ' ' + second);

		const expected = [ '1 one', '2 two', '3 three' ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})
})



describe('Enumerable intersect ', () => {

	test('normal', () => {
		const ints1 = [ 44, 26, 92, 30, 71, 38 ]
		const ints2 = [ 39, 59, 83, 47, 26, 4, 30 ]
		const actual = Enumerable.intersect(ints1, ints2)
		
		const expected = [ 26, 30 ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})

	test('with comparer', () => {
		const store1 = [ { name: "apple", code: 9 }, { name: "orange", code: 4 } ]
		const store2 = [ { name: "apple", code: 9 }, { name: "lemon", code: 12 } ]
		const actual = Enumerable.intersect(store1, store2, (x, y) => x.code === y.code && x.name === y.name)
		
		const expected = [ { name: 'apple', code: 9 } ]
		expect(actual).toStrictEqual(expect.arrayContaining(expected))
	})
})
