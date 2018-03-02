const numCPUs = require('os').cpus().length

class Parallel {

	static async for (fromInclusive, toExclusive, fn) {
		if (toExclusive <= fromInclusive) return

		let
			count = toExclusive - fromInclusive,
			step = Math.floor(count/numCPUs),
			workers = numCPUs
		if (count%numCPUs !== 0) step = step + 1
		if (count < workers) workers = count


		return Promise.all(Array.from(Array(workers).keys()).map(e => this.calcWorker(fromInclusive, toExclusive, e, step, fn) ))
	}

	static async calcWorker(fromInclusive, toExclusive, e, step, fn) {

		let start = e * step + fromInclusive, end = start + step
		if (start >= toExclusive) return
		if (end > toExclusive) end = toExclusive
		//console.log('e: %d, step: %d, {start: %d, end: %d}', e, step, start, end);
		await this.forWorker(start, end, fn)
	}

	static async forWorker(fromInclusive, toExclusive, fn) {
		for (let i = fromInclusive; i < toExclusive; i++)
			await fn(i)
	}

	static async forEach (value, fn) {
		return await this.for(0, value.length, i => fn(value[i]))
	}


	static async delay (ts = 500) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, ts);
		})
	}

}



Parallel.for(0, 10, e => {
	console.log(e);
})
return
Parallel.forEach([5, 1, 2, 3, 4, 5, 6, 7, 8, 9], e => {
	console.log(e);
})
return
module.exports = Parallel;