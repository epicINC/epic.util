const numCPUs = require('os').cpus().length

class Parallel {

	static async for (fromInclusive, toExclusive, fn) {
		if (toExclusive <= fromInclusive) return

		let
			count = toExclusive - fromInclusive,
			step = Math.floor(count / this.options.workers),
			workers = this.options.workers
		if (count % this.options.workers !== 0) step = step + 1
		if (count < workers) workers = count

		return Promise.all(Array.from(Array(workers).keys()).map(e => this.calcWorker(fromInclusive, toExclusive, e * step, fn) ))
	}

	static async calcWorker(fromInclusive, toExclusive, step, fn) {
		let
			start = step + fromInclusive,
			end = start + step
		if (start >= toExclusive) return
		if (end > toExclusive) end = toExclusive
		//console.log(step: %d, {start: %d, end: %d}', step, start, end);
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
			setTimeout(resolve, ts)
		})
	}

}
Parallel.options = { workers: numCPUs}

module.exports = Parallel