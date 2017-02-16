const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const path = require('path');


module.exports = function () {
    return {
        devtool: "source-map-loader",
        context: path.join(__dirname, '../'),
        target: "web",
        entry: {
            "main": "./app/src/components/Index.ts"
        },
        output: {
            filename: "static/js/[name].[hash].js",
            pathinfo: true
        },
        resolve: {
            // Add '.ts' and '.tsx' as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                },
                {
                    enforce: "pre",
                    test: /\.tsx?$/,
                    use: "source-map-loader"
                },
                {
                    test: /\.tsx$/,
                    enforce: "pre",
                    loader: "tslint-loader",
                    options: {
                        emitErrors: false,
                        failOnHint: false
                    }
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }],
        },

        externals: {},
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
        ]
    };
};