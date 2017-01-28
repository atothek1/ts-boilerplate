import {MockServerSettings} from "./MockTypes";
import {SinonFakeXMLHttpRequest} from "sinon";

export interface MockResponseData {
    statusCode: number;
    headers?: {[header: string]: any};
    body: (request: any) => string;
}

export interface MockResponseMap {
    readonly GET: {[url: string]: MockResponseData};
    readonly PUT: {[url: string]: MockResponseData};
    readonly POST: {[url: string]: MockResponseData};
}

export default class MockResponses {

    private static instance: MockResponses;
    private initialized: boolean = false;
    private responseMap: MockResponseMap;

    public static getInstance(): MockResponses {
        return MockResponses.instance || (MockResponses.instance = new MockResponses());
    }

    private settings: MockServerSettings;

    protected constructor() {
    }

    public setup(settings: MockServerSettings, responseMap: MockResponseMap): MockResponses {

        if (this.initialized)
            return this;
        this.initialized = false;

        this.settings = settings;
        this.responseMap = responseMap;

        return this;
    }

    public handleRequest(request: SinonFakeXMLHttpRequest): void {

        let response = this.getResponse(request);
        request.respond(response.statusCode, response.headers, response.body(request));
    }

    private getResponse(request: SinonFakeXMLHttpRequest): MockResponseData {
        let responseData = this.responseMap[request.method][request.url];
        if (!responseData) {
            let errorResponse = JSON.stringify({code: 404, message: "Not Found"});
            return {
                statusCode: 404,
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": errorResponse.length
                },
                body: req => errorResponse
            };
        }
        return responseData;
    }
}