const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const commonConfig = require('./webpack.common.js');

const ENVIRONMENT = "development";
const PRODUCTION = false;
const DEVELOPMENT = !PRODUCTION;

const config = webpackMerge(commonConfig, {

        debug: DEVELOPMENT,
        devtool: 'source-map-loader',

        devServer: {
            outputPath: path.join(__dirname, 'build')
        },
        entry: {
            mock: "./app/mock/Index.ts"
        },
        output: {
            filename: "static/js/[name].js",
            path: "./build/development",
        },

        externals: {
            sinon: "sinon"
        },

        plugins: [
            new webpack.DefinePlugin({
                ENVIRONMENT: JSON.stringify(ENVIRONMENT),
                VERSION: JSON.stringify(commonConfig.version),
                PRODUCTION: JSON.stringify(PRODUCTION),
                DEVELOPMENT: JSON.stringify(DEVELOPMENT)
            }),
            new CopyWebpackPlugin([
                {from: './node_modules/sinon/pkg/sinon-1.17.7.js', to: 'vendor/sinon.min.js'},
            ])
        ],

        tslint: {
            emitErrors: false,
            failOnHint: false
        }
    }
);

module.exports = config;
