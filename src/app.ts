

declare global {
    type Many<T> = T | T[];

    type Deferred<T> = {
        [P in keyof T]: Promise<T[P]>;
    };

    type Proxify<T> = {
        [P in keyof T]: { get(): T[P]; set(v: T[P]): void };
    };
    
    type Dictionary = {
        [key: number]: any;
        [key: string]: any;
    };

    interface Action {
        () : void;
        <T>(arg: T) : void;
        <T1, T2>(arg1: T1, arg2: T2) : void;
        <T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3) : void;
        <T1, T2, T3, T4>(arg1: T1, arg2: T2, arg3: T3, arg4: T4) : void;
        <T1, T2, T3, T4, T5>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) : void;
        <T1, T2, T3, T4, T5, T6>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) : void;
        <T1, T2, T3, T4, T5, T6, T7>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) : void;
        <T1, T2, T3, T4, T5, T6, T7, T8>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) : void;
    }

    interface Func {
        <TResult>() : TResult;
        <T, TResult>(arg: T) :  TResult;
        <T1, T2, TResult>(arg1: T1, arg2: T2) : TResult;
        <T1, T2, T3, TResult>(arg1: T1, arg2: T2, arg3: T3) : TResult;
        <T1, T2, T3, T4, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4) : TResult;
        <T1, T2, T3, T4, T5, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) : TResult;
        <T1, T2, T3, T4, T5, T6, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) : TResult;
        <T1, T2, T3, T4, T5, T6, T7, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) : TResult;
        <T1, T2, T3, T4, T5, T6, T7, T8, TResult>(arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) : TResult;
    }


};


export namespace epic {


    type PropertyValueSelector<T, K> = (value: T, name: string) => K;


    export class util {

        static with<T>(value: T, func?: Func) : T | Function {
            if (!func) return (e: Function) => e(value);
            func(value);
            return value;
        };

        static each<T>(value: Many<T>, action: Action, thisArg?: any) {
            Array.isArray(value) ? (<T[]>value).forEach(action) : thisArg ? action.call(thisArg, value, 0) : action(value, 0);
            return value;
        };
        static map<T, K>(value: Many<T>, func: Func, thisArg?: any) : Many<K> {
            if (Array.isArray(value))
                return (<T[]>value).map(func, thisArg);
            return thisArg ? func.call(thisArg, value) : func(value);
        };
    };

    export class convert {

        static toObject<T extends Dictionary>(value: Many<T>, selector: string | Func = 'id') : Dictionary {
            if (typeof selector === 'string')
                selector = <Func>(function (name : string) { return (e: T) => e[name] })(selector);
            let result: Dictionary = {};
            
            util.each<T>(value, <Action>((e: T) => {
                result[<string>(<Func>selector)(e)] = (<Func>selector)(e);
            }));
            return result;
        };
    };

};

console.log(epic.convert.toObject([{id:1}, {id:2}], <Func>(e => e.id)));

export default epic;