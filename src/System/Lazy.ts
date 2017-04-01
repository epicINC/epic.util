namespace System {

	export class Lazy<T> {

		isValueCreated: boolean;
		value: T;
		valueFactory: Func0<T>;


		constructor (valueFactory: Func0<T>) {
			this.valueFactory = valueFactory;
		}

		init () : T {
			this.isValueCreated = true;
			return this.value = this.valueFactory();
		}

		get IsValueCreated () { return this.isValueCreated; }


		get Value () {
			if (this.isValueCreated) return this.value;
			return this.init();
		}
	}
}