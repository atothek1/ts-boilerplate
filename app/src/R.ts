interface EnvironmentR {
    Host: string;
    BasePath: string;
    Version: string;
    Env: string;
}

export default class R {
    static readonly Environment: EnvironmentR = {
        Host: "https://test.com",
        BasePath: "/api/v1",
        Version: VERSION,
        Env: ENVIRONMENT
    };
}