export type MockServerSettings = {host: string, basePath: string, autoResponse?: boolean};
export interface MockResponseData {
    statusCode: number;
    headers?: {[header: string]: any};
    body: (request: any) => string;
}

export interface MockResponseMap {
    readonly GET: {[url: string]: MockResponseData};
    readonly PUT: {[url: string]: MockResponseData};
    readonly POST: {[url: string]: MockResponseData};
    readonly DELETE: {[url: string]: MockResponseData};
}