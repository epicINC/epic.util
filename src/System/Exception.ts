
namespace System {


    export class Exception extends Error {}

    export class SystemException extends Exception {}

    export class ArgumentException extends SystemException {}
    export class InvalidOperationException extends SystemException {}

    export class ArgumentNullException extends ArgumentException {}
    export class ArgumentOutOfRangeException extends ArgumentException {}




}