


namespace System.Diagnostics {

	const TicksPerSecond = 1000

export class Stopwatch {

	private elapse : number
	private startTimeStamp : number
	private isRunning : boolean



	public static startNew () : Stopwatch {
		let result = new Stopwatch()
		result.start()
		return result
	}


	public get elapsed () : Date {
		return new Date(this.elapsedTicks/TicksPerSecond)
	}

	public get elapsedMilliseconds () : number {
		if (!this.isRunning) return  this.elapse
		let result = this.elapse
		result += Date.now() - this.startTimeStamp
		return result
	}
	
	public get elapsedTicks () : number {
		return this.elapsedMilliseconds
	}

	public start () {
		if (this.isRunning) return
		this.isRunning = true
		this.startTimeStamp = Date.now()
	}

	public stop () {
		if (!this.isRunning) return
		this.isRunning = false
		this.elapse += Date.now() - this.startTimeStamp
		if (this.elapse < 0) this.elapse = 0
	}

	public Restart()
	{
		this.elapse = 0
		this.startTimeStamp = Date.now();
		this.isRunning = true
	}

	public reset () {
		this.elapse = 0
		this.isRunning = false
		this.startTimeStamp = 0
	}

}

}