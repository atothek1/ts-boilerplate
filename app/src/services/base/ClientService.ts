export interface ServiceRequest<TRequestData> {
    readonly url: string;
    readonly method: string;
    readonly data?: TRequestData;
    readonly headers?: {[key: string]: any};
}

export interface ServiceResponse<TResponseData, TRequestData> {
    readonly request: ServiceRequest<TRequestData>;
    readonly response: Response;
    readonly data: TResponseData;
}

export abstract class HttpMethod {
    public static readonly GET: string = "GET";
    public static readonly PUT: string = "PUT";
    public static readonly POST: string = "POST";
    public static readonly DELETE: string = "DELETE";
}

export abstract class ClientService {

    protected readonly baseUrl: string;

    protected constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected executeRequest<TResponseData, TRequestData>(request: ServiceRequest<TRequestData>): Promise<ServiceResponse<TResponseData, TRequestData>> {
        let promise = fetch(request.url, {
            method: request.method,
            headers: request.headers || undefined,
            body: JSON.stringify(request.data) || undefined
        })
        // intercept the first response and prepare it for the application needs
            .then((response) => {
                return response.json<TResponseData>().then(data => {
                    return {response: response, request: request, data: data};
                });
            });
        return promise;
    }
}