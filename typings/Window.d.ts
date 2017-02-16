import {Application} from "../app/src/components/Application";

declare global {
    /**
     * Expose a reference of the application instance to Window
     */
    interface Window {
        application: Application;
    }
}