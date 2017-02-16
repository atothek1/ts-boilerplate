const webpackMerge = require('webpack-merge');
const webpack = require('webpack'); //to access built-in plugins
const commonConfig = require('./webpack.common.js');

const ENVIRONMENT = "production";
const PRODUCTION = true;
const DEVELOPMENT = !PRODUCTION;

const config = webpackMerge(commonConfig, {
    output: {
        filename: "static/js/[name].[hash].js",
        path: "./build/production",
        pathinfo: true
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(ENVIRONMENT),
            VERSION: JSON.stringify(commonConfig.version),
            PRODUCTION: JSON.stringify(PRODUCTION),
            DEVELOPMENT: JSON.stringify(DEVELOPMENT)
        })
    ]
});

module.exports = config;