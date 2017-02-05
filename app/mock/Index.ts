import {PingRequest} from "../src/services/ApplicationService";
import R from "../src/R";
import MockServer from "./MockServer";

MockServer.getInstance().setup(
    {
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
                    return JSON.stringify({
                        info: `appinfo: ver.${data.clientVersion}, env.${data.environment}`,
                        timeStamp: new Date().valueOf()
                    });
                }
            }
        },
        GET: {},
        PUT: {},
        DELETE: {}
    });