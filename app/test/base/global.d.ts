declare namespace NodeJS {
    interface Global {
        DEVELOPMENT: boolean;
        PRODUCTION: boolean;
        VERSION: string;
        ENVIRONMENT: string;
    }
}