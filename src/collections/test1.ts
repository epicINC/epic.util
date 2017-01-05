import ITest from './test';

export class Test<T> implements ITest<T> {
    get x () : string {
        return '';
    }
};


let t = new Test