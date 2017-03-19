/// <reference path="./exception.ts" />

namespace System {

		export type byte = number;
		export type Byte = byte;

		export class UUID {

				constructor(b: byte[] ) {
						if (b === null) throw new ArgumentNullException();
						if (b.length !== 16) throw new ArgumentException();
				}

				toString () : string {
					return '';
				}
		}
}