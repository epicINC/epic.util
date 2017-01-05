 declare global {
    export interface ITest<T> {
        x: string;
    }

 }
 declare const ITest : ITestConstructor;



export interface ITestConstructor {
    new (arrayLength?: number): any[];
    new <T>(arrayLength: number): T[];
}


export default ITest;