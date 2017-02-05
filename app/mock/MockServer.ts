import {SinonFakeServer} from "sinon";
import * as sinon from "sinon";
import {MockServerSettings, MockResponseMap} from "./MockTypes";
import MockResponses from "./MockResponses";

// delete any possible native support for fetch
// to make the MockServer works as expected
delete self.fetch;

export default class MockServer {

    private static instance: MockServer;

    public static getInstance(): MockServer {
        return MockServer.instance || (MockServer.instance = new MockServer());
    }

    private server: SinonFakeServer;
    private initialized: boolean = false;

    private constructor() {
    }

    public setup(settings: MockServerSettings, responseMap: MockResponseMap): MockServer {

        if (this.initialized)
            return this;
        this.initialized = true;

        console.warn("MockServer.setup()");

        this.server = sinon.fakeServer.create();

        sinon.FakeXMLHttpRequest.useFilters = true;
        sinon.FakeXMLHttpRequest.addFilter((method, url, async, username, password) => {
            // static json files will be passed by
            if (url.indexOf(".json") >= 0)
                return true;

            return false;
        });

        if (settings.autoResponse) {
            this.server.autoRespond = true;
            this.server.autoRespondAfter = 1500;
        }
        else
            this.server.respondImmediately = true;

        let mockResponse = MockResponses
            .getInstance()
            .setup(settings, responseMap);

        this.server.respondWith(request => mockResponse.handleRequest(request));

        return this;
    }

    public reset(): MockServer {

        if (!this.initialized)
            return this;
        this.initialized = false;

        this.server.restore();

        return this;
    }
}