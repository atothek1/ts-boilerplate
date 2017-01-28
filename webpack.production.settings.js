const path = require("path");
const pkg = require("./package.json");

const VERSION = pkg.version;
const ENV = "production";
const PRODUCTION = true;
const DEVELOPMENT = !PRODUCTION;


module.exports = {
    VERSION: VERSION,
    ENVIRONMENT: ENV,
    PRODUCTION: PRODUCTION,
    DEVELOPMENT: DEVELOPMENT,
    toCopy: [
        {from: "assets", to: "assets"}
    ]
};