namespace System1.Collections {
    const
        symbol = Symbol('stack');


    export class Stack<T> {
        constructor(data?: T[]) {
            this[symbol] = data ? data.slice() : [];
        }

        pop () : T {
            return this[symbol].pop();
        }

        push (value: T) {
            return this[symbol].push(value);
        }

        peek () : T {
            return this[symbol][this[symbol].length - 1];
        }

        clone () : Stack<T> {
            return new Stack<T>(this[symbol]);
        }

        toArray () : T[] {
            return this[symbol].slice();
        }

        clear () : void {
            this[symbol].length = 0;
        }

        get count () {
            return this[symbol].length;
        }

    }
}
