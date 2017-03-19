namespace System.Collections.Generic {

	export interface IEqualityComparer {
		equals (x: Object, y: Object) : boolean;
		getHashCode (value: Object) : number;
	}

}

