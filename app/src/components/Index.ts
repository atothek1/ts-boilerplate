import {Application} from "./Application";
import "../core/fetch";

export class Index {
    public static main(...args: any[]): void {

        console.info(`Index.main(${args.join(", ")})`);
        let app = new Application();
        app.run();
    }
}

window.onload = evt => {
    Index.main(window);
};