import {ClientService, ServiceRequest, ServiceResponse, HttpMethod} from "./base/ClientService";

export interface PingRequest {
    readonly clientVersion: string;
    readonly environment: string;
}

export interface PingResponse {
    readonly timeStamp: number;
    readonly info: string;
}

export class Service extends ClientService {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public ping(): Promise<ServiceResponse<PingResponse, PingRequest>> {
        let path = "/ping";
        let req: ServiceRequest<PingRequest> = {
            url: this.baseUrl + path,
            method: HttpMethod.POST,
            data: {
                clientVersion: VERSION,
                environment: ENVIRONMENT
            },
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };

        return this.executeRequest<PingResponse, PingRequest>(req);
    }
}