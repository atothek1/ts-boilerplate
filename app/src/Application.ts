import {Service} from "./services/Service";
import R from "./R";
export class Application {
    private readonly service: Service;

    constructor() {
        this.service = new Service(R.Environment.Host + R.Environment.BasePath);
    }

    public run(): Application {
        console.info("Application.run()");
        this.service
            .ping()
            .then(response => {
                console.log("1. then()");
                return response.data;
                /*
                 console.log(response.status);
                 console.log(response.statusText);
                 console.log(response.headers);
                 console.log(response.data);
                 console.log(response.config);
                 */
            })
            .then(response => {

                console.log("2. then()");
                return response.status;
            })
            .then(response => {

                console.log("3. then()");
            })
            .catch(error => {
                console.error("1. ");
            });
        return this;
    }

    public exit(): void {
        console.info("Application.exit()");
    }
}