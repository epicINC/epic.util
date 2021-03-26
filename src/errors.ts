


export class ErrorsImpl {
	ArgumentOutOfRange(name: string) {
		console.log(name)
		return new ArgumentOutOfRangeException()
	}
	ArgumentNull(name: string) {
		console.log(name)
		return new ArgumentNullException()
	}
	InvalidOperation() {
		return new InvalidOperationException()
	}
}

export const Errors = new ErrorsImpl


abstract class ErrorBase extends Error {



	throw() {
		throw this
	}
}




class ArgumentOutOfRangeException extends ErrorBase {}
class ArgumentNullException extends ErrorBase {}
class InvalidOperationException extends ErrorBase {}