namespace System.Security.Cryptography {

	export class HashAlgorithm {

		static hash (value: any) {
			return this.csharp(this.toString(value));
		}

		private static toString (value: any) : string {
			if (value === null) return 'n';
			if (value === true) return 't';
			if (value === false) return 'f';
			if (value instanceof Date) return 'd:' + value.getTime();
			let type = typeof value;
			if (type === 'string') return 's:'+ value;
			if (type === 'number') return 'n:'+ value;
			if (value instanceof Function) return 'm:'+ value.toString();
			if (Array.isArray(value))
				return 'a:'+ value.map(HashAlgorithm.toString).join(';');

			return 'o:'+ Object.keys(value).map(e => HashAlgorithm.toString(value[e])).join(';');
		}


		static djb2 (value: string) : number {
			let result = 5381;
			for (let i = 0; i < value.length; i++)
				result = (result << 5) + result + value.charCodeAt(i);
			return result >>> 0;
		}

		static djb2r (value: string) : number {
			let result = 5381, i = value.length;
			while (i)
				result = (result * 33) ^ value.charCodeAt(--i);
			return result >>> 0;
		}

		static lose (value: string) : number {
			let result = 0, charCode: number, i = 0;
			while (charCode = value.charCodeAt(i++))
				result += charCode;
			return result;
		}

		static csharp (value: string) : number {
			let hash1 = 5381, hash2 = 5381;
			for (let i = 0; i < value.length; i++) {
				hash1 = ((hash1 << 5) + hash1) ^ value.charCodeAt(i);
				if (!value[++i]) break;
				hash2 = ((hash2 << 5) + hash2) ^ value.charCodeAt(i);
			}
			return hash1 + (hash2 * 1566083941 >>> 0);
		}

		static sdbm (value: string) : number {
			let result = 0;
			for (let i = 0; i < value.length; i++)
				result = value.charCodeAt(i) + (result << 6) + (result << 16) - result;
			return result;
		}

		static java (value: string) : number {
			let result = 0;
			for (let i = 0; i < value.length; i++) {
				result = (result << 5) - result + value.charCodeAt(i);
				result &= result;
			}
			return result;
		}

		// https://code.google.com/archive/p/fast-hash/
		static fast (value: string) : number {
			return 0;
		}

	}

}

console.log(System.Security.Cryptography.HashAlgorithm.hash({a:1, b:2}));