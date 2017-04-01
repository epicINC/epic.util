namespace System1.Collections {

    export interface IList<T> {
        clone() : any;
        toArray() : T[];
        clear() : void;
        count: number;
    }

    export interface IListConstructor {
        new () : IList<any>;
        new <T>(data?: {}) : IList<T>;
    }


    const store = Symbol('List');

    export const List : IListConstructor = class T implements IList<T> {

        constructor(data?: T[]) {
            this[store] = data ? data.slice() : [];
        }

        get (index: number) : T {
            return this[store][index];
        }

        set (index: number, value: T) : T {
            return this[store][index] = value;
        }

        clone () : IList<T> {
            return new List<T>(this[store]);
        }

        toArray () : T[] {
            return this[store].slice();
        }

        clear () : void {
            this[store].length = 0;
        }

        get count () {
            return this[store].length;
        }
    };
}
