declare type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};

declare type Proxify<T> = {
    [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};


declare type Dictionary<T> = {
    [key: number]: T;
    [key: string]: T;
};

export type Action = () => void;
export type Action1<T> = (arg: T) => void;
export type Action2<T1, T2> = (arg1: T1, arg2: T2) => void;
export type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;
export type Action4<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void;
export type Action5<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => void;
export type Action6<T1, T2, T3, T4, T5, T6> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => void;
export type Action7<T1, T2, T3, T4, T5, T6, T7> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => void;
export type Action8<T1, T2, T3, T4, T5, T6, T7, T8> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => void;

export type Func<TResult> = () => TResult;
export type Func1<T, TResult> = (arg: T) => TResult;
export type Func2<T1, T2, TResult> = (arg1: T1, arg2: T2) => TResult;
export type Func3<T1, T2, T3, TResult> = (arg1: T1, arg2: T2, arg3: T3) => TResult;
export type Func4<T1, T2, T3, T4, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult;
export type Func5<T1, T2, T3, T4, T5, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult;
export type Func6<T1, T2, T3, T4, T5, T6, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => TResult;
export type Func7<T1, T2, T3, T4, T5, T6, T7, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => TResult;
export type Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => TResult;

/*
export interface Func {
    <TResult>() : TResult;
    <T, TResult>(arg: T) : TResult;
    <T1, T2, TResult>(arg1: T1, arg2: T2) : TResult;
}

*/


export namespace epic {

    static each<T>(value: T, action: (value: T, index?: number, array?: T[]) => void, thisArg?: any) {
      Array.isArray(value) ? (<T[]>value).forEach(action) : (thisArg ? action.call(thisArg, value, 0) : action(value, 0))
      return value;
    }

    // Func<Func<T, any>, any>
    static with<T>(value: T, func?: Func1<T, any>) : T | Func1<Func1<T, any>, any> {
        if (!func) return e => e(value);
        func(value);
        return value;
    }


    static map<T, K>(value: T | T[], func: (value: T, index?: number, array?: T[]) => K, thisArg?: any) : K | K[] {
        if (Array.isArray(value))
            return (<T[]>value).map(func, thisArg);
        return thisArg ? func.call(thisArg, value) : func(value);
    }


    export class Convert {

        static toObject<T, U>(value: T[], selector: string | Func1<T, any>) : U {
            return;
        }
    }   


}


epic.each({a:3}, e => {
    console.log(e);
    return true;
});