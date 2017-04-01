
namespace System.Linq {
  export class Enumerable {

    static  Aggregate<TSource>(source: System.Collections.Generic.IEnumerable<TSource>, func: Func2<TSource, TSource, TSource>) : TSource {
      if (!source || !func) throw new ArgumentNullException();
      return null;
    }
  }
}