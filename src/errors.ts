


export class ErrorsImpl {
	ArgumentOutOfRange() {
		return new ArgumentOutOfRangeException()
	}
	ArgumentNull() {
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