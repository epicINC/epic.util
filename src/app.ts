type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};

type Proxify<T> = {
    [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};




export default class epic {

    static map<T, K>(source: T | T[], func: (value: T, index?: number, array?: T[]) => K, thisArg?: any) : K | K[] {
        if (Array.isArray(source))
            return (<T[]>source).map(func, thisArg);
        return thisArg ? func.call(thisArg, <T>source) : func(<T>source);
    }
    static with<T, K>(source: T, func?: Func<T, any>) : T | K | Func<Func<T, any>, any> {
        if (func) {
            let result = func(source);
            console.log(result);
            if (result) return result;
            return source;
        }
        return e => e(source);
    }


}


export type Func<T, K> = (arg1: T) => K;
epic.with({a:3}, e => e);