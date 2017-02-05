import {Application} from "../src/components/Application";

declare global {

    /**
     * declare the injected webpack plugin variables
     */
    let DEVELOPMENT: boolean;
    let PRODUCTION: boolean;
    let VERSION: string;
    let ENVIRONMENT: string;

    /**
     * Expose a reference of the application instance to Window
     */
    interface Window {
        application: Application;
    }

    /**
     * is missed by whatwg-fetch, whatwg-stream
     */
    interface IteratorResult<T> {
        done: boolean;
        value?: T;
    }

    /**
     * is missed by whatwg-fetch, whatwg-stream
     */
    interface Iterator<T> {
        next(value?: any): IteratorResult<T>;
        return?(value?: any): IteratorResult<T>;
        throw?(e?: any): IteratorResult<T>;
    }

    /**
     * is missed by whatwg-fetch, whatwg-stream
     */
    interface IterableIterator<T>{}

    /**
     * is missed by whatwg-fetch, whatwg-stream
     */
    class Symbol {
        static readonly iterator: symbol;
    }
}