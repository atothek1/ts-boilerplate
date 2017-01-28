import {BaseService, ServiceRequest} from "./base/BaseService";
import {AxiosPromise} from "axios";

export interface PingRequest {
    readonly status: string;
}

export interface PingResponse {
    readonly timeStamp: number;
    readonly status: string;
}

export class Service extends BaseService {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    public ping(): AxiosPromise {

        let req: ServiceRequest<PingRequest> = {
            path: "/ping",
            method: "POST",
            data: {status: "UP AND RUNNING!"},
            headers: {"Accept": "application/json"}
        };

        return this.executeRequest<PingRequest, PingResponse>(req);
    }
}