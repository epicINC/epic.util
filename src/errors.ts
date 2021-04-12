


export class ErrorsImpl {
	Argument(message?: string) {
		console.log(message)
		return new ArgumentException()
	}
	ArgumentOutOfRange(message?: string) {
		console.log(message)
		return new ArgumentOutOfRangeException()
	}
	ArgumentNull(message?: string) {
		console.log(message)
		return new ArgumentNullException()
	}
	InvalidOperation(message?: string) {
		console.log(message)
		return new InvalidOperationException()
	}
}

export const Errors = new ErrorsImpl


abstract class ErrorBase extends Error {



	throw() {
		throw this
	}
}





class ArgumentException extends ErrorBase {}
class ArgumentOutOfRangeException extends ErrorBase {}
class ArgumentNullException extends ErrorBase {}
class InvalidOperationException extends ErrorBase {}