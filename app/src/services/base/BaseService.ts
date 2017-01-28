import {AxiosInstance, AxiosPromise} from "axios";
import Axios from "axios";
export interface ServiceRequest<TRequestData> {
    readonly path: string;
    readonly method: string;
    readonly data?: TRequestData;
    readonly headers?: {[key: string]: any};
}

export abstract class BaseService {

    protected server: AxiosInstance;

    protected constructor(baseUrl: string) {
        this.server = Axios.create({
            baseURL: baseUrl,
            timeout: 10000
        });
    }

    protected executeRequest<TRequestData, TResponseData>(request: ServiceRequest<TRequestData>): AxiosPromise {
        let promise = this.server.request({
            url: request.path,
            method: request.method,
            data: JSON.stringify(request.data) || undefined,
            headers: request.headers || undefined
        });

        return promise;
    }
}