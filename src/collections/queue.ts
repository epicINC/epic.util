
namespace System.Collections {

    export interface IQueue<T> extends IList<T> {
        new(data?: T[]) : void;
        de() : T;
        en(value: T) : T;
        peek() : T;
    }

    const
        symbol = Symbol('Queue');

    export class Queue<T> {

        constructor(data?: T[]) {
            this[symbol] = data ? data.slice() : [];
        }

        de () : T {
            return this[symbol].shift()
        }

        en (value: T) {
            return this[symbol].push(value);
        }

        peek () : T {
            return this[symbol][0];
        }

        clone () {
            return new Queue<T>(this[symbol]);
        }

        toArray () : T[] {
            return this[symbol].slice();
        }

        clear () : void {
            this[symbol].length = 0;
        }

        get count () : number {
            return this[symbol].length;
        }
    }
}


