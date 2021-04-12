

declare global {
  type Many<T> = T | T[]

  type Deferred<T> = {
      [P in keyof T]: Promise<T[P]>
  }

  type Proxify<T> = {
      [P in keyof T]: { get() : T[P]; set(v: T[P]) : void }
  }

  type Predicate<T> = (arg: T) => boolean


	type Action<T extends any[], TResult> = (...args: T) => void
  type Func<T extends any[], TResult> = (...args: T) => TResult

	type IndexableType = string | number | symbol
	type Dictionary<K extends IndexableType , T> = {[k in K]: T}



}



namespace epic {

    interface Node<T, R> {
        value: T | R
        left: Node<T, R>
        right: Node<T, R>
    }

    export class Distinct {

        static set<T>(value: T[]) : T[]
        static set<T>(value: T[], selector: string) : T[]
        static set<T, R>(value: T[], selector: Func1<T, R>) : T[]

        static set<T, R>(value: T[], selector?: string | Func1<T, R>) {
            let
                keySelector: Func1<T, R>| Func1<T, T> = epic.Selector.distinct(selector),
                checker = new Set(),
                result: T[] = []

            for (let i = 0, count = value.length, key: T | R, item: T; i < count; i++) {
                item = value[i]
                key = keySelector(item)
                if (checker.has(key)) continue
                checker.add(key)
                result.push(item)
            }
            return result
        }

        static binary<T>(value: T[]) : T[]
        static binary<T>(value: T[], selector: string) : T[]
        static binary<T, R>(value: T[], selector: Func1<T, R>) : T[]

        static binary<T, R>(value: T[], selector?: string | Func1<T, R>) {
            let
                keySelector: Func1<T, R>| Func1<T, T> = epic.Selector.distinct(selector),
                bst: Node<T, R> = {value: keySelector(value[0]), left: null, right: null},
                result = [value[0]]

            for (let i = 1, count = value.length, key: T | R, item: T, uv: boolean, root: Node<T, R>; i < count; i++) {
                item = value[i]
                key = keySelector(item)
                root = bst
                uv = true

                while (true) {
                    if (key > root.value) {
                        if (!root.right) {
                            root.right = {value: key, left: null, right: null}
                            break
                        }
                        root = root.right
                    } else if (key < root.value) {
                        if (!root.left) {
                            root.left = {value: key, left: null, right: null}
                            break
                        }
                        root = root.left
                    } else {
                        uv = false
                        break
                    }
                }
                if (uv) result.push(item)
            }

            return result
        }
    }


    export class Selector {

        static property<T, R>(name: string) : Func1<T, R> {
            return e => e[name]
        }

        static distinct<T, R>(selector: string | Func1<T, R>) : Func1<T, R>| Func1<T, T> {
            if (selector) {
                if (typeof selector === 'string')
                    selector = epic.Selector.property<T, R>(selector)
                return selector
            }
            return e => e
        }
    }


    export class Util {

        static with<T>(value: T, func: Action1<T>) : T {
            func(value)
            return value
        }

        static each<T>(value: Many<T>, action: Action3<T, number, T | T[]>, thisArg?: any) {
            Array.isArray(value) ? value.forEach(action) : thisArg ? action.call(thisArg, value, 0, value) : action(value, 0, value)
            return value
        }
        static map<T, R>(value: Many<T>, func: Func3<T, number, T | T[], R>, thisArg?: any) : Many<R> {
            if (Array.isArray(value)) return value.map(func, thisArg)
            return thisArg ? func.call(thisArg, value, 0, value) : func(value, 0, value)
        }

        static distinct<T, R>(value: T[], selector?: Func1<T, R>) {
            if (value.length < 200) return epic.Distinct.set(value, selector)
            return epic.Distinct.binary(value, selector)
        }

				static many<T, R>(source: T[], selector: Func1<T, R[]>) : R[] {
					let result: R[] = []
					source.forEach(e => result.push(...selector(e)))
					return result
				}
    }

    export class Convert {

        static toObject<T extends {}>(value: Many<T>) : {}
        static toObject<T extends {}>(value: Many<T>, selector: string) : {}
        static toObject<T extends {}, R>(value: Many<T>, selector: Func1<T, R>) : {}

        static toObject<T extends {}, R>(value: Many<T>, selector: string | Func1<T, R> = 'id') : {} {
            if (typeof selector === 'string')
                selector = epic.Selector.property<T, R>(selector)

            let result = {}
            Util.each<T>(value, e => result[((<Func1<T, R>>selector)(e)).toString()] = (<Func1<T, R>>selector)(e))
            return result
        }
    }

}

export = epic