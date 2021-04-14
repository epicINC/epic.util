export class DTString {
	constructor(v: string) {
		this.index = -1
		this.current = '\0'
		this.value = v
		this.count = v.length
	}

	index: number
	current: string
	value: string
	count: number

	next() {
		this.index ++
		if (!this.atEnd()) {
			this.current = this.value[this.index]
			return true
		}
		return false
	}

	atEnd() {
		return this.index >= this.count
	}

	repeatCount() {
		const v = this.current
		let offset = this.index + 1
		while(!this.atEnd() && (this.value[offset] === v))
			offset++
		const result = offset - this.index
		this.index = offset - 1
		return result
	}
}
