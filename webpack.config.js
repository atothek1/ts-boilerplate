const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

var envIdx = -1;
var env = "development";
for (var i in process.argv) {
    if (process.argv[i].indexOf("env=") != -1)
        envIdx = i;
}

if (envIdx != -1)
    env = process.argv[envIdx].split("=")[1];

const settings = require("./webpack." + env + ".settings");

const config = {
        debug: settings.DEVELOPMENT,
        context: path.join(__dirname, "app"),
        devServer: {
            outputPath: path.join(__dirname, "build")
        },
        devtool: "source-map-loader",
        entry: {
            main: "./src/Index.ts"
        },
        output: {
            filename: "js/[name].[chunkhash].bundle.js",
            path: "./build/" + settings.ENVIRONMENT + "/",
            pathinfo: true
        },
        resolve: {
            // Add ".ts" and ".tsx" as a resolvable extension.
            extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },
        module: {
            // all files with a ".ts" or ".tsx" extension will be handled by "ts-loader"
            loaders: [{test: /\.tsx?$/, loader: "ts-loader", exclude: [/node_modules/]}],
            preLoaders: [{test: /\.tsx?$/, loader: "tslint"}]
        },
        externals: {
            sinon: "sinon"
        },
        plugins: [
            !settings.DEVELOPMENT ? new webpack.optimize.UglifyJsPlugin() : function () {
                },
            new CleanWebpackPlugin(["build/" + settings.ENVIRONMENT], {}),
            new webpack.DefinePlugin({
                ENVIRONMENT: JSON.stringify(settings.ENVIRONMENT),
                VERSION: JSON.stringify(settings.VERSION),
                PRODUCTION: JSON.stringify(settings.PRODUCTION),
                DEVELOPMENT: JSON.stringify(settings.DEVELOPMENT)
            }),
            new HtmlWebpackPlugin({
                template: "./index.html",
                environment: settings.ENVIRONMENT,
                version: settings.VERSION
            }),
            new CopyWebpackPlugin(settings.toCopy)
        ],
        tslint: {
            emitErrors: settings.PRODUCTION,
            failOnHint: settings.PRODUCTION
        }
    }
    ;

module.exports = config;