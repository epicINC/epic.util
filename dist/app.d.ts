export default class epic {
    static map<T, K>(source: T | T[], func: (value: T, index?: number, array?: T[]) => K, thisArg?: any): K | K[];
    static with<T, K>(source: T, func?: Func<T, any>): T | K | Func<Func<T, any>, any>;
}
export declare type Func<T, K> = (arg1: T) => K;
