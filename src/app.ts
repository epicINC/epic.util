

declare global {
    type Deferred<T> = {
        [P in keyof T]: Promise<T[P]>;
    };

    type Proxify<T> = {
        [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
    };


    type Dictionary<T> = {
        [key: number]: T;
        [key: string]: T;
    };

    type Action = () => void;
    type Action1<T> = (arg: T) => void;
    type Action2<T1, T2> = (arg1: T1, arg2: T2) => void;
    type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;
    type Action4<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void;
    type Action5<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => void;
    type Action6<T1, T2, T3, T4, T5, T6> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => void;
    type Action7<T1, T2, T3, T4, T5, T6, T7> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => void;
    type Action8<T1, T2, T3, T4, T5, T6, T7, T8> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => void;

    type Func<TResult> = () => TResult;
    type Func1<T, TResult> = (arg: T) => TResult;
    type Func2<T1, T2, TResult> = (arg1: T1, arg2: T2) => TResult;
    type Func3<T1, T2, T3, TResult> = (arg1: T1, arg2: T2, arg3: T3) => TResult;
    type Func4<T1, T2, T3, T4, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult;
    type Func5<T1, T2, T3, T4, T5, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult;
    type Func6<T1, T2, T3, T4, T5, T6, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => TResult;
    type Func7<T1, T2, T3, T4, T5, T6, T7, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => TResult;
    type Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => TResult;

};

export namespace epic {


    type PropertyValueSelector<T, K> = (value: T, name: string) => K;


    export class util {

        static with<T>(value: T, func?: Func1<T, any>) : T | Func1<Func1<T, any>, any> {
            if (!func) return e => e(value);
            func(value);
            return value;
        };

        static each<T>(value: T, action: (value: T, index?: number, array?: T[]) => void, thisArg?: any) {
            Array.isArray(value) ? (<T[]>value).forEach(action) : (thisArg ? action.call(thisArg, value, 0) : action(value, 0))
            return value;
        };
        static map<T, K>(value: T | T[], func: (value: T, index?: number, array?: T[]) => K, thisArg?: any) : K | K[] {
            if (Array.isArray(value))
                return (<T[]>value).map(func, thisArg);
            return thisArg ? func.call(thisArg, value) : func(value);
        }
    };

    export class convert {

        static toObject<T, U>(value: T | T[], selector: string | Func1<T, any> = 'id') : U {
            util.each
            return;
        };
    };

};

export default epic;