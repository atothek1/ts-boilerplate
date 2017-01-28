import R from "./R";
import {Application} from "./Application";
import {PingRequest} from "./services/Service";

//#region only in DEVELOPMENT
if (DEVELOPMENT) {
    let MockServer = require("../mock/MockServer");
    MockServer.default.getInstance().setup({
            host: R.Environment.Host,
            basePath: R.Environment.BasePath
        },
        {
            POST: {
                [R.Environment.Host + R.Environment.BasePath + "/ping"]: {
                    statusCode: 200,
                    headers: {"Content-Type": "application/json"},
                    body: request => {
                        let data = JSON.parse(request.requestBody) as PingRequest;
                        return JSON.stringify({status: data.status, timeStamp: new Date().getMilliseconds()});
                    }
                }
            },
            GET: {},
            PUT: {}
        });
}
//#endregion

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