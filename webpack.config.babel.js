const {resolve} = require('path');
const webpackValidator = require('webpack-validator');
const {getIfUtils} = require('webpack-config-utils');
const currentDir = resolve('.');
let webpack = require('webpack');
let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(env) {
    const {ifProd, ifNotProd} = getIfUtils(env);
    return webpackValidator({
        context: currentDir,
        entry: [
            'script-loader!jquery/dist/jquery.min.js',
            './app/app.jsx'],
        externals:{
            jquery: 'jQuery'
        },
        plugins:[
            new webpack.ProvidePlugin({
                '$':'jquery',
                'jQuery': 'jquery'
            }),
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'static',
            //     reportFilename: 'report.html',
            //     openAnalyzer: false,
            //     generateStatsFile: false,
            //     logLevel: 'info'
            // })
        ],
        output: {
            path: resolve('public'),
            filename: 'bundle.js',
            publicPath: ('/public/'),
            pathinfo: ifNotProd()
        },
        resolve: {
            alias: {
            },
            extensions: ['.js','.css'],
        },
        module:
          {
            loaders: [

                {
                    test: /\.(jsx)$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react','es2015','es2016','stage-2']
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.(js)$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015','es2016','stage-2']
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.css$/,
                    loaders: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.png$/,
                    loader: "url-loader?limit=100000&name=img/[name].[ext]"
                },
                {
                    test: /\.jpg$/,
                    loader: "file-loader?name=img/[name].[ext]"
                },
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
                },

                {
                    test: /\.html$/,
                    loader: "file-loader?name=[name].[ext]"
                },
                {
                    test: /\.scss$/,
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
                }
            ],
        },

        devtool: ifProd('source-map', 'eval'),
        devServer: {
            publicPath:"/",
            port: 8080,
            headers: {
                "Access-Control-Allow-Origin":"*"
            },
        }
    });
};
