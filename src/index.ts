

declare global {
    type Many<T> = T | T[]

    type Deferred<T> = {
        [P in keyof T]: Promise<T[P]>
    }

    type Proxify<T> = {
        [P in keyof T]: { get() : T[P]; set(v: T[P]) : void }
    }

    type Action0 = () => void
    type Action1<T> = (arg: T) => void
    type Action2<T1, T2> = (arg1: T1, arg2: T2) => void
    type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void
    type Action4<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void
    type Action5<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => void
    type Action6<T1, T2, T3, T4, T5, T6> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => void
    type Action7<T1, T2, T3, T4, T5, T6, T7> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => void
    type Action8<T1, T2, T3, T4, T5, T6, T7, T8> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => void

    type Func0<TResult> = () => TResult
    type Func1<T, TResult> = (arg: T) => TResult
    type Func2<T1, T2, TResult> = (arg1: T1, arg2: T2) => TResult
    type Func3<T1, T2, T3, TResult> = (arg1: T1, arg2: T2, arg3: T3) => TResult
    type Func4<T1, T2, T3, T4, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult
    type Func5<T1, T2, T3, T4, T5, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult
    type Func6<T1, T2, T3, T4, T5, T6, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => TResult
    type Func7<T1, T2, T3, T4, T5, T6, T7, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => TResult
    type Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => TResult

    interface Action {
        () : void
        <T>(arg: T) : void
        <T1, T2>(arg1: T1, arg2: T2) : void
        <T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3) : void
        <T1, T2, T3, T4>(arg1: T1, arg2: T2, arg3: T3, arg4: T4) : void
        <T1, T2, T3, T4, T5>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) : void
        <T1, T2, T3, T4, T5, T6>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) : void
        <T1, T2, T3, T4, T5, T6, T7>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) : void
        <T1, T2, T3, T4, T5, T6, T7, T8>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) : void
    }

    interface Func {
        <TResult>() : TResult
        <T, TResult>(arg: T) :  TResult
        <T1, T2, TResult>(arg1: T1, arg2: T2) : TResult
        <T1, T2, T3, TResult>(arg1: T1, arg2: T2, arg3: T3) : TResult
        <T1, T2, T3, T4, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4) : TResult
        <T1, T2, T3, T4, T5, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) : TResult
        <T1, T2, T3, T4, T5, T6, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) : TResult
        <T1, T2, T3, T4, T5, T6, T7, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) : TResult
        <T1, T2, T3, T4, T5, T6, T7, T8, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) : TResult
    }
    type Predicate<T> = (item: T) => boolean

    function Funx<TResult>() : TResult
    function Funx<T, TResult>(arg: T) : TResult
    function Funx<T1, T2, TResult>(arg1: T1, arg2: T2) : TResult

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