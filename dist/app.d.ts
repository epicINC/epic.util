export declare type Action = () => void;
export declare type Action1<T> = (arg: T) => void;
export declare type Action2<T1, T2> = (arg1: T1, arg2: T2) => void;
export declare type Action3<T1, T2, T3> = (arg1: T1, arg2: T2, arg3: T3) => void;
export declare type Action4<T1, T2, T3, T4> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void;
export declare type Action5<T1, T2, T3, T4, T5> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => void;
export declare type Action6<T1, T2, T3, T4, T5, T6> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => void;
export declare type Action7<T1, T2, T3, T4, T5, T6, T7> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => void;
export declare type Action8<T1, T2, T3, T4, T5, T6, T7, T8> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => void;
export declare type Func<TResult> = () => TResult;
export declare type Func1<T, TResult> = (arg: T) => TResult;
export declare type Func2<T1, T2, TResult> = (arg1: T1, arg2: T2) => TResult;
export declare type Func3<T1, T2, T3, TResult> = (arg1: T1, arg2: T2, arg3: T3) => TResult;
export declare type Func4<T1, T2, T3, T4, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult;
export declare type Func5<T1, T2, T3, T4, T5, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult;
export declare type Func6<T1, T2, T3, T4, T5, T6, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => TResult;
export declare type Func7<T1, T2, T3, T4, T5, T6, T7, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => TResult;
export declare type Func8<T1, T2, T3, T4, T5, T6, T7, T8, TResult> = (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => TResult;
export declare namespace epic {
    class Convert {
        static toObject<T, U>(value: T[], selector: string | Func1<T, any>): U;
    }
}
