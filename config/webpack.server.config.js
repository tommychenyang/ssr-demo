const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

    entry: {
        server: path.resolve(__dirname, '..', 'server', 'server.js'),
    },
    devtool: isEnvProduction
        ? false
        : isEnvDevelopment && 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '..'),
                loader: require.resolve('babel-loader'),
                options: {
                    customize: require.resolve(
                        'babel-preset-react-app/webpack-overrides'
                    ),

                    plugins: [
                        [
                            require.resolve('babel-plugin-named-asset-import'),
                            {
                                loaderMap: {
                                    svg: {
                                        ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                                    },
                                },
                            },
                        ],
                    ],
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    cacheCompression: isEnvProduction,
                    compact: isEnvProduction,
                }
            },
            {
                loader: require.resolve('file-loader'),
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            }
        ]
    },
    plugins: [

    ]
}