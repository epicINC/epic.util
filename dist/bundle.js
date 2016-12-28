System.register("app", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var epic;
    return {
        setters: [],
        execute: function () {
            epic = class epic {
                static map(source, func, thisArg) {
                    if (Array.isArray(source))
                        return source.map(func, thisArg);
                    return thisArg ? func.call(thisArg, source) : func(source);
                }
                static with(source, func) {
                    if (func) {
                        let result = func(source);
                        console.log(result);
                        if (result)
                            return result;
                        return source;
                    }
                    return e => e(source);
                }
            };
            exports_1("default", epic);
            epic.with({ a: 3 }, e => e);
        }
    };
});
"use strict";
//# sourceMappingURL=bundle.js.map