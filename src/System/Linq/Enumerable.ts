/// <reference path="../Collections/Generic/index.ts" />

namespace System.Linq {
  export class Enumerable {

    static  Aggregate<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, func: Func<TSource, TSource, TSource>) : TSource {
      if (!source || !func) throw new ArgumentNullException();
      if (!source.Count()) throw new InvalidOperationException(); 
      return null;
    }
  }
}