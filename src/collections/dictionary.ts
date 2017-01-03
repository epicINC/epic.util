declare global {

    interface IDictionary {
        [index: number] : any;
        [key: string] : any;
        keys: string[];
        values: any[];
        entries: [string, any][];
        count: number;
    }

}

export class Dictionary implements IDictionary {

    private store : {};

    constructor() {
        this.store = Object.create(null);
        
    }

    get (index: number | string) {
        console.log(1);
        return this.store[index];
    }

    set (index: number | string, value: any) {
        console.log(2);
        return this.store[index] = value;
    }

    get keys() {
        return Object.keys(this.store);
    }

    get values() {
        return Object.values(this.store);
    }

    get entries() {
        return Object.entries(this.store);
    }

    get count() {
        return this.entries.length;
    }
}



let a = new Dictionary();

a[1] = 2;


console.log(a.keys);