/**
 * is missed by whatwg-fetch, whatwg-stream
 */
declare interface IteratorResult<T> {
    done: boolean;
    value?: T;
}

/**
 * is missed by whatwg-fetch, whatwg-stream
 */
declare interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

/**
 * is missed by whatwg-fetch, whatwg-stream
 */
declare interface IterableIterator<T> {
}

/**
 * is missed by whatwg-fetch, whatwg-stream
 */
declare class Symbol {
    static readonly iterator: symbol;
}