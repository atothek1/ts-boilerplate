import {Service} from "../services/ApplicationService";
import R from "../R";

export class Application {
    private readonly service: Service;

    constructor() {
        this.service = new Service(R.Environment.Host + R.Environment.BasePath);
    }

    public run(): Application {
        console.info("Application.run()");
        this.service
            .ping()
            .then(res => res.data )
            .then(data => this.updateApppInfo( data.info) );
        return this;
    }

    private updateApppInfo( info: string ): void {
        let appInfo = document.querySelector(".appinfo");
        appInfo.textContent = info;
    }

    public exit(): void {
        console.info("Application.exit()");
    }
}