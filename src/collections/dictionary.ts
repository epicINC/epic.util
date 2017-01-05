declare global {

    interface IDictionary<T> extends IList<T> {
        get (key: PropertyKey) : T;
        set (key: PropertyKey, value: T) : T;

        keys: string[];
        values: T[];
        entries: [string, any][];
        toArray() : [string, any][];
    }

    interface IDictionaryConstructor {
        new () : IDictionary<any>;
        new <T>(data?: {}) : IDictionary<T>;
    }

    type test = {
        new () : IDictionary<any>,
        new <T>(data?: {}) : IDictionary<T>;
    };

}

const store = Symbol('Dictionary');

export const Dictionary : IDictionaryConstructor = class T implements IDictionary<T> {

    constructor(data?: {}) {
        this[store] = data ? Object.assign(Object.create(null), data) : Object.create(null);
    }

    get (key: PropertyKey) : T {
        return this[store][key];
    }

    set (key: PropertyKey, value: T) : T {
        return this[store][key] = value;
    }

    get keys() : string[] {
        return Object.keys(this[store]);
    }

    get values() : T[] {
        return Object.values(this[store]);
    }

    get entries() : [string, T][] {
        return Object.entries(this[store]);
    }

    get count() : number {
        return this.keys.length;
    }

    clone() : IDictionary<T> {
        return new Dictionary<T>(this[store]);
    }

    toArray() : [string, T][] {
        return this.entries;
    }

    clear() : void {
        this[store] = Object.create(null);
    }

};
