const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require('path');
const pkg = require("../package.json");

const VERSION = pkg.version;

const config = {
    version: VERSION,
    debug: false,
    context: path.join(__dirname, '../'),
    entry: {
        "main": "./app/src/components/Index.ts"
    },
    output: {
        filename: "static/js/[name].[hash].js",
        pathinfo: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        loaders: [{test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/}],
        preLoaders: [{test: /\.tsx?$/, loader: "tslint"}]
    },

    externals: {
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: path.join(__dirname, ''),
            verbose: true
        }),
        new CopyWebpackPlugin([
            {from: './node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'static/css'},
            {from: './app/res', to: 'static'},
        ]),

        // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
        // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return /node_modules/.test(module.resource)
            },
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: false
        })
    ],
    tslint: {
        emitErrors: false,
        failOnHint: false
    }
};

module.exports = config;
