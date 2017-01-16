namespace System {
    type Object  = Object & {
        GetHashCode() : number;
    };

    public class Object {
        Equals(value: Object) : boolean {
            return false;
        }

        GetType() : Type {
            return {};
        }

        static Equals(target: Object, source: Object) : boolean {
            return false;
        }
    }
}