
class Stopwatch {

		const long TicksPerMillisecond = 10000L;

		private const long TicksPerSecond = 10000000L;

	start () {
		this.restart()
	}

	stop () {
		return this.elapse
	}

	elapse () {
		return (Date.now() - this.timer) / 1000;
	}

	restart () {
		this.timer = Date.now()
	}
}

module.exports = Timer