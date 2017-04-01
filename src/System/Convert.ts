

namespace System {
    export class Convert {

        public static ToPromise(fn: Function) : Promise<any> {
            return new Promise((resolve, reject) => {
                try {
                    fn(resolve);
                } catch (err) {
                    reject(err);
                }
            });
        }

    }
}