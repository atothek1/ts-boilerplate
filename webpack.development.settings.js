const path = require("path");
const pkg = require("./package.json");

const VERSION = pkg.version;
const ENV = "development";
const PRODUCTION = false;
const DEVELOPMENT = !PRODUCTION;


module.exports = {
    VERSION: VERSION,
    ENVIRONMENT: ENV,
    PRODUCTION: PRODUCTION,
    DEVELOPMENT: DEVELOPMENT,
    toCopy: [
        {from: "../node_modules/sinon/pkg/sinon.js", to: "vendor/sinon.js"},
        {from: "../node_modules/axios/dist/axios.js", to: "vendor/axios.js"},
        {from: "../node_modules/axios/dist/axios.map", to: "vendor/axios.map"},
        {from: "resources/"}
    ]
};