import { Errors } from './errors'



export class Convert {

	static toNumber(s: string) {
		const result = Number(s)
		if (Number.isNaN(result)) Errors.Argument('s').throw()
		return result
	}
}