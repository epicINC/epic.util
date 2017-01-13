namespace System.Collections.Generic {

	export interface IEqualityComparer<T> {
		equals (x: T, y: T) : boolean;
		getHashCode (value: T) : number
	}

}

